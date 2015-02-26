var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var mongoose = require('mongoose')
var _ = require('underscore')
var Movie = require('./models/movie')
var port = process.env.PORT || 3000
var app = express()

mongoose.connect('mongodb://localhost/imooc')

app.set('views', './views/pages')
app.set('view engine', 'jade')

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port)

console.log('imooc started on potr ' + port)

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
			_movie = _.extended(movie, movieObj)
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

/*app.get("/", function(req, res){
	res.render('index', {
		title: "imooc 首页",
		movies: [{
			title: '分歧者:异类觉醒',
			_id: 1,
			poster: 'http://r2.ykimg.com/051600005402ED6267379F1062086E08'
		},
		{
			title: '分歧者:异类觉醒',
			_id: 2,
			poster: 'http://r2.ykimg.com/051600005402ED6267379F1062086E08'
		},
		{
			title: '分歧者:异类觉醒',
			_id: 3,
			poster: 'http://r2.ykimg.com/051600005402ED6267379F1062086E08'
		},
		{
			title: '分歧者:异类觉醒',
			_id: 4,
			poster: 'http://r2.ykimg.com/051600005402ED6267379F1062086E08'
		},
		{
			title: '分歧者:异类觉醒',
			_id: 5,
			poster: 'http://r2.ykimg.com/051600005402ED6267379F1062086E08'
		},
		{
			title: '分歧者:异类觉醒',
			_id: 6,
			poster: 'http://r2.ykimg.com/051600005402ED6267379F1062086E08'
		}]
	})
})*/

/*app.get("/movie/:id", function(req, res){
	res.render('detail', {
		title: "imooc 详情页",
		movie: {
			doctor: '尼尔·博格',
			country: '美国',
			title: '分歧者:异类觉醒',
			year: '2014',
			poster: 'http://r2.ykimg.com/051600005402ED6267379F1062086E08',
			language: '英语',
			flash: 'http://player.youku.com/player.php/sid/XODU1MDE0MjM2/v.swf',
			summary: '一百年前，席卷全球的战争让几乎所有的国家都从地球上消失，幸存的人类聚集在破败的芝加哥。新世界的创始者为了谋求永久的和平，将幸存者们分成了无私派、诚实派、无畏派、友好派和博学派。每个派系都有自己专门的社会职责，他们通力合作促进这个世界的进步。美丽女孩碧翠丝（谢琳·伍德蕾 饰）出生于无私派家庭，她和其他同龄人一样，将在16岁那年决定自己终身所属的派系。然而测试表明她是一个极为少见的...'
		}
	})
})*/
/*
app.get("/admin/list", function(req, res){
	res.render('list', {
		title: "imooc 列表页",
		movies: [{
			title: '分歧者:异类觉醒',
			_id: 1,
			doctor: '尼尔·博格',
			country: '美国',
			year: '2014',
			language: '英语',
			flash: 'http://player.youku.com/player.php/sid/XODU1MDE0MjM2/v.swf',
			summary: '一百年前，席卷全球的战争让几乎所有的国家都从地球上消失，幸存的人类聚集在破败的芝加哥。新世界的创始者为了谋求永久的和平，将幸存者们分成了无私派、诚实派、无畏派、友好派和博学派。每个派系都有自己专门的社会职责，他们通力合作促进这个世界的进步。美丽女孩碧翠丝（谢琳·伍德蕾 饰）出生于无私派家庭，她和其他同龄人一样，将在16岁那年决定自己终身所属的派系。然而测试表明她是一个极为少见的...'
		}]
	})
})
*/
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
