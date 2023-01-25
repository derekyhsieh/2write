import http from "http";
import qs__default from "querystring";
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
function every(arr, cb) {
  var i = 0, len = arr.length;
  for (; i < len; i++) {
    if (!cb(arr[i], i, arr)) {
      return false;
    }
  }
  return true;
}
const SEP = "/";
const STYPE = 0, PTYPE = 1, ATYPE = 2, OTYPE = 3;
const SLASH = 47, COLON = 58, ASTER = 42, QMARK = 63;
function strip(str) {
  if (str === SEP)
    return str;
  str.charCodeAt(0) === SLASH && (str = str.substring(1));
  var len = str.length - 1;
  return str.charCodeAt(len) === SLASH ? str.substring(0, len) : str;
}
function split(str) {
  return (str = strip(str)) === SEP ? [SEP] : str.split(SEP);
}
function isMatch(arr, obj, idx) {
  idx = arr[idx];
  return obj.val === idx && obj.type === STYPE || (idx === SEP ? obj.type > PTYPE : obj.type !== STYPE && (idx || "").endsWith(obj.end));
}
function match$1(str, all) {
  var i = 0, tmp, segs = split(str), len = segs.length, l;
  var fn = isMatch.bind(isMatch, segs);
  for (; i < all.length; i++) {
    tmp = all[i];
    if ((l = tmp.length) === len || l < len && tmp[l - 1].type === ATYPE || l > len && tmp[l - 1].type === OTYPE) {
      if (every(tmp, fn))
        return tmp;
    }
  }
  return [];
}
function parse$2(str) {
  if (str === SEP) {
    return [{ old: str, type: STYPE, val: str, end: "" }];
  }
  var c, x, t, sfx, nxt = strip(str), i = -1, j = 0, len = nxt.length, out = [];
  while (++i < len) {
    c = nxt.charCodeAt(i);
    if (c === COLON) {
      j = i + 1;
      t = PTYPE;
      x = 0;
      sfx = "";
      while (i < len && nxt.charCodeAt(i) !== SLASH) {
        c = nxt.charCodeAt(i);
        if (c === QMARK) {
          x = i;
          t = OTYPE;
        } else if (c === 46 && sfx.length === 0) {
          sfx = nxt.substring(x = i);
        }
        i++;
      }
      out.push({
        old: str,
        type: t,
        val: nxt.substring(j, x || i),
        end: sfx
      });
      nxt = nxt.substring(i);
      len -= i;
      i = 0;
      continue;
    } else if (c === ASTER) {
      out.push({
        old: str,
        type: ATYPE,
        val: nxt.substring(i),
        end: ""
      });
      continue;
    } else {
      j = i;
      while (i < len && nxt.charCodeAt(i) !== SLASH) {
        ++i;
      }
      out.push({
        old: str,
        type: STYPE,
        val: nxt.substring(j, i),
        end: ""
      });
      nxt = nxt.substring(i);
      len -= i;
      i = j = 0;
    }
  }
  return out;
}
function exec$1(str, arr) {
  var i = 0, x, y, segs = split(str), out = {};
  for (; i < arr.length; i++) {
    x = segs[i];
    y = arr[i];
    if (x === SEP)
      continue;
    if (x !== void 0 && y.type | 2 === OTYPE) {
      out[y.val] = x.replace(y.end, "");
    }
  }
  return out;
}
var matchit = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  match: match$1,
  parse: parse$2,
  exec: exec$1
});
function getAugmentedNamespace(n) {
  if (n.__esModule)
    return n;
  var a = Object.defineProperty({}, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var require$$0 = /* @__PURE__ */ getAugmentedNamespace(matchit);
const { exec, match, parse: parse$1 } = require$$0;
class Trouter {
  constructor(opts) {
    this.opts = opts || {};
    this.routes = {};
    this.handlers = {};
    this.all = this.add.bind(this, "*");
    this.get = this.add.bind(this, "GET");
    this.head = this.add.bind(this, "HEAD");
    this.patch = this.add.bind(this, "PATCH");
    this.options = this.add.bind(this, "OPTIONS");
    this.connect = this.add.bind(this, "CONNECT");
    this.delete = this.add.bind(this, "DELETE");
    this.trace = this.add.bind(this, "TRACE");
    this.post = this.add.bind(this, "POST");
    this.put = this.add.bind(this, "PUT");
  }
  add(method, pattern, ...fns) {
    if (this.routes[method] === void 0)
      this.routes[method] = [];
    this.routes[method].push(parse$1(pattern));
    if (this.handlers[method] === void 0)
      this.handlers[method] = {};
    this.handlers[method][pattern] = fns;
    return this;
  }
  find(method, url2) {
    let arr = match(url2, this.routes[method] || []);
    if (arr.length === 0) {
      arr = match(url2, this.routes[method = "*"] || []);
      if (!arr.length)
        return false;
    }
    return {
      params: exec(url2, arr),
      handlers: this.handlers[method][arr[0].old]
    };
  }
}
var trouter = Trouter;
var url = function(req) {
  let url2 = req.url;
  if (url2 === void 0)
    return url2;
  let obj = req._parsedUrl;
  if (obj && obj._raw === url2)
    return obj;
  obj = {};
  obj.query = obj.search = null;
  obj.href = obj.path = obj.pathname = url2;
  let idx = url2.indexOf("?", 1);
  if (idx !== -1) {
    obj.search = url2.substring(idx);
    obj.query = obj.search.substring(1);
    obj.pathname = url2.substring(0, idx);
  }
  obj._raw = url2;
  return req._parsedUrl = obj;
};
const { parse } = qs__default;
function lead(x) {
  return x.charCodeAt(0) === 47 ? x : "/" + x;
}
function value(x) {
  let y = x.indexOf("/", 1);
  return y > 1 ? x.substring(0, y) : x;
}
function mutate(str, req) {
  req.url = req.url.substring(str.length) || "/";
  req.path = req.path.substring(str.length) || "/";
}
function onError(err, req, res, next) {
  let code = res.statusCode = err.code || err.status || 500;
  res.end(err.length && err || err.message || http.STATUS_CODES[code]);
}
class Polka extends trouter {
  constructor(opts = {}) {
    super(opts);
    this.apps = {};
    this.wares = [];
    this.bwares = {};
    this.parse = url;
    this.server = opts.server;
    this.handler = this.handler.bind(this);
    this.onError = opts.onError || onError;
    this.onNoMatch = opts.onNoMatch || this.onError.bind(null, { code: 404 });
  }
  add(method, pattern, ...fns) {
    let base = lead(value(pattern));
    if (this.apps[base] !== void 0)
      throw new Error(`Cannot mount ".${method.toLowerCase()}('${lead(pattern)}')" because a Polka application at ".use('${base}')" already exists! You should move this handler into your Polka application instead.`);
    return super.add(method, pattern, ...fns);
  }
  use(base, ...fns) {
    if (typeof base === "function") {
      this.wares = this.wares.concat(base, fns);
    } else if (base === "/") {
      this.wares = this.wares.concat(fns);
    } else {
      base = lead(base);
      fns.forEach((fn) => {
        if (fn instanceof Polka) {
          this.apps[base] = fn;
        } else {
          let arr = this.bwares[base] || [];
          arr.length > 0 || arr.push((r, _, nxt) => (mutate(base, r), nxt()));
          this.bwares[base] = arr.concat(fn);
        }
      });
    }
    return this;
  }
  listen() {
    (this.server = this.server || http.createServer()).on("request", this.handler);
    this.server.listen.apply(this.server, arguments);
    return this;
  }
  handler(req, res, info) {
    info = info || this.parse(req);
    let fns = [], arr = this.wares, obj = this.find(req.method, info.pathname);
    req.originalUrl = req.originalUrl || req.url;
    let base = value(req.path = info.pathname);
    if (this.bwares[base] !== void 0) {
      arr = arr.concat(this.bwares[base]);
    }
    if (obj) {
      fns = obj.handlers;
      req.params = obj.params;
    } else if (this.apps[base] !== void 0) {
      mutate(base, req);
      info.pathname = req.path;
      fns.push(this.apps[base].handler.bind(null, req, res, info));
    } else if (fns.length === 0) {
      fns.push(this.onNoMatch);
    }
    req.search = info.search;
    req.query = parse(info.query);
    let i = 0, len = arr.length, num = fns.length;
    if (len === i && num === 1)
      return fns[0](req, res);
    let next = (err) => err ? this.onError(err, req, res, next) : loop();
    let loop = (_) => res.finished || i < len && arr[i++](req, res, next);
    arr = arr.concat(fns);
    len += num;
    loop();
  }
}
var polka = (opts) => new Polka(opts);
const serveIndex = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.end('<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="icon" type="image/svg+xml" href="./logo.png" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>2Write</title>\n    <script type="module" crossorigin src="./assets/index-8204fa2a.js"><\/script>\n    <link rel="stylesheet" href="./assets/index-b44f6c8e.css">\n  </head>\n  <body>\n    <div id="root"></div>\n    \n    <style>\n      html, body, #root {\n        height: 100%;\n      }\n    </style>\n  </body>\n</html>\n');
};
const applyHandler = (server2) => {
  if (Array.isArray(handler)) {
    handler.forEach((h) => server2.use(h));
  } else {
    server2.use(handler);
  }
  server2.use(serveIndex);
};
const server = polka();
applyHandler(server);
var vercelHandler = (req, res) => server.handler(req, res);
export {
  vercelHandler as default
};
