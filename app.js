// running locally using express

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

// random response time variable
const responseTime = require("response-time");

const prom = require("prom-client");      // prometheus client for metircs collection

const collectDefaultMetrics = prom.collectDefaultMetrics;
collectDefaultMetrics({register: prom.register});

// this collects the request's response time from the server
const reqResTime = new prom.Histogram({
  name: "https_express_req_res_time",
  help: "This tells how much time is taken by request and response",
  labelNames: ["method", "route", "status_code"],
  buckets: [1, 50, 100, 200, 400, 500, 800, 1000, 2000]
});

app.use(responseTime((req, res, time) => {
  reqResTime.labels({
    method: req.method,
    route: req.url,
    status_code: res.statusCode,
  })
  .observe(time);
}));


app.use(express.static('public'));

// prom client gets metrics and hosts it to '../metrics' location
app.get("/metrics", async (req, res) =>{
    res.setHeader('Content-Type', prom.register.contentType);
    const metrics = await prom.register.metrics();
    res.send(metrics);
});

app.get('/', (req, res) => {
  res.sendFile('M:/SIH/sih-front/index.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}! Server running on http://yourip:8000`);
});
