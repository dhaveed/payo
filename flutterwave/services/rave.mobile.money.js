var morx = require('morx');
var q = require('q');

var spec =  morx.spec()
				
				.build('currency', 'required:true, eg:GHS')
				.build('country', 'required:true, eg:GH')
				.build('amount', 'required:true, eg:10') 
				.build('phonenumber', 'required:false, eg:054709929300')
				.build('email', 'required:true, eg:debowalefaulkner@gmail.com')
				.build('firstname', 'required:false, eg:lawal')
				.build('lastname', 'required:false, eg:garuba')
                .build('IP', 'required:true, eg:127.0.0.1')
                .build('network', 'required:true, eg:MTN')
				.build('txRef', 'required:true, eg:MXX-ASC-4578') 
				.build('orderRef', 'required:true, eg:URF_MMGH_1571830523156_7712735')   
				.build('device_fingerprint', 'required:false,eg:12233') 
				.build('voucher', 'required:false')
				.build('payment_type', 'required:true')
				.build('is_ussd', 'required:false')
				.build('is_mpesa', 'required:false')
				.build('is_qr', 'required:false')
				.build('is_mcash', 'required:false')
				.build('is_mobile_money_gh', 'required:false')
				.build('include_integrity_hash', 'required:false')
				.build('redirect_url', 'required:false,eg:http://your_redirect_url.com')
				.end();

function service(data, _rave){

	var d = q.defer();

	q.fcall( () => {

		var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
		var params = validated.params;

		return params;

	})
	.then( params  => {


		if(params.include_integrity_hash){

			delete params.include_integrity_hash;
			var integrity_hash = _rave.getIntegrityHash(params, _rave.getPublicKey(), _rave.getSecretKey());
			params.QUERY_STRING_DATA = JSON.parse(JSON.stringify(params));
			params.QUERY_STRING_DATA.integrity_hash = integrity_hash;

			//console.log(params);
			
			
		}
		//console.log(params);
		var encrypted = _rave.encrypt(params);
		var payload = {};
		payload.PBFPubKey = _rave.getPublicKey();
		payload.client = encrypted;
		payload.alg = '3DES-24';
        //console.log(payload);
       
		return _rave.request('/flwv3-pug/getpaidx/api/charge', payload)
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