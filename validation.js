const { body, validationResult } = require('express-validator');

const Validation = {
  screenshot: [
    body('url', 'Invalid url type.').isURL(),
    body('image_extension', 'Image extension must be string.').isString(),
    body('image_extension', 'Invalid image extension.').isIn(['jpeg', 'apng', 'pjp', 'pjpeg', 'jfif', 'jpg', 'png', 'svg', 'webp']),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422)
          .json({ errors: errors.array() });
      }
      return next();
    },
  ],
  pdf: [
    body('url', 'Invalid url type.').isURL(),
    body('name', 'Name must be string.').isString(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422)
          .json({ errors: errors.array() });
      }
      return next();
    },
  ],
};

module.exports = Validation;
