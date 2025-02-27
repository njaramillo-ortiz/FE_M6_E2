import { useEffect, useState } from "react";
import { getStoreData, RESERVES_STORE } from "../db";
import { ReservesList } from "../components/ReservesList";

export function Admin()
{
    const [reserves, setReserves] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    async function getData()
    {
        const data = await getStoreData(RESERVES_STORE);
        setReserves(data);
        console.log(data);
    }

    return(
        <>
            <h1>Reservas</h1>
            <ReservesList reserves = {reserves} />
        </>
    );
}