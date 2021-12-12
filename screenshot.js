const puppeteer = require("puppeteer");
const fs = require("fs");
const Take = {
      screenshot: async (url, width, height, image_name, image_extension, browser_close) => {
        try {
            let result = {
                screen_info: {}
            }
            let ss_url = url.includes('://') ? url : 'https://' + url
            const browser = await puppeteer.launch({
                headless: false,
                slowMo: 300,
                devtools: true
            });
            const page = await browser.newPage();
            if(width && height === undefined) {
                await page.setViewport({ width, height: width });
                result.screen_info.width = width
                result.screen_info.height = width
            }
            if(width === undefined && height) {
                await page.setViewport({ width: height, height });
                result.screen_info.width = height
                result.screen_info.height = height            }
            if( width && height ) {
                await page.setViewport({ width, height });
                result.screen_info.width = width
                result.screen_info.height = height
            }
            let folderPath = `${__dirname}/screenshots`
            result.folder_path = `${__dirname}/screenshots`
            await page.goto(ss_url);
            result.url = `${ss_url}`
            if (!fs.existsSync(`${folderPath}`)) {
                fs.mkdirSync(`${folderPath}`)
            }
            let extension = image_extension ? image_extension : 'png'
            let name = image_name ? `${image_name}.${extension}` : `${Date.now()}.${extension}`
            result.image_name = `${folderPath}/${name}`.split('/screenshots/')[1]
            if (fs.existsSync(`${folderPath}/${name}`)) {
                result.error = 'Unique image name is required.'
            } else {
                await page.screenshot({ path:`${folderPath}/${name}` });
            }
            let closeTrigger = browser_close === false ? browser_close : true
            if(closeTrigger || result.error) {
                await browser.close();
                result.browser_closed = "true"
            }else {
                result.browser_closed = "false"
            }
            return result
        }catch (e) {
            console.log(e)
            return e
        }
    }
}
module.exports = Take
