import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Menu, MenuItem } from "semantic-ui-react";

export function Login(){
    const auth = useAuth();
    const [user, setUser] = useState();
    const [pass, setPass] = useState();

    async function login()
    {
        const success = await auth.login(user, pass);
        console.log(success);
    }

    return(
        <Menu
            inverted
            secondary
        >
            <MenuItem>
                <input placeholder="Nombre de usuario" onChange={e => setUser(e.target.value)} />
            </MenuItem>
            <MenuItem>
                <input placeholder="Contraseña" type="password" onChange={e => setPass(e.target.value)} />
            </MenuItem>
            
            <MenuItem>
                <button onClick={() => login()}>Iniciar Sesión</button>
            </MenuItem>
        
        </Menu>
    );
}