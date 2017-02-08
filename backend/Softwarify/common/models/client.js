'use strict';
const generator = require('generate-password');

module.exports = function(Client) {
  //Will generate a random password when a client is created
  Client.observe('before save', function generatePassword(ctx, next) {
    if (ctx.instance){
      //Ensure that it's a creation operation and not an update. It checks if a client with this identifier is already created
     let exists = Client.exists(ctx.instance.identifier,
       function(err, exists){
          if(!exists){
            let password = generator.generate({
              length: 10,
              number: true
            });
            ctx.instance.password = password;
            next();
          }
        }
      );
    }
  });
};
