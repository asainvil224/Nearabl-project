import React from "react";
import { Person } from "../types";

const CompanyCard: React.FC<{ person: Person }> = ({ person }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
      
      <video width="400" height="300" controls>
        <source src="https://raw.githubusercontent.com/jinchen003/Nearabl.Sample.Data/main/neARabl.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      
      <h2 className="text-2xl font-semibold text-gray-800">{person.company_name}</h2>
      <p className="text-gray-600">{person.address}</p>
      <p className="text-gray-600">{person.city}, {person.state} {person.zip}</p>
      <p className="text-gray-600">Phone: {person.phone1}</p>
      <p className="text-gray-600">Website: <a href={person.web} target="_blank" rel="noopener noreferrer">{person.web}</a></p>
    </div>
  );
};

export default CompanyCard;
