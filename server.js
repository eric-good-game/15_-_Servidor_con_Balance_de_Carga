const express = require('express');
const numCPUs = require('os').cpus().length;

const app = express();
const PORT = parseInt(process.argv[2] || 8080);

app.get('/api/randoms', (req, res) => {
    const info = {
        random: Math.random()*1000,
        numCPUs,
        port:parseInt(process.argv[2] || 8080)
    }
    res.json(info);
});

app.listen(PORT, () => {
    console.log('Example app listening on port 8080!');
});