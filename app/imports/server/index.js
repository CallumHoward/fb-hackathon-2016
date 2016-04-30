import handlebars from 'handlebars';

const fbAppId = process.env.FB_APPID;

export default {
  indexRouteHandler(param, req, res, next) {
    Assets.getText('templates/index.hbs', (err, templateString) => {
      res.end(handlebars.compile(templateString)({ fbAppId }));
    });
  },
}
