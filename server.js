const cluster = require("cluster");
const app = require("./src/app");

const PORT = parseInt(process.argv[2] || 8080);

app.listen(PORT, () => {
    console.log('Example app listening on port 8080!');
});