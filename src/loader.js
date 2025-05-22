const app = require('./app')
const db = require('./config/database')

const port = 3003
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`)
})