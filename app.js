var express = require('express')
var port = process.env.PORT || 3000
var app = express()

app.set('views', './views')
app.set('view engine', 'jade')
app.listen(port)

console.log('imooc started on potr ' + port)
app.get("/", function(req, res){
	res.render('index', {
		title: "imooc ��ҳ"
	})
})

app.get("/", function(req, res){
	res.render('detail', {
		title: "imooc ����ҳ"
	})
})

app.get("/", function(req, res){
	res.render('list', {
		title: "imooc �б�ҳ"
	})
})

app.get("/", function(req, res){
	res.render('admin', {
		title: "imooc ¼��ҳ"
	})
})