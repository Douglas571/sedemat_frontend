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

export async function getUserInformation(token) {
    try {
        // TODO: get user information
        let reponse = await axios.get()
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
            return c.attributes.contacto.data?.id
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

// a function to fetch tipos de vehiculo
// it makes a get request to http://localhost:1337/tipo-de-vehiculos
// it receive a response
// if it isn't sucessful, throw error
// otherwise, extract the list of tipos de vehiculos from response.data.data
// map each tipo de vehiculo like this:
    // new_tipo_de_vehiculo = {
    //  ...tipo_de_vehiculo.attributes,
    //  id: tipo_de_vehiculo.id
    //}

// return the array of tipo de vehiculos
// 

export async function getTiposDeVehiculo({user}) {
    try {
        const response = await axios.get('http://localhost:1337/api/tipo-de-vehiculos', {
            headers: {
                'Authorization': `bearer ${user.token}`
            }
        });
        const tiposDeVehiculo = response.data.data.map(tipo => ({
            ...tipo.attributes,
            id: tipo.id
        }));
        return tiposDeVehiculo;
    } catch (error) {
        console.log({error})
        throw new Error('Failed to fetch tipos de vehiculo');
    }
}

// export async function addPatente({user, contribuyenteId, patente, fechaExpedicion, tipoDeVehiculo}) {
//     // make a post api request to /api/patente-de-vehiculos, with an authentication token like this `bearer ${user.token}
//     // the body will have the following data:
//     /**
//      * {
//      *  
//      *  ...patente,
//      *  expedicion: fechaExpedicion,
//      *  tipo_de_vehiculo: tipoDeVehiculo,
//      *  contribuyente: {
//      *      connect: [ contribuyenteId ]
//      *  }
//      * }
//      */

//     // map response into a new variable called finalPatente {
//     //    id: response.data.data.id,
//     //    ...response.data.data.attributes
//     //}
//     // it returns the finalPatente object
// }

export async function addPatente({ user, contribuyenteId, patente, fechaExpedicion, tipoDeVehiculo }) {
    try {
        const response = await axios.post(
            '/api/patente-de-vehiculos',
            {
                ...patente,
                expedicion: fechaExpedicion,
                tipo_de_vehiculo: tipoDeVehiculo,
                contribuyente: {
                    connect: [contribuyenteId]
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
        );

        const finalPatente = {
            id: response.data.data.id,
            ...response.data.data.attributes
        };

        return finalPatente;
    } catch (error) {
        throw new Error('Failed to add patente');
    }
}

/**
 * 
 * api endpoint
 * permisos
 * authorization
 *  
 */