const puppeteer = require('puppeteer');
const fs = require('fs');

const Take = {
  screenshot: async (url, width, height, image_name, image_extension) => {
    try {
      const result = {
        screen_info: {},
      };
      const ss_url = url.includes('://') ? url : `https://${url}`;
      const browser = await puppeteer.launch({
        headless: true,
        slowMo: 300,
        devtools: true,
      });
      const page = await browser.newPage();
      if (width && height === undefined) {
        await page.setViewport({ width, height: width });
        result.screen_info.width = width;
        result.screen_info.height = width;
      }
      if (width === undefined && height) {
        await page.setViewport({ width: height, height });
        result.screen_info.width = height;
        result.screen_info.height = height;
      }
      if (width && height) {
        await page.setViewport({ width, height });
        result.screen_info.width = width;
        result.screen_info.height = height;
      }
      const folderPath = `${__dirname}/screenshots`;
      result.folder_path = `${__dirname}/screenshots`;
      await page.goto(ss_url, { waitUntil: 'networkidle2' });
      result.url = `${ss_url}`;
      if (!fs.existsSync(`${folderPath}`)) {
        fs.mkdirSync(`${folderPath}`);
      }
      const extension = image_extension || 'png';
      const name = image_name ? `${image_name}.${extension}` : `${Date.now()}.${extension}`;
      result.image_name = `${folderPath}/${name}`.split('/screenshots/')[1];
      if (fs.existsSync(`${folderPath}/${name}`)) {
        result.error = 'Unique image name is required.';
      } else {
        await page.screenshot({ path: `${folderPath}/${name}` });
      }
      return result;
    } catch (e) {
      console.log(e);
      return e;
    }
  },
};
module.exports = Take;
