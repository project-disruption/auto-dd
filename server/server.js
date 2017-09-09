const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const cors = require('cors')

app.use(cors())

const xero = require('xero-node')
const fs = require('fs')
const path = require('path')
const config = require('../.credentials/xero-config.json')

if (config.privateKeyPath && !config.privateKey) {
  config.privateKey = fs.readFileSync(path.join(__dirname, '..', '.credentials', config.privateKeyPath))
}

const xeroClient = new xero.PrivateApplication(config)

app.get('/invoices', (req, res) => {
  xeroClient.core.invoices.getInvoices()
    .then((invoices) => {
      res.send(invoices)
    })
})

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`)
})