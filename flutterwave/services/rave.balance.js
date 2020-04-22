var morx = require("morx");
var q = require("q");


var spec = morx
  .spec()

  // .build(
  //   "secret_key",
  //   "required:false, eg:FLWESCK-e634d14d9ded04eaf05d5b63a0a06d2f-X"
  // )
  .build("service", "required:true, eg:fly_buy")
  .build("service_method", "required:true, eg:get")
  .build("service_version", "required:true, eg:v1")
  .build("service_channel", "required:true, eg:rave")
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
     

      params.secret_key = _rave.getSecretKey();
    //   params.method = params.service_method;
      return _rave.request('v2/gpx/services/wallet/balances', params);
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
