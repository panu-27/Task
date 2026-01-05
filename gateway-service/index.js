require("dotenv").config();

const express = require("express");
const httpProxy = require("http-proxy");


const authMiddleware = require('./middlewares/auth.middleware');

const {
  router: registerRouter,
  registerdRoutes
} = require("./routes/register.route");

const app = express();
const proxy = httpProxy.createProxyServer({});

const port = process.env.PORT || 3000;




app.use("/register", express.json(), registerRouter);



app.use((req, res, next) => {
  const route = registerdRoutes.find(
    r =>
      r.method === req.method &&
      req.path.startsWith(r.path.split("/:")[0])
  );

  if (!route) {
    return res.status(404).json({
      message: "Route not registered in gateway"
    });
  }

  req._matchedRoute = route;
  next();
});



app.use(authMiddleware);

proxy.on("proxyReq", (proxyReq, req) => {
  if (req.body && Object.keys(req.body).length) {
    const bodyData = JSON.stringify(req.body);
    proxyReq.setHeader("Content-Type", "application/json");
    proxyReq.write(bodyData);
  }
});


app.use((req, res) => {
  proxy.web(req, res, {
    target: req._matchedRoute.target,
    changeOrigin: true
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
