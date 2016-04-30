export default {
  indexRouteHandler(param, req, res, next) {
    Assets.getText('templates/index.html', (err, templateString) => {
      res.end(templateString);
    });
  },
}
