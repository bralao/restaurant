const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 6001;

// middleware -> connects express to the front end
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello Developers!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
