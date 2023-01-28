import express from "express";
import bodyParser from "body-parser";
import { Configuration, OpenAIApi } from "openai";
import admin from "firebase-admin";
import mongoose from "mongoose";


// @ts-ignore
const uri = import.meta.env.VITE_MONGODB_URI


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
app.use(bodyParser.json());

app.use("/api", (req, res, next) => {
  // Get the ID token passed.
  const idToken = req.body.idToken;
  // Verify the ID token, check if revoked and decode its payload.
  admin
    .auth()
    .verifyIdToken(idToken, true)
    .then((claims) => {
      console.log(claims);
      // console.log(req.socket.remoteAddress)

      // save uid and ip

	  claims.last_ip = req.socket.remoteAddress;
	  claims.time_stamp = new Date().toUTCString();
	  mongoose.connect(uri, function (err, db) {
		db.collection("User_requests").insertOne(claims, (err, result) => {
			console.log(result)
			db.close()
		})

	  })
     


      next();
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

app.post("/api/outline", (req, res) => {
  getAnswer(
    "Create an outline for an essay about ".concat(req.body.prompt)
  ).then((answerString) => {
    res.status(200).json({ answer: answerString });
  });
});

app.post("/api/rewrite", (req, res) => {
  getAnswer(
    "Rewrite the following text in a more professional tone: ".concat(
      req.body.prompt
    )
  ).then((answerString) => {
    res.status(200).json({ answer: answerString?.replace(/\n/g, "") });
  });
});

app.post("/api/autocomplete", (req, res) => {
  // {"prompt": "In the fifteenth and sixteenth centuries, European nations began to claim "}

  if (req.body.prompt.length < 1) {
    res.status(200).json({
      error: "Autocomplete sentence must be longer",
      answer: "",
    });
    return;
  }

  getAnswer(req.body.prompt, true).then((answerString) => {
    res.status(200).json({ answer: answerString });
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
			res.status(400).json({ error: "Error: bad request" });
		});
});

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

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: questionPrompt,
    temperature: 1.0,
    max_tokens: isAutocomplete ? 20 : 150,

    stop: isAutocomplete ? "." : "15",
  });

  const answerString = completion?.data?.choices[0]?.text?.toString();

  return isAutocomplete ? answerString?.replace(/\n/g, "") + "." : answerString;
}

export const handler = app;
