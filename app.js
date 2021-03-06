var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var mongoose = require('mongoose')
var _ = require('underscore')
var Movie = require('./models/movie')
var User = require('./models/user')
var port = process.env.PORT || 3000
var app = express()
var moment = require('moment'); 

mongoose.connect('mongodb://localhost/imooc')

app.set('views', './views/pages')
app.set('view engine', 'jade')

app.use(bodyParser.urlencoded({}))
// parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))
app.listen(port)

console.log('imooc started on port ' + port)

//signup user
app.post("/user/signup", function(req, res){
    var _user = req.body.user

    User.find({name: _user.name}, function (err, user){
        if (err) {
            console.log(err)
        }
        if (user) {
            return res.redirect('/')
        } else{
            var user = new User(_user)
            user.save(function(err, user){
                if (err) {
                    console.log(err)
                }
                res.redirect('/admin/user/list')
            })
        }
    })
})

//user signin
app.post("/user/signin", function(req, res){
    var _user = req.body.user
    var name = _user.name
    var password = _user.password
    User.findOne({name: name}, function (err, user){
        if (err){
            console.log(err)
        }
        if(!user){
            return res.redirect("/")
        }
        user.comparePassword(password, function(err, isMatch){
            if(err) {
                console.log(err)
            }

            if (isMatch) {
                console.log("PassWord is matched!")
                return res.redirect("/")
            } else {
                console.log("PassWord is not matched!")
            }
        })
    })
})

//user list
app.get("/admin/user/list", function(req, res){
	User.fetch(function(err, user){
		if (err) {
			console.log(err)
		}
		res.render('userlist', {
			titel: "imooc 用户列表",
			users: user
		})
	})
})

//update user
app.get("/admin/user/update/:id", function(req, res){
	var id = req.params.id
	if (id) {
		User.findById(id, function(err, movie) {
			res.render('admin', {
				title: 'imooc 后台更新用户',
				user: user
			})
		})
	}
})

//list delete movie
app.delete("/admin/user/del", function(req, res){
	var name = req.query.name
	if (name) {
		User.remove({'name': name}, function(err, user){
			if(err){
				console.log(err)
			} else {
				res.json({success: 1})
			}
		})
	} 
})

//home page
app.get("/", function(req, res){
	Movie.fetch(function(err, movies){
		if (err) {
			console.log(err)
		}
		res.render('index', {
			title: "imooc 首页",
			movies: movies
		})
	})
	
})

//detail
app.get("/movie/:id", function(req, res){
	var id = req.params.id
	Movie.findById(id, function(err, movie){
		res.render('detail', {
			title: "imooc " + movie.title,
			movie: movie
		})
	})
})

//admin update movie
app.get('/admin/movie/update/:id', function(req, res){
	var id = req.params.id
	if (id) {
		Movie.findById(id, function(err, movie) {
			res.render('admin', {
				title: 'imooc 后台更新页',
				movie: movie
			})
		})
	}
})

//admin post movies
app.post('/admin/movie/new', function(req, res){
	var id = req.body.movie._id

	var movieObj = req.body.movie
	var _movie

	if(id !== 'undefined') {
		Movie.findById(id, function(err, movie) {
			if (err) {
				console.log(err)
			}
			_movie = _.extend(movie, movieObj)
			_movie.save(function(err, movie){
				if (err) {
					console.log(err)
				}

				res.redirect('/movie/' + movie._id)
			})
		})
	} else {
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			country: movieObj.country,
			language: movieObj.language,
			year: movieObj.year,
			poster: movieObj.poster,
			summary: movieObj.summary,
			flash: movieObj.flash
		})

		_movie.save(function(err, movie){
			if (err) {
				console.log(err)
			}

			res.redirect('/movie/' + movie._id)
		})
	}
})

app.get("/admin/list", function(req, res){
	Movie.fetch(function(err, movies){
		if (err) {
			console.log(err)
		}
		res.render('list', {
			title: "imooc 列表页",
			movies: movies
		})
	})
})

//list delete movie
app.delete("/admin/list", function(req, res){
	var id = req.query.id
	if (id) {
		Movie.remove({_id: id}, function(err, movie){
			if(err){
				console.log(err)
			} else {
				res.json({success: 1})
			}
		})
	} 
})

app.get("/admin/movie", function(req, res){
	res.render('admin', {
		title: "imooc 录入页",
		movie: {
			title: '',
			doctor: '',
			country: '',
			year: '',
			poster: '',
			flash: '',
			language: '',
			summary: ''
		}
	})
})
