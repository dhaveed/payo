const $b = require("../requesters/database");

const joi = require("joi");
// const joi = require('@hapi/joi');
var request = require("request");
require("dotenv").config();

module.exports = class Controller {
  static get BusinessSchema() {
    return joi.object().keys({
      businessName: joi.string().required(),
      businessEmail: joi.string().email().lowercase().required(),
      businessType: joi.string().required(),
      user_id: joi.string().optional(),
      business_settings_id: joi.string().optional(),
    });
  }

  static get ValidateTransactionSchema() {
    return joi.object().keys({
      transaction_reference: joi.string().required(),
      otp: joi.string().required(),
    });
  }

  static createBusiness(req, res) {
    $b.business
      .createBusiness(Object.assign(req.body, req.params.userId))
      .then(
        (business) => {
          console.log("Successful");
          $b.business_settings.createSettings(Object.assign(business.id));
        },
        (err) => res.status(400).json(err)
      )
      .catch((err) => res.status(500).json(err.toString()));
  }
};
