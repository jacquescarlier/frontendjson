import PropTypes from 'prop-types';

const Navbar = ({ setMode, onEdit, onDelete, searchTerm, onSearchChange }) => {
  const handleDeleteSelected = () => {
    if (window.confirm('Are you sure you want to delete the selected items?')) {
      onDelete();
    }
  };

  return (
    <nav className="flex justify-between p-4  bg-slate-600 text-white max-sm:flex-col">
      <div className="text-lg font-bold max-sm:text-center max-sm:mb-5">Employee App</div>
      <div className="flex space-x-2 max-sm:flex-col max-sm:gap-5">
        <button onClick={() => setMode('add')} className="p-2 bg-blue-500 text-white rounded">
          Ajouter
        </button>
        <button onClick={onEdit} className="p-2 bg-yellow-500 text-white rounded">
          Éditer
        </button>
        <button onClick={handleDeleteSelected} className="p-2 bg-red-500 text-white rounded">
          Effacer
        </button>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={onSearchChange}
          className="p-2 border rounded"
        />
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  setMode: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  searchTerm: PropTypes.func,
  onSearchChange: PropTypes.func
}

export default Navbar;

