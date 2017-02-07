	mocha = require('mocha');
let request = require('supertest');
request = request('http://localhost:3000');

describe('Login route related', function() {


	it('Should return HTTP 200', function(done){
		request.post('/login')
			.send({
				username: '',
				password: '',
			}).expect(200, done());
	});

	it('Should return HTTP 403', function(done){
		request.post('/login')
			.send({
				username: 'Ceciestunfauxlogin',
				password: 'Ceciestunfauxmdp',
			}).expect(403, done());
	});

	
});