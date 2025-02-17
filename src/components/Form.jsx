
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Form = ({ mode, selectedData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '', // Ensure ID is included
    nom: '',
    prenom: '',
    adresse: '',
    telephone: '',
    status: '__', // Default value
    dureeContrat: '',
    horaire: '',
    heureTravaille: '',
    cp: '',
    vacancy: Array(12).fill(0),
    selected: false // Ensure 'selected' is included
  });

  useEffect(() => {
    if (selectedData) {
      setFormData(selectedData);
    }
  }, [selectedData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleVacancyChange = (index, value) => {
    const newVacancy = [...formData.vacancy];
    newVacancy[index] = parseFloat(value) || 0;
    setFormData({
      ...formData,
      vacancy: newVacancy
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalVacancy = formData.vacancy.reduce((acc, val) => acc + val, 0);
    onSubmit({ ...formData, totalVacancy });
    setFormData({
      id: '', // Reset ID
      nom: '',
      prenom: '',
      adresse: '',
      telephone: '',
      status: '__',
      dureeContrat: '',
      horaire: '',
      heureTravaille: '',
      cp: '',
      vacancy: Array(12).fill(0),
      selected: false // Reset 'selected'
    });
  };

  const totalVacancy = formData.vacancy.reduce((acc, val) => acc + val, 0);

  return (
    <form onSubmit={handleSubmit} className="w-full text-xs p-4 pt-0 bg-slate-700">
      <div className="grid grid-flow-col grid-rows-8 gap-1 max-sm:grid-rows-16">
        <label htmlFor="nom" className='m-0 p-0 mr-2 mt-3'>Nom</label>
        <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} className="p-2 border rounded m-0 mr-4  " />   
        <label htmlFor="prenom" className='mr-2 mt-3'>Prénom</label>
        <input type="text" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} className="p-2 border rounded mr-4" />
      
        <label htmlFor="adresse" className='mr-2 mt-3'>Adresse</label>
        <input type="text" name="adresse" placeholder="Adresse" value={formData.adresse} onChange={handleChange} className="p-2 border rounded mr-4" />
        <label htmlFor="telephone" className='mr-2 mt-3'>Téléphone</label>
        <input type="text" name="telephone" placeholder="Téléphone" value={formData.telephone} onChange={handleChange} className="p-2 border rounded mr-4" />
      
        <label htmlFor="status" className='mr-2 mt-3'>Status</label>
        <select name="status" value={formData.status} onChange={handleChange} className="p-2 border rounded mr-4 ">
          <option value="__">__</option>
          <option value="Contractuel">Contractuel</option>
          <option value="Vacataire">Vacataire</option>
        </select>
        <label htmlFor="dureeContrat" className='mr-2 mt-3'>Heures du contrat</label>
        <input type="text" name="dureeContrat" placeholder="Durée de contrat" value={formData.dureeContrat} onChange={handleChange} className="p-2 border rounded mr-4" />
      
        <label htmlFor="horaire" className='mr-2 mt-3'>Horaire</label>
        <input type="text" name="horaire" placeholder="Horaire" value={formData.horaire} onChange={handleChange} className="p-2 border rounded mr-4" />
        <label htmlFor="heureTravaille" className='mr-2 mt-3'>Heures travaillées</label>
        <input type="text" name="heureTravaille" placeholder="Heure travaillé" value={formData.heureTravaille} onChange={handleChange} className="p-2 border rounded mr-4" />
      </div>
      
      <div className="mb-2 mt-2 flex items-center ">
        <label htmlFor="CP" className='mr-2'>CP annuel</label>
        <input type="text" name="cp" placeholder="CP" value={formData.cp} onChange={handleChange} className="p-2 border rounded" />
      </div>
      <div className="grid grid-cols-6 gap-4 max-sm:grid-cols-3">
        {formData.vacancy.map((value, index) => (
          <div key={index} className="flex items-center">
            <label className="mr-2">{index + 1}</label>
            <input
              type="number"
              step="0.5"
              value={value}
              onChange={(e) => handleVacancyChange(index, e.target.value)}
              className="p-1 border rounded w-16"
            />
          </div>
        ))}
      </div>
      
      <div className="mt-2 py-2 flex justify-center border-red-600 border-2">
        <div className="flex items-center">
          <label className="mr-2 text-red-600 font-black">Total CP:</label>
          <input
            type="number"
            step="0.5"
            value={totalVacancy}
            readOnly
            className="p-1 border rounded w-16"
          />
        </div>
      </div>
      <div className="mt-4">
        <button type="submit" className="mr-2 p-2 bg-blue-500 text-white rounded">
          {mode === 'add' ? 'Add' : 'Update'}
        </button>
        <button type="button" onClick={onCancel} className="p-2 bg-gray-500 text-white rounded">
          Cancel
        </button>
      </div>
    </form>
  );
};

Form.propTypes = {
  mode: PropTypes.string,
  selectedData: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
};

export default Form;

/*
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Form = ({ mode, selectedData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    nom: '',
    prenom: '',
    adresse: '',
    telephone: '',
    status: '__',
    dureeContrat: '',
    horaire: '',
    heureTravaille: '',
    cp: '',
    vacancy: Array(12).fill(0),
    selected: false
  });

  useEffect(() => {
    if (selectedData) {
      setFormData(selectedData);
    }
  }, [selectedData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleVacancyChange = (index, value) => {
    const newVacancy = [...formData.vacancy];
    newVacancy[index] = parseFloat(value) || 0;
    setFormData((prevData) => ({
      ...prevData,
      vacancy: newVacancy
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalVacancy = formData.vacancy.reduce((acc, val) => acc + val, 0);
    onSubmit({ ...formData, totalVacancy });
    setFormData({
      id: '',
      nom: '',
      prenom: '',
      adresse: '',
      telephone: '',
      status: '__',
      dureeContrat: '',
      horaire: '',
      heureTravaille: '',
      cp: '',
      vacancy: Array(12).fill(0),
      selected: false
    });
  };

  const totalVacancy = formData.vacancy.reduce((acc, val) => acc + val, 0);

  const inputClassName = "p-2 border rounded mr-4";
  const labelClassName = "mr-2 mt-3";

  return (
    <form onSubmit={handleSubmit} className="p-4 pt-0 bg-slate-700">
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        {[
          { label: 'Nom', name: 'nom', type: 'text', placeholder: 'Nom' },
          { label: 'Prénom', name: 'prenom', type: 'text', placeholder: 'Prénom' },
          { label: 'Adresse', name: 'adresse', type: 'text', placeholder: 'Adresse' },
          { label: 'Téléphone', name: 'telephone', type: 'text', placeholder: 'Téléphone' },
          {
            label: 'Status',
            name: 'status',
            type: 'select',
            options: ['__', 'Contractuel', 'Vacataire']
          },
          { label: 'Heures du contrat', name: 'dureeContrat', type: 'text', placeholder: 'Durée de contrat' },
          { label: 'Horaire', name: 'horaire', type: 'text', placeholder: 'Horaire' },
          { label: 'Heures travaillées', name: 'heureTravaille', type: 'text', placeholder: 'Heure travaillé' }
        ].map(({ label, name, type, placeholder, options }) => (
          <div key={name} className="flex items-center">
            <label htmlFor={name} className={labelClassName}>{label}</label>
            {type === 'select' ? (
              <select name={name} value={formData[name]} onChange={handleChange} className={inputClassName}>
                {options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input type={type} name={name} placeholder={placeholder} value={formData[name]} onChange={handleChange} className={inputClassName} />
            )}
          </div>
        ))}
      </div>

      <div className="mb-2 mt-2 flex items-center">
        <label htmlFor="CP" className="mr-2">CP annuel</label>
        <input type="text" name="cp" placeholder="CP" value={formData.cp} onChange={handleChange} className="p-2 border rounded" />
      </div>

      <div className="grid grid-cols-6 gap-4 max-sm:grid-cols-3">
        {formData.vacancy.map((value, index) => (
          <div key={index} className="flex items-center">
            <label className="mr-2">{index + 1}</label>
            <input
              type="number"
              step="0.5"
              value={value}
              onChange={(e) => handleVacancyChange(index, e.target.value)}
              className="p-1 border rounded w-16"
            />
          </div>
        ))}
      </div>

      <div className="mt-2 py-2 flex justify-center border-red-600 border-2">
        <div className="flex items-center">
          <label className="mr-2 text-red-600 font-black">Total CP:</label>
          <input
            type="number"
            step="0.5"
            value={totalVacancy}
            readOnly
            className="p-1 border rounded w-16"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <button type="submit" className="mr-2 p-2 bg-blue-500 text-white rounded">
          {mode === 'add' ? 'Add' : 'Update'}
        </button>
        <button type="button" onClick={onCancel} className="p-2 bg-gray-500 text-white rounded">
          Cancel
        </button>
      </div>
    </form>
  );
};

Form.propTypes = {
  mode: PropTypes.string,
  selectedData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default Form;
*/