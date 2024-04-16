import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import { Typography, AppBar, Toolbar, IconButton } from '@mui/material';

import _ from "lodash"

import useStore from '@/store'
import * as api from '@/libs/api'
import { useNavigate } from 'react-router';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function NewContribuyente() {
  // State to hold form field values
  const navigate = useNavigate()
  const user = useStore(s => s.user)
  const addContribuyente = useStore(s => s.addContribuyente)
  const [formData, setFormData] = useState({
    rif: `J${Date.now()}`,
    cedula: Date.now(),
    primer_nombre: 'douglas',
    primer_apellido: 'socorro',
    direccion: 'delicias',
    telefono: '0412785855',
    correo: 'juancarlossocorro571@gmail.com',
  });

  // Handler for form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear form fields after submission if needed
    setFormData({
      rif: '',
      cedula: '',
      primer_nombre: '',
      primer_apellido: '',
      direccion: '',
      telefono: '',
      correo: '',
    });

    const contacto = _.omit(formData, ["rif"])
    const contribuyente = {
        rif: formData.rif
    }

    const newContribuyente = await api.nweContribuyente({user, contribuyente, contacto})
    addContribuyente(newContribuyente)

    const urlParams = new URLSearchParams({newContribuyente: 'success'})
    navigate('/user?' + urlParams)
  };

  return (
    <Box sx={{ padding: 2, pt: 9}}>


        {/* the app bar */}
        <AppBar sx={{ position: 'fixed'}}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => navigate('/user')}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                {'Nuevo Contribuyente'}
              </Typography>
            </Toolbar>
          </AppBar>


        <form onSubmit={handleSubmit}>
            <TextField
                fullWidth
                label="RIF"
                name="rif"
                value={formData.rif}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />
            <TextField
                fullWidth
                label="Cédula"
                name="cedula"
                value={formData.cedula}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />
            <TextField
                fullWidth
                label="Primer Nombre"
                name="primer_nombre"
                value={formData.primer_nombre}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />
            <TextField
                fullWidth
                label="Primer Apellido"
                name="primer_apellido"
                value={formData.primer_apellido}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />
            <TextField
                fullWidth
                label="Dirección"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />
            <TextField
                fullWidth
                label="Teléfono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />
            <TextField
                fullWidth
                label="Correo"
                name="correo"
                value={formData.correo}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />
            <Button type="submit" variant="contained" color="primary">
                Guardar
            </Button>
        </form>
    </Box>
  );
}

export default NewContribuyente;