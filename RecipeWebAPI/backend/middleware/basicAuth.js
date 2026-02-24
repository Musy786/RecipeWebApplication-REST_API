const auth = require("basic-auth");

const users = {
  admin: "password123",
  mustafa: "bananas"
};

module.exports = async (ctx, next) => {
  const credentials = auth(ctx);

  if (!credentials || !users[credentials.name] || users[credentials.name] !== credentials.pass) {
    ctx.status = 401;
    ctx.set("WWW-Authenticate", "Basic");
    ctx.body = { error: "Access denied: Invalid credentials" };
    return;
  }

  ctx.state.user = credentials.name;

  await next();
};