// ✅ Load environment variables from .env
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const createError = require('http-errors');

const app = express();

// ✅ Middleware
app.use(bodyParser.json());
app.use(cors());

// ✅ Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ MongoDB setup
const dbConfig = require('./db/database');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true, // add this for stability
})
  .then(() => {
    console.log('✅ Database connected');
  })
  .catch((error) => {
    console.error('❌ Database connection error: ', error);
  });

// ✅ Routes
const orderlistRoutes = require('./routes/orderlist.routes');
const adminRoutes = require('./routes/admin.routes');
const authadminRoutes = require('./routes/authadmin.routes');
const userRoutes = require('./routes/user.routes');
const authuserRoutes = require('./routes/authuser.routes');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const customerRoutes = require('./routes/customer.routes');
const blogRoutes = require('./routes/blog.routes');

// ✅ Use routes
app.use('/orderlist', orderlistRoutes);
app.use('/admin', adminRoutes);
app.use('/authadmin', authadminRoutes);
app.use('/user', userRoutes);
app.use('/authuser', authuserRoutes);
app.use('/admin-category', categoryRoutes);
app.use('/admin-product', productRoutes);
app.use('/orders', orderRoutes);
app.use('/customers', customerRoutes);
app.use('/admin-blog', blogRoutes);

// ✅ Base endpoint
app.get('/', (req, res) => {
  res.send('invalid endpoint');
});

// ✅ 404 handler
app.use((req, res, next) => {
  next(createError(404));
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// ✅ Start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('✅ Server running on port: ' + port);
});
