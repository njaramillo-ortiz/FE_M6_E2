import { useContext } from "react";
import { NavLink } from "react-router";
import { Menu, MenuItem, Segment } from "semantic-ui-react";
import { useAuth } from "../context/AuthContext";
import { Login } from "./Login";
import { Logout } from "./Logout";

export function Navbar(props)
{
    const auth = useAuth();

    return(
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%"
            }}
        >
            <Segment
                inverted
                attached="top"
            >
                <Menu
                    inverted
                    secondary
                >
                    <MenuItem>
                        <NavLink
                            to='/'
                        >
                            Hospital de las Estrellas
                        </NavLink>
                    </MenuItem>

                    <MenuItem>
                        <NavLink
                            to='/doctors'
                        >
                            Doctores
                        </NavLink>
                    </MenuItem>

                    {
                        auth.isDoctor && 
                        <MenuItem>
                            <NavLink
                                to='/agenda'
                            >
                                Agenda Pacientes
                            </NavLink>
                        </MenuItem>
                    }
                    
                    {
                        (auth.isLogged && !auth.isDoctor) && 
                        <MenuItem>
                            <NavLink
                                to='/reserve'
                            >
                                Reservar
                            </NavLink>
                        </MenuItem>
                    }

                    {
                        auth.isAdmin &&
                        <MenuItem>
                            <NavLink
                                to='/admin'
                            >
                                Administración Sistema
                            </NavLink>
                        </MenuItem>
                    }

                    <MenuItem
                        position="right"
                    >
                        {auth.isLogged ? <Logout /> : <Login/>}
                    </MenuItem>
                </Menu>
            </Segment>
        </div>
    );
}