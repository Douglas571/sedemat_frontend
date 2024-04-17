import { useEffect, useState } from "react"

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
    InputLabel,
    Select,
    MenuItem

} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    useNavigate,
    useLocation,
    useParams
  } from "react-router-dom"

import currency from 'currency.js'

import * as api from '@/libs/api'
import useStore from '@/store'

export default function NewPatenteDeVehiculos() {
    const navigate = useNavigate()
    const { ContribuyenteId } = useParams()
    const user = useStore( s => s.user)
    const [tiposDeVehiculos, setTiposDeVehiculos] = useState([])
    const highestValueCurrency = useStore(s => s.highestValueCurrency)

    const [selectedTipo, setSelectedTipo] = useState('');

    let [formData, setFormData] = useState({
        // fechaExpedicion: '',
        // fechaVencimiento: '',
        montoPagado: 0,
        modelo: 'S',
        placa: '3J3JDL3',
        marca: 'Ficticia',
        year: 2020,

        color: 'Rojo',
        uso: 'Personal',

        concepto: 'Patente de Vehículos',
        realizado_por: '',
        verificado_por: '',  
    });
    // TODO: Replace newPatente with form data
    let newPatente = formData
    console.log({highestValueCurrency})

    async function getTiposDeVehiculos() {
        const tipos = await api.getTiposDeVehiculo({user})
        console.log({tipos})
        setTiposDeVehiculos(tipos)
        
    }
    useEffect(() => {
        getTiposDeVehiculos()
    }, [])

    const handleSelectChange = (event) => {
        setSelectedTipo(event.target.value);

        const tipo = event.target.value
        const amountToPay = currency(tiposDeVehiculos.find(t => t.tipo === tipo).tcmmv_bcv)
                                .multiply(highestValueCurrency.price)

        console.log({amountToPay})
        
        setFormData({
            ...formData,
            montoPagado: amountToPay.value
        })
    };

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
                    <InputLabel id="tipos-de-vehiculo-label">Tipo de Vehículo</InputLabel>
                    <Select
                        labelId="tipos-de-vehiculo-label"
                        id="tipos-de-vehiculo-select"
                        defaultValue={tiposDeVehiculos[0]?.tipo}
                        value={selectedTipo}
                        onChange={handleSelectChange}
                    >
                        {tiposDeVehiculos.map(tipo => (
                            <MenuItem key={tipo.id} value={tipo.tipo}>
                                {tipo.tipo} - {tipo.tcmmv_bcv}{highestValueCurrency.sign}
                            </MenuItem>
                        ))}
                    </Select>
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
                    <TextField
                        label="Marca"
                        name="marca"
                        value={formData.marca}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Año"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Color"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Uso"
                        name="uso"
                        value={formData.uso}
                        onChange={handleChange}
                    />
                    <TextField
                        multiline
                        label="Concepto"
                        name="concepto"
                        value={formData.concepto}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Realizado por"
                        name="realizado_por"
                        value={formData.realizado_por}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Verificado por"
                        name="verificado_por"
                        value={formData.verificado_por}
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