var morx = require('morx');
var q = require('q');


var spec =  morx.spec()
				.build('otp', 'required:true, eg:5590')
				.build('transaction_reference', 'required:false, eg:FLW-MOCK-17e915bec5a86f4b92b358ce6d72144e') 
				.end();

function service(data, _rave){

	var d = q.defer();

	q.fcall( () => {

		var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
		var params = validated.params;

		return params;

	})
	.then( params  => {

		params.PBFPubKey = _rave.getPublicKey();  
		return _rave.request('flwv3-pug/getpaidx/api/validatecharge', params)
	})
	.then( response => {

		d.resolve(response);

	})
	.catch( err => {

		d.reject(err);

	})

	return d.promise;
	
	

}
service.morxspc = spec;
module.exports = service;
