const express = require('express')
const fb = require('firebird')
const config = require('config')
const path = require('path')

const HOST = config.get('host') || '127.0.0.1'
const PORT = config.get('port') || 8000
const DB = config.get('db') || "./Db/B52.gdb"
const USER = config.get('user') || "sysdba"
const PASSWORD = config.get('password') || "masterkey"
const PODR = ['']
const SOTR = [
  {KOD: 10001, NAME: 'Tester', DOLGN: 3}
]

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))  // middleware
app.use('/api/db', require('./routes/db.routes.js'))

if (process.env.NODE_ENV === 'production') {
  app.use('/'. express.static(path.join(__dirname, 'admin', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

async function start() {
  try {
    // await fb.createConnection()
    app.listen(PORT, function() {
      console.log(`Server started on HOST: ${HOST}:${PORT}`)
      console.log(`Connected Database on: ${DB}`)
      console.log(`user : ${USER}`)
    })
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()