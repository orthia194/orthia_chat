// server.js

const express = require('express');
const mysql = require('mysql');

const app = express();

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: '172.27.0.249', // 데이터베이스 호스트 주소
  user: 'orthia', // MySQL 사용자명
  password: 'vjswl1', // MySQL 비밀번호
  database: 'orthia_omok_db' // 사용할 데이터베이스 이름
});

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류:', err);
  } else {
    console.log('MySQL 데이터베이스와 연결되었습니다.');
  }
});

// 예시: 사용자 테이블에서 데이터 가져오기
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error('쿼리 오류:', err);
      res.status(500).send('서버 오류');
    } else {
      res.json(rows); // 받아온 데이터를 JSON 형태로 응답
    }
  });
});

// 서버 시작
const port = 3010; // 포트번호 설정
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
