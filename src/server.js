const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '../build/');
const port = process.env.PORT || 5000;
app.use(express.static(publicPath));
app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});
app.get('*.js', function (req, res, next) {
   req.url = req.url + '.gz';
   res.set('Content-Encoding', 'gzip');
   next();
 });
app.listen(port, () => {
  // const port = app.address().port;
   console.log('Server is up! on port'+ port);
});
