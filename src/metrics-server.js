
const http = require('http');
const client = require('prom-client');

const register = new client.Registry();

// Standardní metriky (CPU, paměť atd.)
client.collectDefaultMetrics({ register });

// Vlastní metriky
const buildCounter = new client.Counter({
  name: 'build_total',
  help: 'Počet spuštění build procesu',
});
register.registerMetric(buildCounter);

const testGauge = new client.Gauge({
  name: 'unit_test_duration_seconds',
  help: 'Doba běhu unit testů v sekundách',
});
register.registerMetric(testGauge);

const e2eGauge = new client.Gauge({
  name: 'e2e_test_duration_seconds',
  help: 'Doba běhu e2e testů v sekundách',
});
register.registerMetric(e2eGauge);

const errorRate = new client.Gauge({
  name: 'test_error_rate',
  help: 'Chybovost testů v %',
});
register.registerMetric(errorRate);

// Simulace hodnot
buildCounter.inc();
testGauge.set(2.35);
e2eGauge.set(5.1);
errorRate.set(0.02);

const server = http.createServer(async (req, res) => {
  if (req.url === '/metrics') {
    res.setHeader('Content-Type', register.contentType);
    res.end(await register.metrics());
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(9229, () => {
  console.log('Prometheus metrics server běží na portu 9229');
});
