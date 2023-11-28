const connectToMongo = require('./db')

const express = require('express')


connectToMongo();

const app = express()
const port = 5000

app.use(express.json())

app.use('/api/users',require('./routes/users.js'))
app.use('/api/events',require('./routes/events.js'))
app.use('/api/admin', require('./routes/admin.js'))

app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})