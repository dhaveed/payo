

module.exports = class {
  static classes(req, res){
    res.json({
      monthly : 10,
      yearly : 80,
      currency : 'USD'
    })
  }

  static erp(req, res){
    res.json({
      yearly : 120,
      currency : 'USD'
    })
  }

  static market(req, res){
    res.json({
      monthly : 25000,
      currency : 'NGN'
    })
  }
}
