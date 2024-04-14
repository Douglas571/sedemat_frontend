import {useState} from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'

import Stack from '@mui/material/Stack';

import { useNavigate } from "react-router-dom"

import { useUser, useUserDispatch } from '@/store/useUser'
import * as api from '@/libs/api'

import useStore from '@/store'

export default function Login() {
  //const user = useUser()
  const navigate = useNavigate();
  const userDispatch = useUserDispatch()

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const user = useStore((state) => state.user)
  const setUser = useStore((state) => state.setUser)

  const [errorMessage, setErrorMessage] = useState(null)

  const [isWrongUsername, setIsWrongUsername] = useState(false)
  const [isWrongPassword, setIsWrongPassword] = useState(false)

  function handleTyping(evt) {
    const value = evt.target.value
    const name = evt.target.name

    setCredentials({...credentials, [name]: value})
  }

  async function handleSignIn(evt) {
    // console.log('loging')
    // console.log({credentials})

    let token
    try {
      token = await api.signIn(credentials)
      setUser({ token })
      navigate("/user")
    } catch (error) {
      setErrorMessage("Cedula o contraseña incorrecta")

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <>
      <Box bgcolor={'#8ec4fa'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        height={'100vh'}>
        <Paper sx={{
          p: 6
        }}>
          <Stack spacing={2}>
            <Typography variant='h3' textAlign={'center'}>SEDEMAT</Typography>
            <Typography variant='h6' textAlign={'center'}>Zamora</Typography>
            
            { isWrongUsername 
              ? <TextField error 
                  helperText={'Este usuario no existe'} 
                  id="username" 
                  name="username"
                  label="cédula" 
                  variant="filled" 
                  value={credentials.username}
                  onChange={handleTyping}
                  data-testid={"username-input"}
                />
              : <TextField 
                  id="username" 
                  name="username"

                  label="cédula" 
                  variant="filled" 
                  value={credentials.username}
                  onChange={handleTyping}
                  data-testid={"username-input"}
                />
            }

            { isWrongPassword 
              ? <TextField error 
                  helperText={'Contraseña Inválida'} 
                  id="password" 
                  name="password"

                  label="contraseña" 
                  variant="filled" 
                  value={credentials.password}
                  onChange={handleTyping}
                  type='password'
                  data-testid={"password-input"}

                />
              : <TextField 
                id="password" 
                name="password"

                label="contraseña" 
                variant="filled" 
                value={credentials.password} 
                onChange={handleTyping}
                type='password'
                data-testid={"password-input"}

              />
            }

            { errorMessage && (<Alert severity="error" data-testid="login-error-message">{errorMessage}</Alert>)}

            <Button variant="contained"
              onClick={handleSignIn}
              data-testid={"login-button"}
              >Iniciar Sesión</Button>
          </Stack>
        </Paper>
      </Box>
    </>
  )
}
