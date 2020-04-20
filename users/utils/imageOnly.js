

module.exports = (req, file, cb) => {
  if(file.mimetype.includes("image")){
    cb(null, true)
  }else{
    cb(null, false)
  }
}
