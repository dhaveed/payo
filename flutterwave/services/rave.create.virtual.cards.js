var morx = require('morx');
var q = require('q');


var spec = morx.spec()
    
    .build('currency', 'required:true, eg:USD')
    .build('amount', 'required:true, eg:100')
    .build('billing_name', 'required:true, eg:Mohammed Lawal')
    .build('billing_address', 'required:true, eg:DREAM BOULEVARD')
    .build('billing_city', 'required:true, eg:ADYEN')
    .build('billing_state', 'required:true, eg:NEW LANGE')
    .build('billing_postal_code', 'required:true, eg:293094')
    .build('billing_country', 'required:true, eg:US')
    .build('billing_country', 'required:true, eg:US')
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
            return _rave.request('/v2/services/virtualcards/new', params)
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
