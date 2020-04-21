var morx = require("morx");
var q = require("q");


var spec = morx
  .spec()

  .build("reference","required:true, eg:flw")
  .build("currency", "required:true, eg:NGN")
  .build("amount", "required:true, eg:500")
 .end();

function service(data, _rave) {
  var d = q.defer();

  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    var params = {}
            var params = validated.params;

            return params;
  })
    .then(params => {
     

      params.SECKEY = _rave.getSecretKey();
    //   params.method = params.service_method;
      return _rave.request('flwv3-pug/getpaidx/api/ebills/update/', params);
    //   console.log(params);
    })
    .then(response => {
      // console.log(response);
      d.resolve(response);
    })
    .catch(err => {
      d.reject(err);
    });

  return d.promise;
}
service.morxspc = spec;
module.exports = service;
