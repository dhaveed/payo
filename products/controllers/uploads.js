
const {Vimeo} = require('vimeo');
const CLIENT_SECRET = "qshd9Bp+No7ECtkRlniU86ymPx0cq6ZPK514qYFbOxCFSdCE+FN2x/6Ku/gpG+UJuK01Ri4mouJbeWT4JXVA6O4RC+NPCy/RpWe+w66l8s+nPd8nsDFkkHnFaHE3upkw";
const CLIENT_ID = "cfa7cbefdc956978a26d3568c9887343b4a49310"
const ACCESS_TOKEN = "ed606b3c46b4aa78199a2e6289f0906a"
const Client = new Vimeo(CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN);
const $v = require('../requesters/database');
const fs = require('fs');
const axios = require('axios')

//
module.exports = class uploadController{
  static storeVideo(uploader){
    return  ({id, ...meta}) => {
      return $v.Video.findOneAndUpdate({id},{$set : {id, ...meta}},{new : true, upsert : true})
    }
  }

  static async fetchMeta(video, uploader){
    return new Promise((resolve, reject)=> {
      $v.Video.findOne({id : video})
      .then(vid => vid ? Promise.resolve(vid) : uploadController.apiFetch(vid), reject)
      .then(uploadController.storeVideo(uploader), reject)
      .catch(reject)
    })
  }

  static apiFetch(video){
    return  new Promise((resolve, reject) => {
        axios.get({
          url: `https://api.vimeo.com/videos/${video}`,
          headers:{Authorization : `Bearer ${ACCESS_TOKEN}`}})
        .then(({data}) => {
          resolve({
            meta : data,
            id : video,
            directLink : {
              link : data.files[0].link,
              secureLink : data.files[0].link_secure
            }
          })
        }, reject)
        .catch(reject)
    })
  }

  static doUpload(file, {name,description}){
    return !file ? Promise.resolve(null) : new Promise((resolve, reject) => {
      Client.upload(file, {name,description},resolve, uploadController.progress, reject)
    })
  }


  static update(video_id, {title: name, description}){
    return axios.patch(`https://api.vimeo.com/videos/${video_id}`, {name, description}, {headers:{Authorization : `Bearer ${ACCESS_TOKEN}`}})
            .then(({data}) => {
              console.log({data})
              return Promise.resolve(data)
            })
  }

  static progress(bytesUploaded, bytesTotal) {
    let percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
    //console.log(bytesUploaded, bytesTotal, percentage + '%')
  }


}
