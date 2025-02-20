import { Menu, MenuItem } from "semantic-ui-react";
import { useAuth } from "../context/AuthContext";

export function Logout(){
    const auth = useAuth();

    return(
        <Menu
            inverted
            secondary
        >
            <MenuItem>
                {auth.user.name}
            </MenuItem>

            <MenuItem>
                <button onClick={() => auth.logout()}>Logout</button>
            </MenuItem>
        </Menu>
    );
}