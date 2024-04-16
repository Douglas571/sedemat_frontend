import { useState, useEffect, useRef } from 'react';
import {
    Drawer,
    AppBar,
    Toolbar,
    List,
    ListItem,
    ListItemIcon,
    ListItemButton,
    ListItemText,
    Divider,
    IconButton,
    Typography,
    Avatar,
    Stack,
    Button,
    Input,
    TextField,
    InputAdornment,
    Box,
    Fab,
    Alert
  } from '@mui/material';

  import {
    useNavigate,
    useLocation,
    useSearchParams,
  } from "react-router-dom"

import { DataGrid } from '@mui/x-data-grid';
import { 
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon, 
  Search as SearchIcon,
  Add as AddIcon,
  Check as CheckIcon,
} from '@mui/icons-material';

// personal libraries 
import useStore from '@/store'
import * as api from '@/libs/api'

export default function AdminPanel() {
    const loading = useRef(null)
    const user = useStore( s => s.user )
    const contribuyentes = useStore( s => s.contribuyentes )
    const setContribuyentes = useStore( s => s.setContribuyentes )

    async function loadContribuyentes() {
      const contribuyentes = await api.getContribuyentes({user, populate: "*"})
      setContribuyentes(contribuyentes)
    }

    useEffect(() => {
      if(!loading.current) {
        console.log('just once (1)')
        loadContribuyentes()
        loading.current = true
      }
    }, [])

    return (
        <>
          <TopLayout 
            title={"Contribuyentes"}
            user={{name: 'Douglas Socorro', rol: "Fiscal"}}
            list={[
              { 
                text: "Contribuyentes",
                link: "/contribuyentes",
                selected: false,
              },
              { 
                text: "Registro de Contribuyentes",
                link: "/registro",
                selected: false,
              },
              { 
                text: "Logout",
                link: "/logout",
                selected: false,
              }
            ]}
            data={{ contribuyentes }}
             />            
        </>
    )
}

const TopLayout = ({ title, user, list, data }) => {
  const {contribuyentes} = data
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const [showNewContribuyenteMessage, setShowNewContribuyenteMessage] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams();
  // add the message components

  // use ref

  useEffect(() => {
    if (queryParams.get('newContribuyente') === 'success') {
      console.log('contribuyente added successfuly')
      setShowNewContribuyenteMessage(true)
      setTimeout(() => {
        setShowNewContribuyenteMessage(false)
        setSearchParams(searchParams.delete('newContribuyente'))
      }, 3000)
    }
  }, [location])

  

  const [showDrawer, setShowDrawer] = useState(false)

  return (
    <>
      <Box sx={{ display: 'flex'}} data-testid="user-home">
        
        <Box>
          <AppBar sx={{ position: 'fixed'}}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setShowDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                {title}
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Box sx={{ p: 5, pt: 13}}>
          {/* here it goes your content */}
          <Stack>
            <TextField type='text'variant='outlined'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}/>
          </Stack>
          <ListComponent data={contribuyentes}></ListComponent>


          { showNewContribuyenteMessage && 
            (<Alert 
              icon={<CheckIcon fontSize="inherit" />} 
              severity="success"
              sx={{ position: 'fixed', bottom: '10px'}}>
                Here is a gentle confirmation that your action was successful.
            </Alert>)
          }

          



        </Box>



        <Drawer
          open={showDrawer}
          onClose={() => setShowDrawer(false)}
        >
          <Stack sx={{ p: 3, pt: 5}}>
            <Typography variant="body1">{user.name}</Typography>
            <Typography variant="caption">{user.rol}</Typography>
          </Stack>
          <Divider />
          <List>
            {list.map((item, index) => (
              <ListItemButton onClick={() => {}}>
                <ListItem key={item.text} selected={item.selected} sx={{}}>
                  <ListItemText primary={item.text} />
                </ListItem>
              </ListItemButton>
            ))}
          </List>
        </Drawer>



        <Fab 
          color="primary" 
          aria-label="add" 
          data-testid="add-new-contribuyente"
          sx={{ position: 'absolute', right: '20px', bottom: '20px'}}
          onClick={() => navigate('contribuyentes/new')}
        >
          <AddIcon />
        </Fab>
      </Box>
    </>
  )
}

const ListComponent = ({ data }) => {
  const navigate = useNavigate()

  console.log({data})
  return (
    <List dense={false}>
      {data.map((item) => (
        <ListItem button key={item.rif} onClick={() => {
          console.log({item})
          console.log(item.id)
          navigate(`contribuyentes/${item.id}`)
        }}>
          <ListItemText
            key={item.rif}
            primary={item.razon_social}
            secondary={`RIF: ${item.rif} - Nombre ${item.contacto.primer_nombre} - Fiscal: ${item.fiscal}`}
          />
          {/* <ListItemSecondaryAction></ListItemSecondaryAction> */}
        </ListItem>
      ))}
    </List>
  );
};