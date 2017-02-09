'use strict';

module.exports = function(server) {
	// Install a `/` route that returns server status
	var router = server.loopback.Router();
	router.get('/', server.loopback.status());

	//GET with param identifier
	//USE /pdf/{identifier}
	//If identifier is false, then HTTP-code 403
	router.get('/pdf/:identifier', function(req, res) {
		var identifier = req.params.identifier;
		res.setHeader('Content-Type', 'application/pdf');

		server.models.Client.findById(identifier, function(err, client) {
			if (client == null) {
				res.status(403);
				res.send('You shall not pass');
			} else {
				server.models.Profile.findById(client.profileId, {
					include: 'ressources'
				}, function(err, profile) {
					var PDFDocument = require('pdfkit');
					var doc = new PDFDocument({
						size: 'LEGAL',
						info: {
							Title: 'Feuille de login',
							Author: 'Softwarify',
						}
					});
					doc.fontSize(25).text('Feuille de login', 100, 80);
					doc.fontSize(10).text('Matricule de l\'étudiant : ' + client.identifier);
					doc.fontSize(10).text('Votre mot de pass est : ' + client.password);
					doc.fontSize(10).text('Vous avez acces aux ressources suivantes: ');
					profile = profile.toJSON();
					for (var i in profile.ressources) {
						var name = profile.ressources[i].name;
						doc.fontSize(10).text(name);
					}
					doc.pipe(res);
					doc.end();
				});
			}
		});
	});

	//POST request on /import with the csv as blob-stream
	router.post('/import', function(req, res) {
		var csv = require("fast-csv");

		var contype = req.headers['content-type'];
		if (!contype || contype.indexOf('text/csv') !== 0)
			return res.send(400);

		req.pipe(csv.parse({
				headers: true
			})).transform(function(row) {
				var data = [{
					identifier: row["Matric Info"],
					first_name: row["Nom Etudiant"],
					last_name: row["Prenom Etudiant"],
					email: row["EMail Etudiant 2"],
					profileId: row["Annee"].substr(0, 1) + row["Orientation"]
				}];
				server.models.Client.create(data, function(err, user) {
					if (err) console.log(err);
					console.log(user);
				});
			})
			.on("readable", function() {
				var row;
				while (null !== (row = req.read())) {
					console.log(row);
				}
			})
			.on("end", function() {
				process.exit;
			});
		res.status(200);
		res.send('import ok');
	});

	server.use(router);
};