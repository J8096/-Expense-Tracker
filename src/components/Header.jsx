const Header = ({ toggleTheme }) => {
    return (
      <div className="flex justify-between items-center p-5 bg-blue-600 text-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold">Expense Tracker</h2>
        <button onClick={toggleTheme} className="bg-gray-800 px-3 py-1 rounded">
          🌙
        </button>
      </div>
    );
  };
  
  export default Header;
  