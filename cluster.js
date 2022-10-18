const express = require("express");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const app = express();
const PORT = parseInt(process.argv[2] || 8081);

if (cluster.isPrimary) {
  console.log("num CPUs: " + numCPUs);
  console.log(`I am a master ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log(`${worker.process.pid} is finished`);
  });
} else {
    app.get('/api/randoms', (req, res) => {
        const info = {
            random: Math.random()*1000,
            numCPUs,
            port:parseInt(process.argv[2] || 8081)
        }
        res.json(info);
    });

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} - PID ${process.pid}`);
    });
  console.log(`Worker ${process.pid} started`);
}
