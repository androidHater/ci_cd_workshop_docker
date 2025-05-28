const http = require('http');
const client = require('prom-client');

const register = new client.Registry();
client.collectDefaultMetrics({ register });

// === CI/CD Dashboard Metriky (neprefixované) ===
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

const deployFrequency = new client.Gauge({
  name: 'deploy_frequency_per_week',
  help: 'Počet nasazení týdně',
});
register.registerMetric(deployFrequency);

const leadTime = new client.Gauge({
  name: 'lead_time_to_production_seconds',
  help: 'Čas od commitu po nasazení v sekundách',
});
register.registerMetric(leadTime);

const closedTasks = new client.Gauge({
  name: 'closed_tasks_per_week',
  help: 'Počet uzavřených úkolů týdně',
});
register.registerMetric(closedTasks);

const postReleaseBugs = new client.Gauge({
  name: 'bugs_after_release',
  help: 'Počet nahlášených bugů po nasazení',
});
register.registerMetric(postReleaseBugs);

const incidentCount = new client.Gauge({
  name: 'incident_count',
  help: 'Počet incidentů nebo alertů za týden',
});
register.registerMetric(incidentCount);

const codeCoverage = new client.Gauge({
  name: 'code_coverage_ratio',
  help: 'Coverage kódu (0–1)',
});
register.registerMetric(codeCoverage);

const codeSmells = new client.Gauge({
  name: 'code_smells_count',
  help: 'Počet code smells',
});
register.registerMetric(codeSmells);

const sloViolations = new client.Gauge({
  name: 'slo_violations_count',
  help: 'Počet porušení SLO (např. chybové odpovědi API)',
});
register.registerMetric(sloViolations);

// === Týmové metriky (prefixed) ===
function createTeamMetrics(team) {
  const metrics = {
    deployFrequency: new client.Gauge({
      name: `${team}_deploy_frequency_per_week`,
      help: `Deploy frequency týmu ${team}`,
    }),
    leadTime: new client.Gauge({
      name: `${team}_lead_time_to_production_seconds`,
      help: `Lead time to production týmu ${team}`,
    }),
    closedTasks: new client.Gauge({
      name: `${team}_closed_tasks_per_week`,
      help: `Uzavřené úkoly týdně týmu ${team}`,
    }),
    bugs: new client.Gauge({
      name: `${team}_bugs_after_release`,
      help: `Bugy po release týmu ${team}`,
    }),
    incidents: new client.Gauge({
      name: `${team}_incident_count`,
      help: `Počet incidentů týmu ${team}`,
    }),
  };

  for (const m of Object.values(metrics)) register.registerMetric(m);
  return metrics;
}

const romanMetrics = createTeamMetrics('roman');
const honzaMetrics = createTeamMetrics('honza');

// === Simulace hodnot ===
buildCounter.inc();
testGauge.set(2.35);
e2eGauge.set(5.1);
errorRate.set(0.02);

deployFrequency.set(5);
leadTime.set(7200);
closedTasks.set(18);
postReleaseBugs.set(2);
incidentCount.set(1);
codeCoverage.set(0.85);
codeSmells.set(3);
sloViolations.set(0);

// Tým Roman
romanMetrics.deployFrequency.set(7);
romanMetrics.leadTime.set(5400);
romanMetrics.closedTasks.set(24);
romanMetrics.bugs.set(1);
romanMetrics.incidents.set(0);

// Tým Honza
honzaMetrics.deployFrequency.set(5);
honzaMetrics.leadTime.set(8100);
honzaMetrics.closedTasks.set(16);
honzaMetrics.bugs.set(4);
honzaMetrics.incidents.set(1);

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
