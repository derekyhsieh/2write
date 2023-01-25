import express from "express";
import bodyParser from "body-parser";
import { Configuration, OpenAIApi } from "openai";
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
    res.status(200).json({ answer: answerString == null ? void 0 : answerString.replace(/\n/g, "") });
  });
});
app.post("/api/autocomplete", (req, res) => {
  if (req.body.prompt.length < 1) {
    res.status(200).json({
      error: "Autocomplete sentence must be longer",
      answer: ""
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
  var _a, _b, _c;
  const configuration = new Configuration({
    apiKey: "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"
  });
  const openai = new OpenAIApi(configuration);
  let questionPrompt = question;
  if (!isAutocomplete) {
    questionPrompt = appendQuestionMarkToPrompt(question);
  }
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: questionPrompt,
    temperature: 1,
    max_tokens: isAutocomplete ? 20 : 150,
    stop: isAutocomplete ? "\n" : "15"
  });
  const answerString = (_c = (_b = (_a = completion == null ? void 0 : completion.data) == null ? void 0 : _a.choices[0]) == null ? void 0 : _b.text) == null ? void 0 : _c.toString();
  return isAutocomplete ? answerString == null ? void 0 : answerString.replace(/\n/g, "") : answerString;
}
const handler = app;
export {
  handler
};
