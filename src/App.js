import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]); // 사용자 데이터를 관리하는 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [newUser, setNewUser] = useState({ name: "", email: "", age: "", address: "" }); // 새 사용자 데이터

  // 데이터 가져오기 함수
  const fetchUsers = async () => {
    try {
      const response = await fetch("https://672c8aef1600dda5a9f8de2e.mockapi.io/api/v1/users");
      const data = await response.json();
      setUsers(data); // 가져온 데이터를 상태에 저장
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // 데이터 추가/수정
  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.age || !newUser.address) {
      alert("All fields are required!");
      return;
    }

    try {
      if (newUser.id) {
        // 수정 요청 (PUT)
        const response = await fetch(
          `https://672c8aef1600dda5a9f8de2e.mockapi.io/api/v1/users/${newUser.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
          }
        );
        const updatedUser = await response.json();
        setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user))); // 기존 데이터 업데이트
      } else {
        // 추가 요청 (POST)
        const response = await fetch("https://672c8aef1600dda5a9f8de2e.mockapi.io/api/v1/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });
        const addedUser = await response.json();
        setUsers([...users, addedUser]); // 새로운 사용자 추가
      }

      setNewUser({ name: "", email: "", age: "", address: "" }); // 입력 필드 초기화
      setIsModalOpen(false); // 모달 닫기
    } catch (error) {
      console.error("Error adding/updating user:", error);
    }
  };

  // 데이터 삭제
  const handleDeleteUser = async (id) => {
    try {
      await fetch(`https://672c8aef1600dda5a9f8de2e.mockapi.io/api/v1/users/${id}`, {
        method: "DELETE",
      });
      setUsers(users.filter((user) => user.id !== id)); // 상태에서 삭제된 데이터 제거
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // 데이터 편집
  const handleEditUser = (id) => {
    const editedUser = users.find((user) => user.id === id);
    if (editedUser) {
      setNewUser(editedUser); // 선택된 데이터로 입력 필드 채우기
      setIsModalOpen(true); // 모달 열기
    }
  };

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <header>
        <h1> 🕊️ Pieace Member 🕊️</h1>
      </header>

      <div className="user-form">
        <button className="btn add-btn" onClick={() => setIsModalOpen(true)}>
          Add User
        </button>
      </div>

      {/* 사용자 목록 렌더링 */}
      <div id="user-list" className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-item">
            <p><strong>🙋🏻Name:</strong> {user.name}</p>
            <p><strong>💌Email:</strong> {user.email}</p>
            <p><strong>🗓️Age:</strong> {user.age}</p>
            <p><strong>🏡Address:</strong> {user.address}</p>
            <button className="btn edit-btn" onClick={() => handleEditUser(user.id)}>
              Edit
            </button>
            <button className="btn delete-btn" onClick={() => handleDeleteUser(user.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div id="modal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <div className="user-form">
              <input
                type="text"
                placeholder="Name"
                className="text"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="text"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
              <input
                type="number"
                placeholder="Age"
                className="text"
                value={newUser.age}
                onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
              />
              <input
                type="text"
                placeholder="Address"
                className="text"
                value={newUser.address}
                onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
              />
              <button className="btn add-btn" onClick={handleAddUser}>
                {newUser.id ? "Update User" : "Add User"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
