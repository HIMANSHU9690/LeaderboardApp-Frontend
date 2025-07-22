import React, { useState } from 'react';
import axios from '../api';

const AddUserForm = () => {
  const [name, setName] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleAddUser = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('User name cannot be empty.');
      return;
    }

    try {
      const res = await axios.post('/users', { name });
      if (res.data && res.data.name) {
        setSuccessMsg(`User "${res.data.name}" added!`);
        setName('');
      }
    } catch (err) {
      setErrorMsg('Failed to add user. Maybe the name already exists.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">➕ Add New User</h2>
      <form onSubmit={handleAddUser} className="flex flex-col gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter user name"
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition"
        >
          Add User
        </button>

        {successMsg && <p className="text-green-600 text-center">{successMsg}</p>}
        {errorMsg && <p className="text-red-600 text-center">{errorMsg}</p>}
      </form>
    </div>
  );
};

export default AddUserForm;
