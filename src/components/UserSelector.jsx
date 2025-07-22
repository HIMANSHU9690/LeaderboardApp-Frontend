import React, { useEffect, useState } from 'react';
import axios from '../api';

const UserSelector = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [claimedPoints, setClaimedPoints] = useState(null);

  // Fetch users on mount
  const fetchUsers = async () => {
    try {
      const res = await axios.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClaim = async () => {
    if (!selectedUserId) return;
    try {
      const res = await axios.post(`/claims/${selectedUserId}`);
      const points = res.data.claim.points;
      setClaimedPoints(points);
      fetchUsers(); // refresh users (for updated leaderboard)
    } catch (err) {
      console.error('Failed to claim points', err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">🎯 Select User & Claim Points</h2>

      <select
        className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
      >
        <option value="">Select a user</option>
        {users.map(user => (
          <option key={user._id} value={user._id}>{user.name}</option>
        ))}
      </select>

      <button
        onClick={handleClaim}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        disabled={!selectedUserId}
      >
        Claim Points
      </button>

      {claimedPoints && (
        <p className="mt-4 text-center text-green-600 font-semibold">
          🎉 {claimedPoints} points awarded!
        </p>
      )}
    </div>
  );
};

export default UserSelector;
