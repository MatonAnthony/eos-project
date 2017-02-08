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
	//Add a second one
	it('Should return HTTP 200 (POST)', function(done){
		request.post('/Profiles')
			.send({
				  "acronyme": "2DIET",
				  "full_name": "2eme dietetique"
			}).expect(200, done);
	});

	//Create one client (a true one)
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

	//Create a second Client
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

	//Add a ressource on a existing profiles
	it('Should return HTTP 200 (POST)', function(done){
		request.post('/Profiles/1BIN/ressources')
			.send({
				"name": "WINDOWS",
				  "script_template": "dsadd \"nomEtudiant\" ; etc",
				  "export_format": ".bat"
			}).expect(200, done);
	});
	// Same as above
	it('Should return HTTP 200 (POST)', function(done){
		request.post('/Profiles/2DIET/ressources')
			.send({
				"name": "NUTRILOG",
				  "script_template": "dsadd \"nomEtudiant\" ; etc",
				  "export_format": ".pl"
			}).expect(200, done);
	});


	/*******
	 Those next tests, create a ressource, then a profile and link them on profileressource
	 ******/
	it('Should return HTTP 200 (PUT)', function(done){
		request.put('/Ressources')
			.send({
				"name": "UBUNTU",
				  "script_template": "dsadd \"nomEtudiant\" ; etc",
				  "export_format": ".bash"
			}).expect(200, done);
	});

	it('Should return HTTP 200 (POST)', function(done){
		request.post('/Profiles')
			.send({
				  "acronyme": "3BIN",
				  "full_name": "3eme Informatique"
			}).expect(200, done);
	});

	//Here, the id '666' is a fack because we can't force an id on a post/put /Ressources
	it('Should return HTTP 200 (PUT)', function(done){
		request.put('/Profiles/3BIN/ressources/rel/666')
			.send({
			}).expect(200, done);
	});


});
