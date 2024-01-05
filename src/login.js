import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loginError, setLoginError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://211.253.28.24:3010/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('로그인 실패');
      }

      // 로그인 성공 시, 다음 단계로 이동
      // 예를 들어, 성공 시 다른 페이지로 이동하는 등의 로직을 추가할 수 있습니다.
      const data = await response.json();
      console.log(data);
      window.location.href = 'http://211.253.28.24:3000/omoksRoom';
    } catch (error) {
      console.error('로그인 에러:', error.message);
      setLoginError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>아이디:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        <button type="submit">로그인</button>
      </form>
      <div><a href='http://211.253.28.24:3000/signup'>회원가입</a></div>
    </div>
  );
};

export default Login;
