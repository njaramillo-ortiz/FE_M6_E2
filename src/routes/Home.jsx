import React, { useEffect, useRef, useState } from "react";
import { ServicesList } from "../components/ServicesList";
import { Image, Segment } from "semantic-ui-react";
import { RequestError } from "../components/RequestError";
import axios from "axios";

export function Home()
{
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const welcomeRef = useRef(null);
    const servicesRef = useRef(null);

    useEffect(() => {
        getServices()
    }, [])

    function showServices()
    {
        servicesRef.current.focus();
    }

    async function getServices()
    {
        setLoading(true);
        await axios.get('/src/data/services.json')
            .then(response => {
                setServices(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
            })
    }

    return(
        <div>
            <Segment>
                <div ref={welcomeRef}>
                    <h1>¡Bienvenidos al Hospital de las Estrellas!</h1>
                    <h4>
                        Nuestro principal objetivo es atender a nuestros pacientes de la mejor forma posible, con rostros conocidos para todos. 
                    </h4>
                    <h4>
                        Creemos que la fama es garantía de calidad, y ello buscamos proveer esta experiencia a los pacientes a un precio prohibitivo.
                    </h4>
                </div>
            </Segment>

            <Segment loading={loading}>
                <div ref={servicesRef} tabIndex={-1}>
                    <h1>Nuestros Servicios</h1>
                    <ServicesList services={services} />
                </div>
            </Segment>

            {
                error && <RequestError error={error} callback={getServices}/>
            }
        </div>
    );
}