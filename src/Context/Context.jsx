import {createContext, useState} from 'react'

const context = createContext();

export default function Context(props) {
    const [authtoken, setAuthtoken] = useState('');
    
    return (
    <context.Provider value = {[authtoken, setAuthtoken]}>
        {props.children}
    </context.Provider>
  )
}

export {context};