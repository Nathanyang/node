var express = require('express')
var path = require('path')
var port = process.env.PORT || 3000
var app = express()

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(express.bodyParser())

app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port)

console.log('imooc started on potr ' + port)
app.get("/", function(req, res){
	res.render('index', {
		title: "imooc 首页",
		movies: [{
			title: '分歧者:异类觉醒',
			_id: 1,
			poster: 'http://www.youku.com/show_page/id_z7d8bd9f20ee111e3a705.html'
		},
		{
			title: '分歧者:异类觉醒',
			_id: 2,
			poster: 'http://www.youku.com/show_page/id_z7d8bd9f20ee111e3a705.html'
		},
		{
			title: '分歧者:异类觉醒',
			_id: 3,
			poster: 'http://www.youku.com/show_page/id_z7d8bd9f20ee111e3a705.html'
		},
		{
			title: '分歧者:异类觉醒',
			_id: 4,
			poster: 'http://www.youku.com/show_page/id_z7d8bd9f20ee111e3a705.html'
		},
		{
			title: '分歧者:异类觉醒',
			_id: 5,
			poster: 'http://www.youku.com/show_page/id_z7d8bd9f20ee111e3a705.html'
		},
		{
			title: '分歧者:异类觉醒',
			_id: 6,
			poster: 'http://www.youku.com/show_page/id_z7d8bd9f20ee111e3a705.html'
		}]
	})
})

app.get("/movie/:id", function(req, res){
	res.render('detail', {
		title: "imooc 详情页",
		movie: [{
			doctor: '尼尔·博格',
			country: '美国',
			title: '分歧者:异类觉醒',
			year: '2014',
			poster: 'http://www.youku.com/show_page/id_z7d8bd9f20ee111e3a705.html',
			language: '英语',
			flash: 'http://player.youku.com/player.php/sid/XODU1MDE0MjM2/v.swf',
			summary: '一百年前，席卷全球的战争让几乎所有的国家都从地球上消失，幸存的人类聚集在破败的芝加哥。新世界的创始者为了谋求永久的和平，将幸存者们分成了无私派、诚实派、无畏派、友好派和博学派。每个派系都有自己专门的社会职责，他们通力合作促进这个世界的进步。美丽女孩碧翠丝（谢琳·伍德蕾 饰）出生于无私派家庭，她和其他同龄人一样，将在16岁那年决定自己终身所属的派系。然而测试表明她是一个极为少见的...'
		}]
	})
})

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

app.get("/admin/movie", function(req, res){
	res.render('admin', {
		title: "imooc 录入页"，
		movies: {
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
