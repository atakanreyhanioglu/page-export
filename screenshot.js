const puppeteer = require("puppeteer");
const fs = require("fs");
const Take = {
      screenshot: async (url, width, height, image_name, image_extension, browser_close) => {
        try {
            const browser = await puppeteer.launch({
                headless: false,
                slowMo: 300,
                devtools: true
            });
            const page = await browser.newPage();
            if(width && height === undefined) {
                await page.setViewport({ width, height: width });
            }
            if(width === undefined && height) {
                await page.setViewport({ width: height, height });
            }
            if( width && height ) {
                await page.setViewport({ width, height });
            }
            let folderPath = `${__dirname}/screenshots`
            await page.goto(url);
            if (!fs.existsSync(`${folderPath}`)) {
                fs.mkdirSync(`${folderPath}`)
            }
            let extension = image_extension ? image_extension : 'png'
            let name = image_name ? `${image_name}.${extension}` : `${Date.now()}.${extension}`
            await page.screenshot({ path:`${folderPath}/${name}` });
            let closeTrigger = browser_close ? browser_close : true
            if(closeTrigger) {
                await browser.close();
            }
        }catch (e) {
            console.log(e)
        }
    }
}
module.exports = Take
