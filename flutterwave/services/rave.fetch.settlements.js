var morx = require('morx');

var q = require('q');



var spec = morx.spec()

    .build('id', 'required:true, eg:RS_F1EC5985C2XXXXXXXXECA6B72D3D')
    .end();

function service(data, _rave) {

    var d = q.defer();

    q.fcall(() => {
            // console.log("hellooo", data);

            var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
            // console.log(validated)
            var params = {}
            var params = validated.params;
            // console.log(params)

            return params;
           


        })
        .then(params => {



            params.seckey = _rave.getSecretKey();
            params.method = "GET"

            // console.log("pramssssss", params);
            var id = params.id;
            delete params.id;
            // console.log("pramssssss delete", params);

            return _rave.request(`v2/merchant/settlements/${id}`, params)
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


