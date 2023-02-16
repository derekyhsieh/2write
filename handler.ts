import express from "express";
import bodyParser from "body-parser";
import { Configuration, OpenAIApi } from "openai";
import admin from "firebase-admin";
import sgMail from "@sendgrid/mail";
import fetch from "node-fetch";
import mammothPlus from "mammoth-plus";

// @ts-ignore
const uri = import.meta.env.VITE_MONGODB_URI;

const serviceAccount = JSON.parse(
	// @ts-ignore
	import.meta.env.VITE_FIREBASE_SERVICE_ACCOUNT_KEY
);

if (admin.apps.length === 0) {
	admin.initializeApp({
		credential: admin.credential.cert({
			projectId: serviceAccount.project_id,
			clientEmail: serviceAccount.client_email,
			privateKey: serviceAccount.private_key.replace(/\\n/g, "\n"),
		}),
	});
}

const app = express();
app.use(bodyParser.json({ limit: "200mb" }));

app.use("/api", (req, res, next) => {
	if (
		typeof req.headers.authorization === "string" &&
		req.headers.authorization.startsWith("Bearer ")
	) {
		const idToken = req.headers.authorization.split(" ")[1];
		// Verify the ID token, check if revoked and decode its payload.
		admin
			.auth()
			.verifyIdToken(idToken, true)
			.then((claims) => {
				// save uid and ip

				claims.last_ip = req.socket.remoteAddress;
				claims.time_stamp = new Date().toUTCString();

				next();
			})
			.catch((error) => {
				res.status(400).json({ error: error.message });
			});
	} else {
		res.status(400).json({ error: "Invalid token" });
	}
});

app.post("/api/outline", (req, res) => {
	getAnswer("Create an outline for an essay about ".concat(req.body.prompt))
		.then((answerString) => {
			res.status(200).json({ answer: answerString });
		})
		.catch((error) => {
			res.status(400).json({ error: error.message });
		});
});

app.post("/api/rewrite", (req, res) => {
	getAnswer(
		"Rewrite the following text in a more professional tone: ".concat(
			req.body.prompt
		)
	)
		.then((answerString) => {
			res.status(200).json({ answer: answerString?.replace(/\n/g, "") });
		})
		.catch((error) => {
			res.status(400).json({ error: error.message });
		});
});

app.post("/api/autocomplete", (req, res) => {
	// {"prompt": "In the fifteenth and sixteenth centuries, European nations began to claim "}

	if (req.body.prompt.length < 1) {
		res.status(400).json({
			error: "Autocomplete sentence must be longer",
		});
		return;
	}

	getAnswer(req.body.prompt, true)
		.then((answerString) => {
			res.status(200).json({ answer: answerString });
		})
		.catch((error) => {
			res.status(400).json({ error: error.message });
		});
});

app.post("/api/classify", (req, res) => {
	// if (req.body.prompt.split(" ").length >= 100) {
	fetch("https://aiwritingcheck.org/classify", {
		method: "post",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ instances: [{ data: req.body.prompt }] }),
	})
		.then((response) => response.json())
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((error) => {
			res.status(400).json({ error: error.message });
		});
});

app.post(
	"/api/transcribe",
	express.raw({ type: "*/*", limit: "200mb" }),
	(req, res) => {
		fetch("https://api.deepgram.com/v1/listen?model=whisper", {
			method: "post",
			headers: { "Content-Type": "application/octet-stream" },
			body: req.body,
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				res.status(200).json(data);
			})
			.catch((error) => {
				res.status(400).json({ error: error.message });
			});
	}
);

app.post(
	"/api/convert",
	express.raw({ type: "*/*", limit: "200mb" }),
	(req, res) => {
		const binaryString: ArrayBuffer = req.body;

		Promise.all([
			mammothPlus.convertToHtml({ arrayBuffer: binaryString }),
			mammothPlus.extractRawText({ arrayBuffer: binaryString }),
		])
			.then((results) => {
				res.status(200).json({
					html: results[0].value,
					rawText: results[1].value,
					warnings: [results[0].messages, results[1].messages],
				});
			})
			.catch((error) => {
				res.status(400).json({ error: error.message });
			});
	}
);

function appendQuestionMarkToPrompt(prompt) {
	const lastChar = prompt[prompt.length - 1];
	if (lastChar === ".") {
		return prompt;
	}
	return prompt + ".";
}

async function getAnswer(question, isAutocomplete = false) {
	const configuration = new Configuration({
		// @ts-ignore
		apiKey: import.meta.env.VITE_OPENAI_API_KEY,
	});

	const openai = new OpenAIApi(configuration);

	let questionPrompt = question;

	if (!isAutocomplete) {
		questionPrompt = appendQuestionMarkToPrompt(question);
	}

	const completion: any = await openai
		.createCompletion({
			model: "text-davinci-003",
			prompt: questionPrompt,
			temperature: 1.0,
			max_tokens: isAutocomplete ? 20 : 150,

			stop: isAutocomplete ? "." : "15",
		})
		.catch((error) => {
			if (error.message.includes("429")) {
				sendNoCreditsEmail();
			}
			throw new Error(error.message);
		});

	const answerString = completion?.data?.choices[0]?.text?.toString();

	return isAutocomplete ? answerString?.replace(/\n/g, "") + "." : answerString;
}

async function sendNoCreditsEmail() {
	// @ts-ignore
	sgMail.setApiKey(import.meta.env.VITE_SENDGRID_API_KEY);

	const aidanMsg = {
		to: "aidanb08@icloud.com",
		from: "aidanb08@icloud.com",
		subject: "2Write is out of credits",
		html: `<strong>2Write is out of credits, create a new API key</strong>`,
	};

	const derekMsg = {
		to: "devderekhsieh@gmail.com",
		from: "aidanb08@icloud.com",
		subject: "2Write is out of credits",
		html: `<strong>2Write is out of credits, create a new API key</strong>`,
	};

	sgMail
		.send([aidanMsg, derekMsg])
		.then(() => {
			console.log("Emails sent");
		})
		.catch((error) => {
			console.error(error);
		});
}

export const handler = app;
