var morx = require('morx');
var q = require('q');

//This allows you fetch all plans

var spec =  morx.spec()
				.build('__n', 'required:false, eg:NGN')  
				.end();

function service(_rave){

	var d = q.defer();

	q.fcall( () => {

		var validated = morx.validate(spec, _rave.MORX_DEFAULT);
        var params = validated.params;
        _rave.params = params
        return _rave

	})
	.then( _rave  => {
		 
        _rave.params.seckey = _rave.getSecretKey();
		_rave.params.method = "GET";
        return _rave.request('v2/gpx/paymentplans/query', _rave.params)
        
	})
	.then( response => {

		// console.log(response);
		d.resolve(response);

	})
	.catch( err => {

		d.reject(err);

	})

	return d.promise;
	
	

}
service.morxspc = spec;
module.exports = service;

