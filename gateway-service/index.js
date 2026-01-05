require("dotenv").config();

const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const authMiddleware = require('./middlewares/auth.middleware');

const {
  router: registerRouter,
  registerdRoutes
} = require("./routes/register.route");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


app.use(registerRouter);

app.use(authMiddleware);


app.use((req, res, next) => {
  const route = registerdRoutes.find(
    r => r.method === req.method && r.path === req.path
  );

  if (!route) {
    return res.status(404).json({
      message: "Route not registered in gateway"
    });
  }

  return createProxyMiddleware({
    target: route.target,
    changeOrigin: true
  })(req, res, next);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
