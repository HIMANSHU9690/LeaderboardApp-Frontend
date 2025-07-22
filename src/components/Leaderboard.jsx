import React, { useEffect, useState } from 'react';
import axios from '../api';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get('/users');
      // Sort by total points descending
      const sorted = res.data.sort((a, b) => b.totalPoints - a.totalPoints);
      setUsers(sorted);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchLeaderboard(); 
    }, 3000);

    fetchLeaderboard();

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 mt-8">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">📊 Live Leaderboard</h2>
      <table className="w-full text-left table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-4 py-2 border">Rank</th>
            <th className="px-4 py-2 border">User</th>
            <th className="px-4 py-2 border">Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className="text-gray-700">
              <td className="px-4 py-2 border text-center font-medium">{index + 1}</td>
              <td className="px-4 py-2 border">{user.name}</td>
              <td className="px-4 py-2 border text-center">{user.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
