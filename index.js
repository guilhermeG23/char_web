//Criando constantes
var app = require('express')();
var express = require('express');
//var emoji = require('node-emoji')
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

//Dando a permissao publica a todos os arquivos da pasta public
app.use(express.static('public'));

//Selecionando o arquivo principal
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/html/index.html');
});

//Capturando a entrada e mandando para a saida
io.on('connection', function(socket){
  socket.on('chat message', function(usuario, msg){
    msg = getCurrentDate() + usuario + " - " + msg;
    io.emit('chat message', msg);
  });
});

//Funcao para capturar a data
function getCurrentDate(){
	var currentDate = new Date();
	var day = (currentDate.getDate()<10 ? '0' : '') + currentDate.getDate();
	var month = ((currentDate.getMonth() + 1)<10 ? '0' : '') + (currentDate.getMonth() + 1);
	var year = currentDate.getFullYear();
	var hour = (currentDate.getHours()<10 ? '0' : '') + currentDate.getHours();
	var minute = (currentDate.getMinutes()<10 ? '0' : '') + currentDate.getMinutes();
	var second = (currentDate.getSeconds()<10 ? '0' : '') + currentDate.getSeconds();
	return " [ " + day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second + " ] - ";
}

//Saida do console sobre a porta
http.listen(port, function(){
  console.log('listening on *:' + port);
});
