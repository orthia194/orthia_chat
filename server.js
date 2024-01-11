const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: '172.27.0.249',
  user: 'orthia',
  password: '',
  database: 'orthia_omok_db'
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류:', err);
  } else {
    console.log('MySQL 데이터베이스와 연결되었습니다.');
  }
});

app.post('/signup', async (req, res) => { // 비밀번호 해싱 추가
  const { username, password, nickname } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 비밀번호 해싱
    const query = 'INSERT INTO orthia_omok (username, password, nickname) VALUES (?, ?, ?)';
    connection.query(query, [username, hashedPassword, nickname], (error, results) => {
      if (error) {
        console.error('쿼리 오류:', error);
        res.status(500).send('서버 오류');
      } else {
        res.status(201).json({ message: '회원가입이 완료되었습니다.' });
      }
    });
  } catch (error) {
    console.error('비밀번호 해싱 오류:', error);
    res.status(500).send('서버 오류');
  }
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

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM orthia_omok WHERE username = ?';
  connection.query(query, [username], async (error, results) => {
    if (error) {
      console.error('쿼리 오류:', error);
      res.status(500).send('서버 오류');
    } else {
      if (results.length === 0) {
        res.status(401).send('아이디 또는 비밀번호가 올바르지 않습니다.');
        return;
      }

      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        res.status(401).send('아이디 또는 비밀번호가 올바르지 않습니다.');
        return;
      }

      // 로그인 성공 시, JSON 응답 보내기
      res.status(200).json({ message: '로그인 성공' });
    }
  });
});

app.get('/getUsers', (req, res) => {
  const username = req.params.username;
  const query = 'SELECT id, username, nickname FROM orthia_omok WHERE username = ?';
  connection.query(query, [username], (error, results) => {
    if (error) {
      console.error('쿼리 오류:', error);
      res.status(500).send('서버 오류');
    } else {
      res.status(200).json(results);
    }
  });
});



const port = 3010;
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
