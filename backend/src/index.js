const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`,
  {
    useNewUrlParser: true,
  }
)

app.use((req, res, next) => {
  req.io = io

  return next()
})

app.use(cors())
app.use(express.json())
app.use(require('./routes'))

server.listen(3000, () => {
  console.log(':) Server started on port 3000')
})
