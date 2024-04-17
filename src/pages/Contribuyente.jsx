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

import useStore from '@/store'

export default function Contribuyente() {
    const navigate = useNavigate()
    const { id } = useParams()
    const contribuyente = useStore( s => s.getContribuyenteById(id))
    const { primer_nombre, primer_apellido } = contribuyente.contacto
    
    console.log({id, contribuyente})

    return (
        <Box sx={{pb: 10}}>

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
                    {`${contribuyente.rif}: ${primer_nombre} ${primer_apellido}`}
                </Typography>
                </Toolbar>
            </AppBar>

            <Box sx={{ pt: 11, px: 2}}>
                
                <Stack spacing={2}>
                    <Typography 
                        variant='h6'>Información Personal</Typography>
                    <Divider/>
                    <TextField 
                        label={"RIF"} 
                        value={contribuyente.rif} 
                    />

                    <TextField 
                        label={"Cédula"} 
                        value={contribuyente.contacto.cedula} 
                    />

                    <TextField 
                        label={"Primer Nombre"} 
                        value={contribuyente.contacto.primer_nombre} 
                    />

                    <TextField 
                        label={"Primer Apellido"} 
                        value={contribuyente.contacto.primer_apellido} 
                    />

                    <TextField 
                        label={"Dirección"} 
                        value={contribuyente.contacto.direccion} 
                    />
                    <TextField 
                        label={"Teléfono"} 
                        value={contribuyente.contacto.telefono} 
                    />
                    <TextField 
                        label={"Correo"} 
                        value={contribuyente.contacto.correo} 
                    />


                    <Typography 
                        sx={{pt: 4, display: 'flex', justifyContent: 'space-between'}}
                        variant='h6'>
                            
                    Patente de Vehículos
                    <Button variant='outlined'
                        onClick={() => navigate(`patentes/new`)}>Agregar</Button>
                        
                    </Typography>
                    <Divider/>

                    { !contribuyente.patentes_de_vehiculo && (
                        <Typography 
                            sx={{px: 3}}
                            align='center'
                            variant='subtitle1'>Este contribuyente no tiene patentes de vehículo asignadas</Typography>
                    )}
                </Stack>
            </Box>

        </Box>
    )
}