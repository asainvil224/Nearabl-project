import React, { useEffect, useState } from 'react';
import Papa from "papaparse";
import { Person } from './types';
import UserCard from './components/UserCard';
import CompanyCard from './components/CompanyCard';
import DataTable from './components/DataTable';

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

const DATA_URL = "https://raw.githubusercontent.com/jinchen003/Nearabl.Sample.Data/main/us-500.csv";

function App() {
  const [data, setData] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchField, setSearchField] = useState("state");
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<Person[]>([]);

  useEffect(() => {
    Papa.parse<Person>(DATA_URL, {
      download: true,
      header: true,
      complete: (results) => {
        setData(results.data as Person[]);
        setLoading(false);
      },
    });
  }, []);

  const handleSearch = () => {
    const matches = data.filter(person => {
      const fieldValue = person[searchField as keyof Person];
      if (!fieldValue) return false;
      if (searchField === "company_name") {
        return fieldValue.toLowerCase() === searchValue.toLowerCase();
      }
      return fieldValue.toLowerCase().includes(searchValue.toLowerCase());
    });
    setResults(matches);
    setSearchValue("");
  };

  const clearResults = () => {
    setResults([]);
    setSearchValue("");
  };

  if (loading) return <p className="text-center text-lg font-semibold mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Nearabl Web App</h1>

      <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="flex flex-col md:flex-row gap-4 mb-8 w-full max-w-4xl">
        <select
          onChange={e => { setSearchField(e.target.value); setSearchValue(""); }}
          value={searchField}
          className="flex-1 p-3 rounded-xl border border-gray-300 focus:ring focus:ring-blue-300"
        >
          <option value="state">State</option>
          <option value="first_name">First Name</option>
          <option value="company_name">Company Name</option>
        </select>

        {searchField === "state" ? (
          <select
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className="flex-1 p-3 rounded-xl border border-gray-300 focus:ring focus:ring-blue-300"
          >
            <option value="">Select a state</option>
            {US_STATES.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            placeholder="Enter name"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className="flex-1 p-3 rounded-xl border border-gray-300 focus:ring focus:ring-blue-300"
          />
        )}

        <button type="submit" className="flex-1 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">Search</button>
        <button type="button" onClick={clearResults} className="flex-1 p-3 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition">Clear Results</button>
      </form>

      <div className="w-full max-w-4xl space-y-6">
        {results.length === 0 ? (
          <p className="text-center text-gray-600">No results found. Try another search!</p>
        ) : results.length === 1 && searchField === "first_name" ? (
          <UserCard person={results[0]} />
        ) : results.length === 1 && searchField === "company_name" ? (
          <CompanyCard person={results[0]} />
        ) : (
          <DataTable people={results} />
        )}
      </div>
    </div>
  );
}

export default App;
