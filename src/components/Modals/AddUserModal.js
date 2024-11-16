import React, { useState } from "react";

const AddUserModal = ({ onClose, fetchUsers }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");

  const handleAddUser = async () => {
    try {
      await fetch("https://672c8aef1600dda5a9f8de2e.mockapi.io/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, age, address }),
      });
      fetchUsers();
      onClose();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
      <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
      <button onClick={handleAddUser}>Add</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AddUserModal;
