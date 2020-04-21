var morx = require('morx');
var q = require('q');

var spec =  morx.spec()
				.build('otp', 'required:true, eg:4324')
				.build('transactionreference', 'required:true, eg:5590131743294314') 
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
		return _rave.request('flwv3-pug/getpaidx/api/validate', params)
	})
	.then( response => {

		//console.log(response);
		d.resolve(response);

	})
	.catch( err => {

		d.reject(err);

	})

	return d.promise;
	
	

}
service.morxspc = spec;
module.exports = service;