const puppeteer = require('puppeteer');
const fs = require('fs');

const get = {
  pdf: async (url, width, height, name) => {
    try {
      const result = {
        screen_info: {},
      };
      let widthOption;
      let heightOption;
      const folderPath = `${__dirname}/documents`;
      result.folder_path = `${__dirname}/documents`;
      const ssUrl = url.includes('://') ? url : `https://${url}`;
      result.url = `${ssUrl}`;
      if (!fs.existsSync(`${folderPath}`)) {
        fs.mkdirSync(`${folderPath}`);
      }
      const browser = await puppeteer.launch({
        headless: true,
      });
      const page = await browser.newPage();
      if (!width || !height) {
        widthOption = 1000;
        heightOption = 1425;
        result.screen_info.width = '1000';
        result.screen_info.height = '1425';
      }
      if (width && height) {
        widthOption = width;
        heightOption = height;
        result.screen_info.width = width;
        result.screen_info.height = height;
      }
      await page.goto(ssUrl, { waitUntil: 'networkidle2' });
      const documentName = name ? `${name}.pdf` : `${Date.now()}.pdf`;
      // eslint-disable-next-line prefer-destructuring
      result.name = `${folderPath}/${documentName}`.split('/documents/')[1];
      if (fs.existsSync(`${folderPath}/${name}.pdf`)) {
        result.error = 'Unique pdf name is required.';
      } else {
        await page.pdf({ path: `${folderPath}/${name}.pdf`, width: widthOption, height: heightOption });
      }
      return result;
    } catch (e) {
      console.log(e);
      return e;
    }
  },
};
module.exports = get;
