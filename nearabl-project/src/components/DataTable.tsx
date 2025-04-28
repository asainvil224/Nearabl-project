import React from 'react';
import { Person } from '../types';

type Props = {
    people: Person[];
}
const DataTable: React.FC<Props> = ({ people}) => {
  return (
<div className="overflow-x-auto bg-white rounded-2xl shadow-lg p-6">
   <table className="table-auto w-full text-left">
    <thead>
        <tr className="text-gray-600 uppercase text-sm">
            <th className="pb-2">Name</th>
            <th className="pb-2">Company</th>
            <th className="pb-2">State</th>
            <th className="pb-2">Email</th>
        </tr>
    </thead>
    <tbody>
        {people.map((p, i) => (
            <tr className="border-t border-gray-200 hover:bg-gray-100">
                <td className="py-2">{p.first_name} {p.last_name}</td>
                <td className="py-2">{p.company_name}</td>
                <td className="py-2">{p.state}</td>
                <td className="py-2">{p.email}</td>
            </tr>
        ))}
    </tbody>
   </table>
   </div>
  )
};

export default DataTable
