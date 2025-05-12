const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data.json');
const middlewares = jsonServer.defaults();

const crypto = require('crypto');
const fs = require('fs')

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Middleware add id and created if POST
server.post('/users', (req, res, next) => {
  const db = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
  const users = db.users || [];

  const { username } = req.body;

  const isDuplicate = users.some(user => user.username.toLowerCase() === username.toLowerCase());

  if (isDuplicate) {
    return res.status(409).json({ error: 'Username already exists' });
  }

  if (!req.body.id) {
    req.body.id = crypto.randomBytes(3).toString('hex'); // 6 character
  }
  if (!req.body.created) {
    req.body.created = new Date().toISOString(); // timestamp ISO
  }
  if (!req.body.role) {
    req.body.role = 'CLIENT';
  }
  next();
});

server.get('/products/:code', (req, res) => {
  const { code } = req.params
  const product = router.db.get('products').find({ code }).value()
  if (product) {
    res.jsonp(product)
  } else {
    res.jsonp(null)
  }
})

server.post('/products', (req, res, next) => {
  const db = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
  const products = db.products || [];

  const { code } = req.body;

  const isDuplicate = products.some(product => product.code.toLowerCase() === code.toLowerCase());

  if (isDuplicate) {
    return res.status(409).json({ error: 'Code already exists' });
  }

  if (!req.body.created) {
    req.body.created = new Date().toISOString();
  }

  if (!req.body.id) {
    req.body.id = crypto.randomBytes(3).toString('hex');
  }

  router.db.get('products').push(req.body).write();
  res.status(201).jsonp(req.body);
});

server.put('/products/:code', (req, res) => {
  const { code } = req.params;
  const productData = req.body;

  // find index product with code
  const productIndex = router.db.get('products').findIndex({ code }).value();

  if (productIndex === -1) {
    return res.status(404).jsonp({ error: 'Product not found' });
  }

  const updatedProduct = { ...router.db.get('products').get(productIndex).value(), ...productData };
  router.db.get('products').get(productIndex).assign(updatedProduct).write();

  return res.jsonp(updatedProduct);
});

server.delete('/products/:code', (req, res) => {
  const { code } = req.params;

  // find index
  const productIndex = router.db.get('products').findIndex({ code }).value();
  if (productIndex === -1) {
    return res.status(404).jsonp({ error: 'Product not found' });
  }

  // delete
  router.db.get('products').remove({ code }).write();

  return res.status(204).jsonp();
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});
// "api": "npx json-server --watch data.json --port 3000"
