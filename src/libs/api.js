import axios from 'axios'


// Function to sign in
export async function signIn({username, password}) {
    try {
        console.log({username, password})
        const response = await axios.post('http://localhost:1337/api/auth/local', {
            identifier: username,
            password: password
        });
        const token = response.data.jwt; 
        console.log({token})
        return token;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

// unused function! Function to sign up
export async function signUp(username, password, rol) {
    try {
        const response = await axios.post('/signup', {
            username: username,
            password: password,
            rol: rol
        });
        const token = response.data.jwt; // Assuming the token is returned in the response
        return token;
    } catch (error) {
        // Handle error
        return error.response.data.message; // Assuming the error message is provided in the response
    }
}

export async function getContribuyentes({ user, populate }) {
    try {
        const response = await axios.get(`http://localhost:1337/api/contribuyentes?populate=*`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        console.log({ response });

        const contribuyentes = response.data.data.filter(c => {
            console.log({c})
            return c.attributes.contacto.data
        }).map( c => {
            if(!c.id) return null 

            const { id: contactoId, attributes: contactoAttributes } = c.attributes.contacto.data;

            return {
                id: c.id,
                ...c.attributes,
                contacto: {
                    id: contactoId,
                    ...contactoAttributes
                }
            } 
        }).filter(Boolean)
        
        console.log({contribuyentes})
        return contribuyentes;
    } catch (error) {
        console.error('Error fetching data:', error);
        return []; // Return an empty array in case of error
    }
}

export async function nweContribuyente({user, contribuyente, contacto}) {

    // make an api call with post method to http://localhost:1337/api/contactos
        // make the try catch
        // make the fetch 
    try {
        debugger
        let response = await axios.post("http://localhost:1337/api/contactos", {
            data: contacto
        },
        {
            headers: {
                'Authorization': `bearer ${user.token}`
            }
        })
        console.log({response})


        const contactoData = {
            id: response.data.data.id,
            ...response.data.data.attributes
        }

        console.log({contactoData})
        // sending contribuyente
        response = await axios.post("http://localhost:1337/api/contribuyentes", {
            data: {
                ...contribuyente,
                contacto: {
                    connect: [contactoData.id]
                }
            }
        },
        {
            headers: {
                'Authorization': `bearer ${user.token}`
            }
        })

        console.log({response})

        const contribuyenteData = {
            id: response.data.data.id,
            ...response.data.data.attributes,
            contacto: contactoData
        }

        return contribuyenteData
        
    } catch(error) {
        console.log({error})
        return {}
    }
    // get the new contacto id
    // 
}

// I need a function that fetch data from http://localhost:1337/api/contribuyentes
// it returns a response.data.contribuyentes
// return the contribuyentes list

/**
 
hello chatgpt, I need you to separate this data structure into 2 entities: contacto and contribuyente

{
    rif: '',
    cedula: '',
    primerNombre: '',
    segundoNombre: '',
    direccion: '',
    telefono: '',
    correo: '',
  }

  contribuyentes has everything less rif
  leave the contacto with the rest

  now, make an api call to http://localhost:1337/api/contribuyentes with post method.




 */