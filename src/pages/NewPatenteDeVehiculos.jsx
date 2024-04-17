import { useState } from "React"

import { 
    Box, 
    AppBar, 
    Toolbar, 
    IconButton, 
    Typography,
    TextField,
    Stack,
    Divider,
    Button,

} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    useNavigate,
    useLocation,
    useParams
  } from "react-router-dom"

export default function NewPatenteDeVehiculos() {
    const navigate = useNavigate()
    const { ContribuyenteId } = useParams()

    const [formData, setFormData] = useState({
        fechaExpedicion: '',
        fechaVencimiento: '',
        montoPagado: '',
        modelo: '',
        placa: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const patente = await api.addPatente({
            contribuyenteId,
            patente: formData
        })

        debugger
    };


    return (
        <Box>
            {/* the app bar */}
            <AppBar sx={{ position: 'fixed'}}>
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => navigate(-1)}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    {'Nueva Patente de Vehículos'}
                </Typography>
                </Toolbar>
            </AppBar>


            <Box sx={{ pt: 11, px: 2}}>
                <Stack spacing={3} pb={2}>
                    <TextField
                        label="Fecha de Expedición"
                        name="fechaExpedicion"
                        value={formData.fechaExpedicion}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Fecha de Vencimiento"
                        name="fechaVencimiento"
                        value={formData.fechaVencimiento}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Monto Pagado"
                        name="montoPagado"
                        value={formData.montoPagado}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Modelo"
                        name="modelo"
                        value={formData.modelo}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Placa"
                        name="placa"
                        value={formData.placa}
                        onChange={handleChange}
                    />
                </Stack>
                <Button type="submit" variant="contained" color="primary">
                    Guardar
                </Button>
            </Box>
        </Box>
    )
}