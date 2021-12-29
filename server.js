require('dotenv').config();
const express = require('express');

const app = express();

const validation = require('./validation');

const take = require('./screenshot');

app.post('/', express.json(), validation.confirm, async (req, res) => {
  try {
    // eslint-disable-next-line max-len
    const result = await take.screenshot(req.body.url, req.body.width, req.body.height, req.body.image_name, req.body.image_extension);
    if (result.error) {
      return res.status(400).json({ status: 'error', message: result.error });
    }
    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: 'error' });
  }
});

app.listen(process.env.PORT, `${process.env.HOST}`, () => {
  console.log(`Server is running on PORT=${process.env.PORT}`);
});
