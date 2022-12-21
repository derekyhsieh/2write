import express from 'express';
import bodyParser from 'body-parser';
import { Configuration, OpenAIApi } from "openai";

const app = express();
app.use(bodyParser.json());

app.post("/api/outline", (req, res) => {

  getAnswer("Create an outline for an essay about ".concat(req.body.prompt)).then((answerString) => {
    res.status(200).json({ answer: answerString });
  });

});

app.get("/api/autocomplete", (req, res) => {
  res.json({ hello: "world" });
});

function appendQuestionMarkToPrompt(prompt: string) {
  const lastChar = prompt[prompt.length - 1];
  if (lastChar === ".") {
    return prompt;
  }
  return prompt + ".";
}

async function getAnswer(question: string) {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const questionPrompt = appendQuestionMarkToPrompt(question);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: questionPrompt,
    temperature: 1.0,
    max_tokens: 70,
  });

  const answerString = completion?.data?.choices[0]?.text?.toString();

  return answerString;
}
export const handler = app;