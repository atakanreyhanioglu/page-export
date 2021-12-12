require('dotenv').config()
const express = require('express')
const bodyParser = require("body-parser");
const app = express()

const take = require('./screenshot')

app.post('/', bodyParser.json(), async function (req, res) {
    try {
        if (!req.body.url) return res.status(401).json({status: 'error' , message: 'Url is required.'})
        const result = await take.screenshot(req.body.url, req.body.width, req.body.height, req.body.image_name, req.body.image_extension, req.body.browser_close)
        if(result.error) {
            return res.status(401).json({status: 'error' , message: result.error})
        }
        return res.status(200).json({ status: 'success', data: result })
    }catch (e) {
        console.log(e)
        return res.status(500).json({ status: 'error' })

    }
})

app.listen(process.env.POST, `${process.env.HOST}`,function () {
    console.log(`Server is running on PORT=${process.env.POST}`)
})

