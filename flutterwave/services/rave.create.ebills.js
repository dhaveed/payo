var morx = require("morx");
var q = require("q");


var spec = morx
  .spec()

  .build("narration","required:false, eg:test")
  .build("numberofunits", "required:true, eg:1")
  .build("currency", "required:true, eg:NGN")
  .build("amount", "required:true, eg:500")
  .build("phonenumber", "required:true, eg:09384747474")
  .build("email", 'required:true, eg:jake@rad.com')
  .build("txRef", 'required:true, eg: FRDFFS773838837373')
  .build("country", 'required:true, eg: NG')
  .build("custom_business_name", 'required:false, eg: ADE Ent.')
  .build("IP", 'required:true, eg: 127.9.0.7')
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
      return _rave.request('flwv3-pug/getpaidx/api/ebills/generateorder/', params);
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
