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

        const contribuyentes = response.data.data.map( c => {
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

// I need a function that fetch data from http://localhost:1337/api/contribuyentes
// it returns a response.data.contribuyentes
// return the contribuyentes list
