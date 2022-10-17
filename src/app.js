const express = require('express');
const os = require('os');

const numCPUs = os.cpus().length;

const app = express();

app.get('/api/randoms', (req, res) => {
    const info = {
        random: Math.random()*100,
        numCPUs,
        port:parseInt(process.argv[2] || 8080)
    }
    res.json(info);
});

module.exports = app;