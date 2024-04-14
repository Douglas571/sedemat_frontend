import { createContext, useReducer, useContext } from 'react';

function userReducer(state, action) {
    switch(action.type) {
        case "sign-up": {
            console.log('user is trying to sign up')
            return state
        }

        case "sign-in": {
            console.log('user is trying to sign in')
            console.log({theTokenIs: action})
            return state
        }

        case "logout": {
            return state
        }

        default: {
            throw Error('Unknown action: ' + action.type)
        }
    }
}


const UserContext = createContext(null)
const UserDispatchContext = createContext(null)

export function useUser() {
    return useContext(UserContext)
}

export function useUserDispatch() {
    return useContext(UserDispatchContext)
}

export function UserProvider({children}) {

    const [ user, dispatch ] = useReducer(userReducer, null )
    return (
        <UserContext.Provider value={user}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    )
}