import express from 'express';
import bodyParser from 'body-parser';
import { Configuration, OpenAIApi } from "openai";
import { Autocomplete } from '@mantine/core';

const app = express();
app.use(bodyParser.json());

app.post("/api/outline", (req, res) => {

  getAnswer("Create an outline for an essay about ".concat(req.body.prompt)).then((answerString) => {
    res.status(200).json({ answer: answerString });
  });

});

app.post("/api/autocomplete", (req, res) => {
  // {"prompt": "In the fifteenth and sixteenth centuries, European nations began to claim "}
  getAnswer(req.body.prompt, true).then((answerString) => {
    res.status(200).json({answer: answerString})
  })
});

function appendQuestionMarkToPrompt(prompt: string) {
  const lastChar = prompt[prompt.length - 1];
  if (lastChar === ".") {
    return prompt;
  }
  return prompt + ".";
}

async function getAnswer(question: string, isAutocomplete: boolean = false) {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  let questionPrompt = question

 
  if(!isAutocomplete) {
    questionPrompt = appendQuestionMarkToPrompt(question);
  }


  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: questionPrompt,
    temperature: 1.0,
    max_tokens: isAutocomplete ? 20 :  50,
    
    stop: isAutocomplete ? "\n" : "10"

  });

  const answerString = completion?.data?.choices[0]?.text?.toString()

  return isAutocomplete ? answerString?.replace(/\n/g, '') : answerString;
}
export const handler = app;