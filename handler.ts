// import express from "express";
const express = require("express")

const bodyParser = require("body-parser")

// import bodyParser from "body-parser";


const {Configuration, OpenAIApi} = require("openai")

// import { Configuration, OpenAIApi } from "openai";

const app = express();
app.use(bodyParser.json());

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

		stop: isAutocomplete ? "\n" : "15",
	});

	const answerString = completion?.data?.choices[0]?.text?.toString();

	return isAutocomplete ? answerString?.replace(/\n/g, "") : answerString;
}

export const handler = app;