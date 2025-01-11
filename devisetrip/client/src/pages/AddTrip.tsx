import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { FixedSizeList as List } from 'react-window';
import { Button, Typography, Paper, Grid, TextField } from '@mui/material';
import cities from '../assets/sorted_cities.json';
import { useNavigate } from 'react-router-dom';

const AddTrip: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    budget_vac: '',
  });
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + 8);

    setFormData((prevData) => ({
      ...prevData,
      startDate: formatDate(today),
      endDate: formatDate(endDate),
    }));
  }, []);

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const handleChange = (name: string, value: any) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Token non disponible. Veuillez vous reconnecter.');
        return;
      }

      const response = await axios.post('/api/users/addTrip', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage(response.data.message);
      setFormData({ title: '', destination: '', startDate: '', endDate: '', budget: '', budget_vac: '' });
      navigate('/trips');
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Une erreur est survenue.');
    }
  };

  const cityOptions = cities.map((city) => ({ value: city, label: city }));

  // Composant de virtualisation pour react-select
  const CustomMenuList = (props: any) => {
    const { options, children, getValue } = props;
    const height = 300;
    const itemHeight = 35;
    const selectedIndex = options.findIndex((option: any) => option.value === getValue()[0]?.value);
    const initialScrollOffset = selectedIndex >= 0 ? selectedIndex * itemHeight : 0;

    return (
      <List
        height={height}
        itemCount={children.length}
        itemSize={itemHeight}
        initialScrollOffset={initialScrollOffset}
        width="100%"
      >
        {({ index, style }) => (
          <div style={style}>
            {children[index]}
          </div>
        )}
      </List>
    );
  };

  return (
    <Grid container justifyContent="center" alignItems="center" className="min-h-screen bg-gradient-to-r from-indigo-500 to-blue-500">
      <Paper elevation={8} className="p-8 rounded-xl shadow-2xl w-full max-w-md">
        <Typography variant="h4" component="h1" className="mb-6 font-bold text-center text-gray-800">
          Ajouter un nouveau voyage
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="Titre"
            name="title"
            value={formData.title}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            fullWidth
            required
            variant="outlined"
            className="bg-white rounded-lg p-2 shadow-md"
          />
      <Select
  options={cityOptions}
  onChange={(selectedOption) => handleChange('destination', selectedOption?.value)}
  placeholder="Choisissez une destination"
  isSearchable
  components={{ MenuList: CustomMenuList }}
  className="basic-single"
  classNamePrefix="select"
  menuPortalTarget={document.body} // Rend le menu dans un portail global
  styles={{
    menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Assure que le menu est au premier plan
    control: (base) => ({
      ...base,
      backgroundColor: 'white', // Fond blanc pour le champ
      color: 'black', // Texte noir
      borderColor: '#ccc',
      '&:hover': {
        borderColor: '#aaa', // Couleur de bordure au survol
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: 'black', // Texte noir pour la valeur sélectionnée
    }),
    placeholder: (base) => ({
      ...base,
      color: '#666', // Texte gris pour le placeholder
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'white', // Fond blanc pour le menu déroulant
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? '#f0f0f0' : 'white', // Couleur de fond pour l'option survolée
      color: 'black', // Texte noir pour les options
    }),
  }}
/>

          <TextField
            label="Date de Départ"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            fullWidth
            required
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            className="bg-white rounded-lg p-2 shadow-md"
          />
          <TextField
            label="Date de Retour"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            fullWidth
            required
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            className="bg-white rounded-lg p-2 shadow-md"
          />
          <TextField
            label="Budget Hotel + Transports"
            name="budget"
            type="text"
            value={formData.budget}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            fullWidth
            required
            variant="outlined"
            className="bg-white rounded-lg p-2 shadow-md"
          />
          <TextField
            label="Budget vacances (hors Transport & Hébergement)"
            name="budget_vac"
            type="text"
            value={formData.budget_vac}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            fullWidth
            required
            variant="outlined"
            className="bg-white rounded-lg p-2 shadow-md"
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            className="mt-6 py-2 rounded-lg text-white hover:bg-indigo-600 transition-all"
          >
            Ajouter
          </Button>
        </form>
        {message && (
          <Typography variant="body2" color="error" align="center" className="mt-4">
            {message}
          </Typography>
        )}
      </Paper>
    </Grid>
  );
};

export default AddTrip;
