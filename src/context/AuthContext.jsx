import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const url = "http://localhost:3000";

const USER_STORAGE_KEY = "userData";

export function AuthContext({children}){
    const [user, setUser] = useState({});

    useEffect(() => {
        try
        {
            const storedUser = getStoredUserData();
            if (storedUser && storedUser != {}) {
                setUser(storedUser);
            }
        }
        catch(e)
        {
            console.log(e);
        }
    }, []);

    async function login(user, pass){
        await axios.get(`${url}/users?username=${user}`)
            .then(response => {
                console.log(response.data);
                if(response.data.length > 0 && response.data[0].password == pass)
                {
                    let userData = response.data[0];
                    delete userData.password;
                    setUser(userData);
                    storeUserData(JSON.stringify(userData));
                    return true;
                }
                else return false;
            });
    }

    function logout(){
        setUser({});
        storeUserData(null);
    }

    function storeUserData(data)
    {
        localStorage.setItem(USER_STORAGE_KEY, data);
    }

    function getStoredUserData()
    {
        return JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
    }

    const value = 
    {
        user,
        login,
        logout,
        isLogged: user.role != null && user.role != "",
        isDoctor: user.role == "doctor",
        isAdmin: user.role == "admin"
    }

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export const useAuth = () => useContext(UserContext);