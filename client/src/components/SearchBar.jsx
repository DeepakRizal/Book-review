const SearchBar = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="flex w-full max-w-lg space-x-4">
        <input
          type="text"
          placeholder="Search for books..."
          className="w-full px-3  rounded-lg border border-gray-300 focus:outline-none  "
        />
        <button className="px-6 py-1 bg-slate-800 text-white rounded-lg hover:bg-slate-900 focus:outline-none cursor-pointer focus:ring-2 focus:ring-blue-500">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
