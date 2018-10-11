const i18n = require('./i18n');
module.exports = async ({ server, app }) => {
  //--------------- index -------------------------------
  server.get('/', async (req, res) => {
    let country = 'th';
    try {
      const dataLocation = await ip2location.fetch(req.ip);
      country = dataLocation.country_code || country;
    } catch (error) {
      console.log(error);
    }
    return res.redirect(`/${country.toLowerCase()}/th`);
  });
  server.get('/:country/:language', (req, res) => {
    const { country, language } = req.params;
    return app.render(req, res, '/index', { country, language });
  });
  //----------------------------------------------------
  //------------------ like ---------------------------
  server.get('/like', async (req, res) => {
    let country = 'th';
    try {
      const dataLocation = await ip2location.fetch(req.ip);
      country = dataLocation.country_code || country;
    } catch (error) {
      console.log(error);
    }
    return res.redirect(`/${country.toLowerCase()}/th/like`);
  });
  server.get('/:country/:language/like', (req, res) => {
    const { country, language } = req.params;
    return app.render(req, res, '/like', { country, language });
  });
  //----------------------------------------------------
  //------------------ follow ---------------------------
  server.get('/follow', async (req, res) => {
    let country = 'th';
    try {
      const dataLocation = await ip2location.fetch(req.ip);
      country = dataLocation.country_code || country;
    } catch (error) {
      console.log(error);
    }
    return res.redirect(`/${country.toLowerCase()}/th/follow`);
  });
  server.get('/:country/:language/follow', (req, res) => {
    const { country, language } = req.params;
    return app.render(req, res, '/follow', { country, language });
  });
  //--------------------------------------------------------
};
