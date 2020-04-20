const $c = require('../requesters/database');
const joi = require('joi')
const Config = require('../requesters/config');
const upload = require("../utils/uploadHelper").upload;
const _ = require("underscore");


 
module.exports = class productController{

  static doGet(query){
      $c.Products.get(query)      
      .then(product => {
        console.log(product)
        res.status(400).json(product)
    }, err => {
      res.status(400).json(err.toString());
    }).catch(err => {
      res.status(500).json(err.toString());
    })
  }

  static get(req, res){ 
    $c.Products.get({"deleted" : 0})      
      .then(product => {
        res.status(200).json(product)
    }, err => {
      res.status(400).json(err);
    }).catch(err => {
      res.status(500).json(err.toString());
    })
  }  

  static get reportSchema(){
    return joi.object().keys({
      pid : joi.number().required(),
      uid : joi.number().required(),
      message : joi.string().required()
    })
  }


  static report(req, res, next){
    $c.Products.reportProduct(req.body)
    .then(data =>  {res.json(data)}, err => res.status(400).json(err))
    .catch(err => res.status(500).json(err.toString()))
  }

  static get wishlistchema(){
    return joi.object().keys({
      pid : joi.number().required(),
      uid : joi.number().required(),
      message : joi.string().required()
    })
  }


  static wishlist(req, res, next){
    $c.Products.wishlistProduct(req.body)
    .then(data =>  {res.json(data)}, err => res.status(400).json(err))
    .catch(err => res.status(500).json(err.toString()))
  }

  static getwishlist(req,res){
    $c.Products.getwishlist({"id": req.params.id, "deleted" : 0})      
      .then(wishlist => {
        res.status(200).json(wishlist)
    }, err => {
      res.status(400).json(err);
    }).catch(err => {
      res.status(500).json(err.toString());
    })
  }

  
  static userproduct(req, res){ 
    $c.Products.dashboardProductinfo({uid : req.params.user})      
      .then(product => {
        res.status(200).json(product)
    }, err => {
      res.status(400).json(err);
    }).catch(err => {
      res.status(500).json(err.toString());
    })
  }  

   static userdashboard(req, res){
    $c.Products.dashboardProductinfo({uid : req.params.user})      
     .then((data) => {
      var activeAds = data.reduce(function(obj, v) {
        obj[v.deleted] = (obj[v.deleted] || 0) + 1;
        return obj;
      }, {})      
      var feturedAds = data.reduce(function(obj, v) {
        obj[v.featured] = (obj[v.featured] || 0) + 1;
        return obj;
      }, {})
      var post = data.length;
      res.json(Object.assign({"sold": post}, activeAds, {"fetured": feturedAds}))
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }


  static getSimilar(req, res){ 
    $c.Products.get({"deleted" : 0, "cid":req.params.cid})  
      .then(product => {
        res.status(200).json(product)
    }, err => {
      res.status(400).json(err);
    }).catch(err => {
      res.status(500).json(err.toString());
    })
  }

  static product(req, res){
    productController.doGet({"where":{deleted : false}})(req, res)
    .then(data => res.json(data), err => res.status(400).json(err))
    .catch(err => res.status(500).json(err.toString()))
  }

  static getOne(req, res){
    $c.Products.getById({id : req.params.product})      
     .then((product) => {
      res.json(product)
    })
    .catch(err => {
      res.status(500).json(err.toString())
    })
  }

  static singleCategories(req, res){
    $c.Products.catById({id : req.params.id})      
     .then((product) => {
      res.json(product)
    })
    .catch(err => {
      res.status(500).json(err.toString())
    })
  }

  static hotsellers(req, res){ 
    $c.Products.getHotSellers({"deleted" : 0})      
      .then(hotsellers => {
        res.status(200).json(hotsellers)
    }, err => {
      res.status(400).json(err);
    }).catch(err => {
      res.status(500).json(err.toString());
    })
  }


  static categories(req,res){
    $c.Products.pcategories({"deleted" : 0, "parent":0})      
      .then(categoriess => {
        res.status(200).json(categoriess)
    }, err => {
      res.status(400).json(err);
    }).catch(err => {
      res.status(500).json(err.toString());
    })
  }

  static comparition(req,res){
    $c.Products.comparition(req.body)      
      .then(results => {
        res.status(200).json(results)
    }, err => {
      res.status(400).json(err);
    }).catch(err => {
      res.status(500).json(err.toString());
    })
  }

  static icons(req,res){
    $c.Products.picon({"deleted" : 0})      
      .then(icons => {
        res.status(200).json(icons)
    }, err => {
      res.status(400).json(err);
    }).catch(err => {
      res.status(500).json(err.toString());
    })
  }

  static singleicon(req, res){
    $c.Products.iconById({"name" : req.params.name})      
     .then((product) => {
      res.json(product)
    })
    .catch(err => {
      res.status(500).json(err.toString())
    })
  }


  static search(req,res){
    var searchString = req.params.string;
    $c.Products.rsearch(searchString)      
      .then(result => {
        res.status(200).json(result)
    }, err => {
      res.status(400).json(err);
    }).catch(err => {
      res.status(500).json(err.toString());
    })
  }

  static subcategories(req,res){
    $c.Products.subcategories({"deleted" : 0, "parent":req.params.cid})      
      .then(subcategoriess => {
        res.status(200).json(subcategoriess)
    }, err => {
      res.status(400).json(err);
    }).catch(err => {
      res.status(500).json(err.toString());
    })
  }

  static get createSchema(){
    return joi.object().keys({
      cid:joi.number().required(),
      uid:joi.number().required(),
      name:joi.string().required(),
      photos:joi.string().optional(),
      extention:joi.array().items(joi.string()).default([]).optional(),
      videos:joi.array().items(joi.string()).default([]).optional(),
      region:joi.string(),
      amount:joi.number().required(),
      adtype:joi.string().required(),
      paymentype:joi.number().required(),
      negotiable: joi.boolean().required(),
      currency:joi.string(),
      creator:joi.string().required(),
      category:joi.string().lowercase(),
      featured:joi.boolean(),
      tradexplorer:joi.boolean(),
      approved:joi.boolean(),
      published:joi.boolean(),
      description:joi.string(),
      keywords:joi.array().items(joi.string()).default([]).optional(),
      canExchange:joi.boolean()
    })
  }

  static create(req, res, next){
    $c.Products.create(req.body)
    .then(data =>  {res.json(data)}, err => res.status(400).json(err))
    .catch(err => res.status(500).json(err.toString()))
  }

  static attachsqlresponse(data, param){
    return Object.assign(data, {token : param})
  }

  static delete(req, res){
    $c.Class.deleteOne({
      id : req.params.class,
      uid : req.login.id
    })
    .then(data => res.json(data), err => res.status(400).json(err))
    .catch(err => res.status(500).json(err.toString()))
  }

  static get updateSchema(){
    return joi.object().keys({
      cid:joi.number().required(),
      uid:joi.number().required(),
      name:joi.string().required(),
      photos:joi.array().items(joi.string().alphanum().length(24)).default([]).optional(),
      videos:joi.array().items(joi.string().alphanum().length(24)).default([]).optional(),
      region:joi.string(),
      amount:joi.string().required(),
      currency:joi.string(),
      coverPhoto:joi.string(),
      creator:joi.string().alphanum().length(24).required(),
      coverVideo:joi.string(),
      price:joi.string(),
      category:joi.string().lowercase(),
      featured:joi.string(),
      tradexplorer:joi.string(),
      views:joi.number(),
      approved:joi.string(),
      published:joi.string(),
      deleted:joi.string(),
      description:joi.string(),
      keywords:joi.string(),
      popular:joi.string(),
      special:joi.string(),
      canExchange:joi.string()
    })
  }

  static update(req, res){
    $c.Class.editProduct({
      id : req.params.class,
      user : req.login.id
    },req.body)
    .then(data => res.json(data), err => res.status(400).json(err))
    .catch(err => res.status(500).json(err.toString()))
  }

  static publish(req, res){
    $c.Products.editProduct({
      id : req.params.class,
      user : req.login.id
    }, {published : true})
    .then(data => res.json(data), err => res.status(400).json(err))
    .catch(err => res.status(500).json(err.toString()))
  }

  static unpublish(req, res){
    $c.Products.editProduct({
      id : req.params.class,
      user : req.login.id
    }, {published : {status : false}})
    .then(data => res.json(data), err => res.status(400).json(err))
    .catch(err => res.status(500).json(err.toString()))
  }


  static merge(req, res){
    $c.Products.mergeObjectives({
      id : req.params.class,
      objective : req.params.objective,
      newObjective : req.params.newObjective,
      newClass : req.params.newClass,
      user : req.login._id
    })
    .then(data => res.json(data), err => res.status(400).json(err))
    .catch(err => res.status(500).json(err.toString()))
  }

  static move(req, res){
    $c.Products.moveObjectives({
      id : req.params.class,
      objective : req.params.objective,
      newClass : req.params.newClass,
      user : req.login._id
    })
    .then(data => res.json(data), err => res.status(400).json(err))
    .catch(err => res.status(500).json(err.toString()))
  }


  static get addKeywordsSchema(){
    return joi.object().keys({
      keywords : joi.array().items(joi.string())
    })
  }

  static addKeywords(req, res){
    $c.Products.addKeywords({
     keywords : req.params.class,
      user : req.login.id,
      ...req.body
    })
    .then(data => res.json(data), err => res.status(400).json(err))
    .catch(err => res.status(500).json(err.toString()))
  }

  static removeKeyword(req, res){
    $c.Products.removeKeyword({
      $class : req.params.class,
      user : req.login.id,
      keyword : req.params.keyword
    })
    .then(data => res.json(data), err => res.status(400).json(err))
    .catch(err => res.status(500).json(err.toString()))
  }

  static feature(){
    //make a class featured
  }

  static unfeature(){
    //make a class unfeatured
  }
}
