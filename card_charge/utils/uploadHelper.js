const cloudinary = require("cloudinary");
const _ = require('underscore');

const Q = require("q");

function upload(file) {
    cloudinary.config({
        cloud_name: "tradexplora",
        api_key: "516899775453668",
        api_secret: "pK9YKJWQk0Nbxyhhz6seVObw1sw"

    });

    return new Q.Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file, {width: 50, height: 50}, (err, res) => {
            if (err) {
                console.log('cloudinary err:', err);
                reject(err);
            } else {
                console.log('cloudinary res:', res);
                return resolve(res.url);
            }
        });
    });
};


module.exports.upload = upload;
