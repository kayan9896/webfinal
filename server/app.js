var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const cors = require("cors");
var user = require('./model/user');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//register
app.use("/", (req, res, next) => {
	try {
	  if (req.path == "/login" || req.path == "/register" || req.path == "/") {
		next();
	  } else {
		/* decode jwt token if authorized*/
		jwt.verify(req.headers.token, 'test1', function (err, decoded) {
		  if (decoded && decoded.user) {
			req.user = decoded;
			next();
		  } else {
			return res.status(401).json({
			  errorMessage: 'User unauthorized!',
			  status: false
			});
		  }
		})
	  }
	} catch (e) {
	  res.status(400).json({
		errorMessage: 'Something went wrong!',
		status: false
	  });
	}
  })

  //login
  app.use("/", (req, res, next) => {
	try {
	  if (req.path == "/login" || req.path == "/register" || req.path == "/") {
		next();
	  } else {
		/* decode jwt token if authorized*/
		jwt.verify(req.headers.token, 'test1', function (err, decoded) {
		  if (decoded && decoded.user) {
			req.user = decoded;
			next();
		  } else {
			return res.status(401).json({
			  errorMessage: 'User unauthorized!',
			  status: false
			});
		  }
		})
	  }
	} catch (e) {
	  res.status(400).json({
		errorMessage: 'Something went wrong!',
		status: false
	  });
	}
  })
module.exports = app;
