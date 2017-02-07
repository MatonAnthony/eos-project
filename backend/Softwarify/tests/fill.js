request = require('supertest');
request = request('http://localhost:3000/api');

describe('Fill the db with tests', function() { 

	//Add a profil
	it('Should return HTTP 200 (POST)', function(done){
		request.post('/Profiles')
			.send({
				  "acronyme": "1BIN",
				  "full_name": "1er informatique"
			}).expect(200, done);
	});
	it('Should return HTTP 200 (POST)', function(done){
		request.post('/Profiles')
			.send({
				  "acronyme": "2DIET",
				  "full_name": "2eme dietetique"
			}).expect(200, done);
	});
/*
	it('Should return HTTP 200 (POST)', function(done){
		request.post('/Ressources')
			.send({
				"name": "WINDOWS",
				  "script_template": "dsadd \"nomEtudiant\" ; etc",
				  "export_format": ".bat"
			}).expect(200, done);
	});
*/
	it('Should return HTTP 200 (POST)', function(done){
		request.post('/Clients')
			.send({

			  "identifier": "17850",
			  "first_name": "Alix",
			  "last_name": "BAECKELANDT",
			  "email": "alix.baeckelandt@student.vinci.be",
			  "password": "",
			  "profileId": "1BIN"
			}).expect(200, done);
	});

	it('Should return HTTP 200 (POST)', function(done){
		request.post('/Clients')
			.send({

			  "identifier": "666",
			  "first_name": "Bat",
			  "last_name": "Man",
			  "email": "bat.man@student.vinci.be",
			  "password": "",
			  "profileId": "2DIET"
			}).expect(200, done);
	});


	it('Should return HTTP 200 (POST)', function(done){
		request.post('/Profiles/1BIN/ressources')
			.send({
				"name": "WINDOWS",
				  "script_template": "dsadd \"nomEtudiant\" ; etc",
				  "export_format": ".bat"
			}).expect(200, done);
	});

	it('Should return HTTP 200 (POST)', function(done){
		request.post('/Profiles/2DIET/ressources')
			.send({
				"name": "NUTRILOG",
				  "script_template": "dsadd \"nomEtudiant\" ; etc",
				  "export_format": ".pl"
			}).expect(200, done);
	});
});
