const puppeteer = require("puppeteer");
const fs = require("fs");
const Take = {
      screenshot: async (url, width, height, folder_path, image_name, image_extension) => {
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
            let folderPath = folder_path ? folder_path : `${__dirname}/screenshots`
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

}
module.exports = Take
