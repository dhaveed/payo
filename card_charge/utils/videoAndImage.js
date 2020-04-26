

module.exports = (req, file, cb) => {
  if(file.mimetype.includes("image") || file.mimetype.includes("video")){
    cb(null, true)
  }else{
    cb(null, false)
  }
}
