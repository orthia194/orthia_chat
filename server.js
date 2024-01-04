const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // CORS 미들웨어 추가

const app = express();

app.use(express.json());
app.use(cors()); // 모든 origin에 대해 CORS 허용

const connection = mysql.createConnection({
  host: '172.27.0.249',
  user: 'orthia',
  password: 'vjswl1',
  database: 'orthia_omok_db'
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류:', err);
  } else {
    console.log('MySQL 데이터베이스와 연결되었습니다.');
  }
});

app.post('/signup', (req, res) => {
  const { username, password, nickname } = req.body;

  const query = 'INSERT INTO orthia_omok (username, password, nickname) VALUES (?, ?, ?)';
  connection.query(query, [username, password, nickname], (error, results) => {
    if (error) {
      console.error('쿼리 오류:', error);
      res.status(500).send('서버 오류');
    } else {
      res.status(201).json({ message: '회원가입이 완료되었습니다.' });
    }
  });
});

app.post('/checkUsername', (req, res) => {
  const { username } = req.body;

  const query = 'SELECT COUNT(*) AS count FROM orthia_omok WHERE username = ?';
  connection.query(query, [username], (error, results) => {
    if (error) {
      console.error('쿼리 오류:', error);
      res.status(500).send('서버 오류');
    } else {
      const count = results[0].count;
      if (count > 0) {
        res.status(400).json({ message: '중복된 아이디입니다.' });
      } else {
        res.status(200).json({ message: '사용 가능한 아이디입니다.' });
      }
    }
  });
});

const port = 3010;
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
