import  { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DataTable from './components/DataTable';
import Form from './components/Form';


const App = () => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [mode, setMode] = useState('view'); // 'view', 'add', 'edit'
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/data');
      const result = await response.json();
      setData(result.map(item => ({ ...item, selected: false })));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addData = async (newData) => {
    try {
      const response = await fetch('http://localhost:5000/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });
      if (response.ok) {
        fetchData();
        setMode('view');
        setSelectedData(null);
      }
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/data/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const updateData = async (updatedData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/data/${updatedData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });
      if (response.ok) {
        fetchData();
        setMode('view');
        setSelectedData(null);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleEdit = (item) => {
    setSelectedData(item);
    setMode('edit');
  };

  const handleDeleteSelected = () => {
    const selectedItems = data.filter(item => item.selected);
    selectedItems.forEach(item => deleteData(item.id));
  };


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter(item =>
    item.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dark min-h-screen flex flex-col">
      <div className="m-0 p-4 bg-gray-900 text-white flex-grow">
        <Navbar
          setMode={setMode}
          onEdit={() => handleEdit(data.find(item => item.selected))}
          onDelete={handleDeleteSelected}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
        {mode === 'view' ? (
           <DataTable data={searchTerm ? filteredData : data} onEdit={handleEdit} setData={setData} />
          ) : (
          <Form
            mode={mode}
            selectedData={selectedData}
            onSubmit={mode === 'add' ? addData : updateData}
            onCancel={() => {
              setMode('view');
              setSelectedData(null);
            }}
          />
        )}
      </div>
      <footer className="bg-gray-900 text-white text-center py-4">
        © 2025 JCR. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
