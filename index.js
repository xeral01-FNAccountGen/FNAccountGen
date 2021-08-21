const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const prompt = require('prompt')
const User = require(`${__dirname}/files/models/User`)
const profiles = require(`${__dirname}/files/structs/profile`)
const Friends = require(`${__dirname}/files/models/Friends`)
const Athena = require(`${__dirname}/files/models/Athena`)
const CommonCore = require(`${__dirname}/files/models/CommonCore`)
const Port = process.env.PORT || 4495
const http = require('http')
const server = http.createServer(app)
const fs = require('fs')
const mongoose = require('mongoose')
const path = require('path')
global.exchangeCodes = {}
global.clientTokens = []
global.accessTokens = []
global.xmppClients = {}
global.parties = []
global.invites = []
global.pings = []
global.SERVER = server
global.Server_User = null
global.DBG = fs.readFileSync(`${__dirname}/files/server/background.txt`).toString()
global.Server_version = fs.readFileSync(`${__dirname}/files/server/server_version.txt`).toString()

app.use(require('body-parser').json())
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(require("./services/index"))
app.use(require("./services/id"))

mongoose.connect("PUT-YOUR-MONGODB-HERE", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }, async e => {
    if (e) throw e
    console.log(`Connected to the database!`);
})
require("./services/party/index")
require("./services/xmpp/index")
server.listen(Port,() => {
    console.log(`Servers Online! (Version: ${Server_version}, Port: ${Port})`)
})
