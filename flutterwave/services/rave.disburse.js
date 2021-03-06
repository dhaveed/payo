var morx = require('morx');
var q = require('q');

var spec =  morx.spec() 
				.build('bank_code', 'required:true, eg:044') 
				.build('account_number', 'required:true, eg:0017704603') 
				.build('currency', 'required:true, eg:NGN') 
				.build('amount', 'required:true, eg:100')  
				.end();

function service(data, _rave){

	var d = q.defer();

	q.fcall( () => {

		var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
		var params = validated.params;

		return params;

	})
	.then( params  => {

		 
		params.seckey = _rave.getSecretKey();  
		return _rave.request('merchant/disburse', params)
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