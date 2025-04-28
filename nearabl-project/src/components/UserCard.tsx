import React from 'react'
import { Person } from '../types';


const UserCard: React.FC<{ person: Person }> = ({ person }) => {

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-2">
      <img
        src="https://raw.githubusercontent.com/jinchen003/Nearabl.Sample.Data/main/user.png"
        alt="User"
        style={{ width: "150px", height: "150px" }}
      />
      <h2 className="text-2xl font-semibold text-gray-800">{person.first_name} {person.last_name}</h2>
      <p className="text-gray-600">Email: {person.email}</p>
      <p className="text-gray-600">Phone: {person.phone1}</p>
    </div>
  )
};

export default UserCard
