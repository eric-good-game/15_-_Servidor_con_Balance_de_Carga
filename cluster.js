const cluster = require("cluster");
const app = require("./src/app");
const http = require("http");
const numCPUs = require("os").cpus().length;

const PORT = parseInt(process.argv[2] || 8080);
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
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} - PID ${process.pid}`);
    });
  console.log(`Worker ${process.pid} started`);
}
