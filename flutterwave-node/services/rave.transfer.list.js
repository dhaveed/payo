var morx = require('morx');
var q = require('q');






var spec = morx.spec()
	
.build('page', 'required:true, eg:1')
.build('status', 'required:true, eg:successful')
.end();


function service(data,_rave) {

	var d = q.defer();

	q.fcall(() => {

			var validated = morx.validate(data,spec, _rave.MORX_DEFAULT);
			var params = validated.params;
			
			return params

		})
		.then(params => {

			params.seckey = _rave.getSecretKey();
		params.method = "GET";
			return _rave.request('v2/gpx/transfers', params)

		})
		.then(response => {

		
			d.resolve(response);

		})
		.catch(err => {

			d.reject(err);

		})

	return d.promise;



}
service.morxspc = spec;
module.exports = service;
