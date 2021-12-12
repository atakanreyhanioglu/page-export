require('dotenv').config()
const express = require('express')
const app = express()

const validation = require('./validation')

const take = require('./screenshot')

app.post('/', express.json(), validation.confirm ,async function (req, res) {
    try {
        const result = await take.screenshot(req.body.url, req.body.width, req.body.height, req.body.image_name, req.body.image_extension, req.body.browser_close)
        if(result.error) {
            return res.status(400).json({status: 'error' , message: result.error})
        }
        return res.status(200).json({ status: 'success', data: result })
    }catch (e) {
        console.log(e)
        return res.status(500).json({ status: 'error' })
    }
})

app.listen(process.env.PORT, `${process.env.HOST}`,function () {
    console.log(`Server is running on PORT=${process.env.PORT}`)
})

