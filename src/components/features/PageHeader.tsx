import { Plus, Upload } from "lucide-react";
import { useState } from "react";
import { PageHeaderProps } from "../../store/contact.state";

const PageHeader = ({ onSearch, onAdd, onExport }: PageHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');

  const alphabet = Array.from({ length: 26 }, (_, i) => 
    String.fromCharCode(65 + i)
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch({
      searchQuery: e.target.value,
      filter: filter,
    });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    onSearch({
      searchQuery: searchQuery,
      filter: selectedFilter,
    });
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gray-100 shadow-md w-[90%] md:w-[70%] mx-auto">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="rounded-md px-4 py-2 bg-[#eee] w-[400px] focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        
        <select
          className="rounded-md px-4 py-2 bg-[#eee] focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          {alphabet.map((letter) => (
            <option key={letter} value={letter}>
              {letter}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3">
        <button onClick={() => onAdd()} className="bg-white text-black px-4 py-2 rounded-md flex items-center border border-gray-300 hover:bg-gray-200">
          <Plus className="w-5 h-5 mr-2" /> Add Contact
        </button>
        <button onClick={() => onExport()} className="bg-white text-black px-4 py-2 rounded-md flex items-center border border-gray-300 hover:bg-gray-200">
          <Upload className="w-5 h-5 mr-2" /> Export
        </button>
      </div>
    </div>
  );
};

export default PageHeader;
