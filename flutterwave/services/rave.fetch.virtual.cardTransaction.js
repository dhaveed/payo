var morx = require('morx');
var q = require('q');



var spec = morx.spec()

    .build('FromDate', 'required:true, eg:2018-02-13')
    .build('ToDate', 'required:true, eg:2019-12-21')
    .build('PageIndex', 'required:true, eg:0')
    .build('PageSize', 'required:true, eg:20')
    .build('CardId', 'required:true, eg:105c55f1-b69f-4915-b8e1-d2f645cd9955')
    // .build('secret_key', 'required:true, eg:FLWSECK_TEST-624d8f04393b01cac90d02f562b26389-X')
    .end();

function service(data, _rave) {

    var d = q.defer();

    q.fcall(() => {

            var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
            var params = validated.params;


            return params;


        })
        .then(params => {

            // console.log(params)



            params.secret_key = _rave.getSecretKey();
            params.method = "POST";
            return _rave.request('/v2/services/virtualcards/transactions', params)
        })
        .then(response => {

            // console.log(response);
            d.resolve(response);

        })
        .catch(err => {

            d.reject(err);

        })

    return d.promise;
   


}
service.morxspc = spec;
module.exports = service;

