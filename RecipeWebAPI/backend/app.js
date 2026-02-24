const Koa = require("koa");
const app = new Koa();
const router = require("./routes/recipes");
const bodyParser = require("koa-bodyparser");
const json = require("koa-json");
const cors = require('@koa/cors');

const serve = require("koa-static");
const path = require("path");
app.use(cors());

// Serve the openapi docs statically
const docsPath = path.resolve(__dirname, 'docs/openapi');
app.use(serve(docsPath));

app.use(bodyParser());
app.use(json());
app.use(router.routes());

module.exports = app;