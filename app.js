/* eslint-disable comma-dangle */
const express = require('express');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
  secret: 'library',
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

require('./src/config/passport')(app);

app.use(express.static(path.join(__dirname, '/public/')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [{
  link: '/books',
  title: 'Books',
},
{
  link: '/authors',
  title: 'Authors',
},
];

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav,
      title: 'Library'
    }
  );
});
app.listen(4000, () => {
  debug('listening on port 4000 ');
});
