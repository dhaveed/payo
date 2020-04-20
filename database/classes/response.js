module.exports = class loginModelClass{
  static pass({email, headers, ip}){
    ip = Array.from(new Set(ip.split(','))).map(address => ({ip : address}))
    return true
  }

  static fail({email, headers, challenge, ip}){
    ip = Array.from(new Set(ip.split(','))).map(address => ({ip : address}))
    return true
  }
}
