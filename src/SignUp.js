import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const checkUsername = async () => {
    try {
      const response = await fetch('http://211.253.28.24:3010/checkUsername', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: formData.username }),
      });

      if (!response.ok) {
        throw new Error('서버 응답 오류');
      }

      const data = await response.json();
      if (data.message === '중복된 아이디입니다.') {
        setPasswordError('중복된 아이디입니다.');
      } else {
        setPasswordError('');
      }
    } catch (error) {
      console.error('Fetch Error:', error.message);
    }
  };

  // 아이디 입력 필드의 onChange 이벤트 핸들러
  const handleUsernameChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, username: value });
    checkUsername(); // 아이디 입력 변경 시 중복 체크 함수 호출
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 중복 여부 확인
    try {
      const response = await fetch('http://211.253.28.24:3010/checkUsername', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: formData.username }),
      });

      if (!response.ok) {
        throw new Error('서버 응답 오류');
      }

      const data = await response.json();
      if (data.message === '중복된 아이디입니다.') {
        setPasswordError('중복된 아이디입니다.');
        return; // 중복된 경우 여기서 함수 중단
      } else {
        setPasswordError('');
      }
    } catch (error) {
      console.error('Fetch Error:', error.message);
      return;
    }

    // 모든 필드가 채워져 있는지 확인
    if (
      formData.username.trim() === '' ||
      formData.password.trim() === '' ||
      formData.confirmPassword.trim() === '' ||
      formData.nickname.trim() === ''
    ) {
      setFormError('모든 필드를 입력해주세요.');
      return;
    } else {
      setFormError('');
    }

    // 중복되지 않은 경우에만 회원가입 실행
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await fetch('http://211.253.28.24:3010/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || '회원가입에 실패했습니다.');
      }

      const data = await response.json();
      console.log(data);
      window.location.href = 'http://211.253.28.24:3000/';
    } catch (error) {
      console.error('Fetch Error:', error.message);
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>아이디:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleUsernameChange} // 변경 시 중복 체크 함수 호출
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
        <div>
          <label>비밀번호 확인:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>닉네임:</label>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleInputChange}
          />
        </div>
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        {formError && <p style={{ color: 'red' }}>{formError}</p>}
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;
