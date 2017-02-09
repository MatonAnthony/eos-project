'use strict';

module.exports = function(Ressource) {
  Ressource.observe('before save', function checkExportFormat(ctx, next) {
    if (ctx.instance){
      var format = ctx.instance.export_format;
      if(format.charAt(0) !=  '.'){
        format = '.' + format;
        ctx.instance.export_format = format;
      }
    }
    next();
  });
};

