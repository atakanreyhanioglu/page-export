require('dotenv').config()
const express = require('express')
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");
const app = express()

const fs = require('fs');


app.post('/', bodyParser.json(), async function (req, res) {
    if (!req.body.url) return res.status(401).json({status: 'error' , message: 'Url is required.'})
    await screenShot(req.body.url, req.body.width, req.body.height, req.body.folder_path, req.body.image_name, req.body.image_extension)
    return res.status(200).json({ status: 'success' })
})

app.listen(process.env.POST, `${process.env.HOST}`,function () {
    console.log(`Server is running on PORT=${process.env.POST}`)
})

async function screenShot (url, width, height, folder_path, image_name, image_extension) {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 1000,
            devtools: true
        });
        const page = await browser.newPage();
        if( width && height ) {
            await page.setViewport({ width, height });
        }
        let folderPath = folder_path ? folder_path : './screenshots'
        await page.goto(url);
        if (!fs.existsSync(`${folderPath}`)) {
            fs.mkdirSync(`${folderPath}`)
        }
        let extension = image_extension ? image_extension : 'png'
        let name = image_name ? image_name : `${Date.now()}.${extension}`
        await page.screenshot({ path:`${folderPath}/${name}` });
    }catch (e) {
        console.log(e)
    }
}
