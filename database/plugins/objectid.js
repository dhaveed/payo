
const {Types} = require('mongoose');

module.exports = (doc, props) => Object.entries(doc).reduce((acc, [key, val]) => Object.assign(acc, {[key] : (Array.isArray(props) ? props : [props]).includes(key) ? Types.ObjectId(val) : val}),{})
