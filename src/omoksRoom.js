import React, { useState, useEffect } from 'react';

const OmoksRoom = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // 로그인 후 사용자 정보를 가져오는 API 호출 예시
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://211.253.28.24:3010/getUsers'); // 사용자 정보를 가져오는 API 엔드포인트
        if (!response.ok) {
          throw new Error('사용자 정보를 가져오는 데 실패했습니다.');
        }
        const userData = await response.json();
        setUsers(userData); // 사용자 정보를 상태로 업데이트
      } catch (error) {
        console.error('사용자 정보를 가져오는 중 에러 발생:', error.message);
      }
    };

    fetchUsers(); // 사용자 정보 가져오기
  }, []);

  return (
    <div>
      <h2>온모크스 룸</h2>
      <div>
        <h3>접속 중인 사용자:</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.nickname}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OmoksRoom;
