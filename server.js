const  http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')
const api = require('./api')
const app = asyncify(express())
const server = http.createServer(app)

app.use('/api',api)

const port = process.env.PORT || 3000
server.listen(port, ()=> {
    console.log('server delivery API runing on port ', port)
})