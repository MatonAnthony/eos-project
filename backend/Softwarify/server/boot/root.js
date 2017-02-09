'use strict';
module.exports = function(server) {
  const fs = require("fs");
  const path = require("path");
  const tmp = require('tmp');
  const PDFDocument = require('pdfkit');
  const csv = require("fast-csv");

  // Install a `/` route that returns server status
  let router = server.loopback.Router();
  router.get('/', server.loopback.status());

  //GET with param identifier
  //USE /pdf/{identifier}
  //If identifier is false, then HTTP-code 403
  router.get('/api/pdf/:identifier', function(req, res) {
    let identifier = req.params.identifier;
    res.setHeader('Content-Type', 'application/pdf');

    server.models.Client.findById(identifier, function(err, client) {
      if (client == null) {
        res.status(403);
        res.send('You shall not pass');
      } else {
        server.models.Profile.findById(client.profileId, {
          include: 'ressources'
        }, function(err, profile) {
          let doc = new PDFDocument({
            size: 'LEGAL',
            info: {
              Title: 'Feuille de login',
              Author: 'Softwarify',
            }
          });
          doc.fontSize(25).text('Feuille de login', 100, 80);
          doc.fontSize(10).text('Matricule de l\'étudiant : ' + client.identifier);
          doc.fontSize(10).text('Votre mot de passe est : ' + client.password);
          doc.fontSize(10).text('Vous avez acces aux ressources suivantes: ');
          profile = profile.toJSON();
          for (let i in profile.ressources) {
            let name = profile.ressources[i].name;
            doc.fontSize(10).text(name);
          }
          doc.pipe(res);
          doc.end();
        });
      }
    });
  });


  //GET with param id
  //USE /script/{id}
  router.get('/api/script/:id', function(req, res) {

    //Works with the ressource
    server.models.Ressource.findById(req.params.id, function(err, ressource) {
      if (err)
        return console.log(err);
      let content = 'Scripts for ' + ressource.name + ' \n',
        template = ressource.script_template,
        profilesTab = [],
        ressourceId = ressource.id;

      //Works with all the profiles
      server.models.Profile.find({
        include: 'ressources'
      }, function(err, profiles) {
        if (err)
          return console.log(err);
        //Keeps only the profiles associated with the ressource and put them in profilesTab
        profiles.forEach(function(profile) {
          let found = false;
          profile = profile.toJSON();
          for (let i in profile.ressources) {
            if (profile.ressources[i].id == ressourceId) {
              found = true;
              break;
            }
          }
          if (found)
            profilesTab.push(profile.acronyme);
        });

        //Works with all the clients that belong to the selected profiles
        server.models.Client.find({
          where: {
            profileId: {
              inq: profilesTab
            }
          }
        }, function(err, clients) {
          if (err)
            return console.log(err);
          //Genereates the script for each client and adds it to content
          clients.forEach(function(client) {
            let line = template.replace('$idEtudiant', client.identifier)
              .replace('$NomEtudiant', client.last_name)
              .replace('$PrenomEtudiant', client.first_name)
              .replace('$emailEtudiant', client.email)
              .replace('$motDePasse', client.password);
            content += line + '\n';
          });
          //Writes the content in a temporary file
          tmp.file({
            mode: 0o644,
            prefix: ressource.name + '-',
            postfix: ressource.export_format
          }, function _tempFileCreated(err, path, fd) {
            fs.writeFile(path, content, function(err) {
              if (err)
                return console.log(err);
              let now = new Date(),
                year = now.getFullYear(),
                month = now.getMonth() + 1,
                day = now.getDate(),
                hour = now.getHours(),
                minute = now.getMinutes(),
                disposition = 'attachment; fileName=' + ressource.name + '_' + day + '_' + month + '_' + year + '_' + hour + '_' + minute + ressource.export_format;
              res.setHeader("Content-Disposition", disposition);
              res.setHeader("Content-type", "application/octet-stream");
              res.sendFile(path);
            });
          });
        })
      });
    });
  });

  //POST request on /import with the csv as blob-stream
  router.post('/api/import', function(req, res) {
    let contype = req.headers['content-type'];
    if (!contype || contype.indexOf('text/csv') !== 0)
      return res.sendStatus(400);

    req.pipe(csv.parse({
        headers: true
      })).transform(function(row) {
        let data = [{
          identifier: row["Matric Info"],
          first_name: row["Nom Etudiant"],
          last_name: row["Prenom Etudiant"],
          email: row["EMail Etudiant 2"],
          profileId: row["Annee"].substr(0, 1) + row["Orientation"]
        }];
        server.models.Client.create(data, function(err, user) {
          if (err) console.log(err);
        });
      })
      .on("readable", function() {
        let row;
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
}