import React from 'react';

class UserProfile extends React.Component {
  render() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-green-700 text-white">
        <div className="bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-lg shadow-lg w-80">
          <h2 className="text-3xl font-bold text-center mb-4">User Profile</h2>
          <p className="text-lg mb-2">Name: Noura Nabil</p>
          <p className="text-lg mb-2">Email: nora@example.com</p>
          <p className="text-lg">Location: Cairo, Egypt</p>
        </div>
      </div>
    );
  }
}

export default UserProfile;
