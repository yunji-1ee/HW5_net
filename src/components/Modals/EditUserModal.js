import React, { useState } from "react";

const EditUserModal = ({ onClose, user, fetchUsers }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age);
  const [address, setAddress] = useState(user.address);

  const handleEditUser = async () => {
    try {
      await fetch('https://672c8aef1600dda5a9f8de2e.mockapi.io/api/v1/users/${user.id}', {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, age, address }),
      });
      fetchUsers();
      onClose();
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={age} onChange={(e) => setAge(e.target.value)} />
      <input value={address} onChange={(e) => setAddress(e.target.value)} />
      <button onClick={handleEditUser}>Save</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EditUserModal;
