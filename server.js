require('dotenv').config()
const express = require('express')
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");
const app = express()

const fs = require('fs');
const path = require('path');




app.post('/', bodyParser.json(), async function (req, res) {
    await screenShot(req.body.url, req.body.width, req.body.height, req.body.path)
    return res.status(200).json({ success: 'success' })
})

app.listen(process.env.POST, `${process.env.HOST}`,function () {
    console.log(`Server is running on PORT=${process.env.POST}`)
})

// run in a non-headless mode
async function screenShot (url, width, height, path) {
    const browser = await puppeteer.launch({
        headless: false,
// slows down Puppeteer operations
        slowMo: 100,
// open dev tools
        devtools: true
    });
    const page = await browser.newPage();
    // await page.setViewport({ width, height });
    await page.goto(url);
    if (!fs.existsSync('./screenshots')) {
        fs.mkdirSync('./screenshots')
    }
    await page.screenshot({ path: path ? path : './screenshots/example.png' });
}
