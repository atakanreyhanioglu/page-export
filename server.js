require('dotenv').config()
const express = require('express')
const bodyParser = require("body-parser");
const app = express()

const take = require('./screenshot')

app.post('/', bodyParser.json(), async function (req, res) {
    if (!req.body.url) return res.status(401).json({status: 'error' , message: 'Url is required.'})
    await take.screenshot(req.body.url, req.body.width, req.body.height, req.body.image_name, req.body.image_extension, req.body.browser_close)
    return res.status(200).json({ status: 'success' })
})

app.listen(process.env.POST, `${process.env.HOST}`,function () {
    console.log(`Server is running on PORT=${process.env.POST}`)
})

