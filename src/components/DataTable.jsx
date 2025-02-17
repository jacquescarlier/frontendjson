/*import PropTypes from 'prop-types';

const DataTable = ({ data, setData }) => {
  const handleCheckboxChange = (index) => {
    const newData = [...data];
    newData[index].selected = !newData[index].selected;
    setData(newData);
  };

  return (
    
    <table className="w-full bg-gray-700 border border-gray-600 text-center ">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b border-gray-600 w-1/36 ">Select</th>
          <th className="py-2 px-4 border-b border-gray-600 w-4/36">Nom</th>
          <th className="py-2 px-4 border-b border-gray-600 w-4/36">Prénom</th>
          <th className="py-2 px-4 border-b border-gray-600 w-6/36">Téléphone</th>
          <th className="py-2 px-4 border-b border-gray-600 w-4/36 hidden sm:table-cell">Status</th>
          <th className="py-2 px-4 border-b border-gray-600 w-4/36 hidden sm:table-cell">Durée Contrat</th>
          
          <th className="py-2 px-4 border-b border-gray-600 w-2/36 hidden sm:table-cell">CP</th>
          <th className="py-2 px-4 border-b border-gray-600 w-4/36 hidden sm:table-cell">Total CP</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-gray-600' : 'bg-gray-700'}>
            <td className="py-2 px-4 border-b border-gray-600 ">
              <input
                type="checkbox"
                checked={item.selected || false}
                onChange={() => handleCheckboxChange(index)}
              />
            </td>
            <td className="py-2 px-4 border-b border-gray-600 text-sm sm:text-base">{item.nom}</td>
            <td className="py-2 px-4 border-b border-gray-600 text-sm sm:text-base">{item.prenom}</td>
            <td className="py-2 px-4 border-b border-gray-600 text-sm sm:text-base">{item.telephone}</td>
            <td className="py-2 px-4 border-b border-gray-600 hidden sm:table-cell">{item.status}</td>
            <td className="py-2 px-4 border-b border-gray-600 hidden sm:table-cell">{item.dureeContrat}</td>
            <td className="py-2 px-4 border-b border-gray-600 hidden sm:table-cell">{item.cp}</td>
            <td className="py-2 px-4 border-b border-gray-600 hidden sm:table-cell">{item.totalVacancy}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

DataTable.propTypes = {
  setData: PropTypes.func,
  data: PropTypes.object
}

export default DataTable;

*/

import PropTypes from 'prop-types';

const DataTable = ({ data, setData }) => {
  const handleCheckboxChange = (index) => {
    const newData = data.map((item, i) =>
      i === index ? { ...item, selected: !item.selected } : item
    );
    setData(newData);
  };

  const tableHeaders = [
    { label: 'Select', className: 'w-1/36' },
    { label: 'Nom', className: 'w-4/36' },
    { label: 'Prénom', className: 'w-4/36' },
    { label: 'Téléphone', className: 'w-6/36' },
    { label: 'Status', className: 'w-4/36 hidden sm:table-cell' },
    { label: 'Durée Contrat', className: 'w-4/36 hidden sm:table-cell' },
    { label: 'CP', className: 'w-2/36 hidden sm:table-cell' },
    { label: 'Total CP', className: 'w-4/36 hidden sm:table-cell' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-gray-700 border border-gray-600 text-center">
        <thead>
          <tr>
            {tableHeaders.map(({ label, className }) => (
              <th key={label} className={`py-2 px-4 border-b border-gray-600 ${className}`}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-600' : 'bg-gray-700'}>
              <td className="py-2 px-4 border-b border-gray-600">
                <input
                  type="checkbox"
                  checked={item.selected || false}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              <td className="py-2 px-4 border-b border-gray-600 text-sm sm:text-base">{item.nom}</td>
              <td className="py-2 px-4 border-b border-gray-600 text-sm sm:text-base">{item.prenom}</td>
              <td className="py-2 px-4 border-b border-gray-600 text-sm sm:text-base">{item.telephone}</td>
              <td className="py-2 px-4 border-b border-gray-600 hidden sm:table-cell">{item.status}</td>
              <td className="py-2 px-4 border-b border-gray-600 hidden sm:table-cell">{item.dureeContrat}</td>
              <td className="py-2 px-4 border-b border-gray-600 hidden sm:table-cell">{item.cp}</td>
              <td className="py-2 px-4 border-b border-gray-600 hidden sm:table-cell">{item.totalVacancy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

DataTable.propTypes = {
  setData: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataTable;

