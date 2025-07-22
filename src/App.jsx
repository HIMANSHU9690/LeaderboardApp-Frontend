import UserSelector from './components/UserSelector';
import Leaderboard from './components/Leaderboard';
import AddUserForm from './components/AddUserForm';
import './App.css'; 
import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">🏆 Leaderboard App</h1>
      <UserSelector />
       <Leaderboard />
         <AddUserForm />
    </div>
  );
}

export default App;
