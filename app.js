const express = require('express');
const app = express(); //exoress는 함수이므로 반환값을 변수에 저장
const dotenv = require("dotenv").config();
const mysqlConnectionObj = require("./config/mysql.js");
const db = mysqlConnectionObj.init();

const port = 3000;

mysqlConnectionObj.open(db);

//Opening a server
app.listen(port, function () {
    console.log("✅ Express Server On Port 3000 Starts");
});

//Url Routing 처리
// localhost:3000/main
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/main.html");
});

//Join page
app.get('/join', function (req, res) {
    res.sendFile(__dirname + "/public/join.html");
});







//Static Files
// Static File이란? 
//  - 서버를 배포하기 전에 미리 만들어 놓은 css, js, img 파일 등을 통틀어 이르는 말
app.use(express.static('public'));

