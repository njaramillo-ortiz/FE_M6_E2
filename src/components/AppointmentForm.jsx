import { useEffect, useRef, useState } from "react";
import { Form, FormButton, Segment } from "semantic-ui-react";
import PortalModal from "./PortalModal";
import { TextInput } from "./TextInput";
import { DropdownInput } from "./DropdownInput";
import { RequestError } from "./RequestError";
import axios from "axios";
import { addData, initDB, RESERVES_STORE } from "../db";
import { useAuth } from "../context/AuthContext";
import { TextDisplay } from "./TextDisplay";

export function AppointmentForm(props) {
    const auth = useAuth();
    const [dbReady, setDbReady] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const [error, setError] = useState(null);

    const [doctor, setDoctor] = useState("");
    const [doctors, setDoctors] = useState([]);

    const [area, setArea] = useState("");
    const [areas, setAreas] = useState([]);

    const [loading, setLoading] = useState(false);

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);

    const [modalOpen, setModalOpen] = useState(false);

    const emailValidation = /^\S+@\S+\.\S+$/;
    const phoneValidation = /^(\+56)?9[0-9]{8}$/;

    useEffect(() => {
        if(auth.isLogged)
        {
            setFirstName(auth.user.name);
            setLastName(auth.user.lastName);
            setPhone(auth.user.phone);
            setEmail(auth.user.email);
        }

        /* firstNameRef.current.focus(); */
        getServices();
        handleInitDB();
    }, [])

    const handleInitDB = async () => {
        const status = await initDB();
        setDbReady(status);
      };

    async function getDoctors(area) {
        setError(null);
        setLoading(true);
        setDoctor("");
        await axios.get('/src/data/doctors.json')
            .then(response => {
                if (area == null || area == "") {
                    setDoctors(response.data)
                }
                else {
                    let filteredData = [];
                    response.data.forEach(d => {
                        if (d.area === area) {
                            filteredData.push(d);
                        }
                    })
                    setDoctors(filteredData)
                }
                setLoading(false);
            })
            .catch(err => {
                setError(err);
            })
    }

    async function getServices() {
        setError(null);
        setLoading(true);
        await axios.get('/src/data/services.json')
            .then(response => {
                setAreas(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
            })
    }

    function areaSelected(area) {
        setArea(area);
        getDoctors(area);
    }

    return (
        <Segment loading={loading}>
            <PortalModal open={modalOpen} onConfirm={ReserveConfirmed} firstName={firstName} lastName={lastName} phone={phone} email={email} doctor={doctor} />

            <Form onSubmit={() => ConfirmReserve()}>
                <h1>Formulario de Reserva</h1>
                {/* <TextInput label="Nombre" placeholder="Juanito" onChange={setFirstName} useRef={firstNameRef} />
                <TextInput label="Apellido" placeholder="Perez" onChange={setLastName} useRef={lastNameRef} />
                <TextInput label="Teléfono" placeholder="987654321" onChange={setPhone} useRef={phoneRef} />
                <TextInput label="Correo electrónico" placeholder="jperez@hotmail.com" onChange={setEmail} useRef={emailRef} /> */}
                <TextDisplay label="Nombre" value = {firstName} />
                <TextDisplay label="Apellido" value = {lastName} />
                <TextDisplay label="Teléfono" value = {phone} />
                <TextDisplay label="Correo electrónico" value = {email} />
                <DropdownInput label="Especialidad" placeholder="Kinesiología" options={areas} onChange={areaSelected} required />
                <DropdownInput label="Doctor" placeholder="Doctor..." options={doctors} onChange={setDoctor} required />
                <FormButton type="submit">Reservar Hora</FormButton>
            </Form>

            {
                error && <RequestError error={error} callback={getServices} />
            }
        </Segment>
    );

    function ConfirmReserve() {
        /* if (firstNameRef.current.value == null || firstNameRef.current.value == "") {
            firstNameRef.current.focus();
            return;
        }

        if (lastNameRef.current.value == null || lastNameRef.current.value == "") {
            lastNameRef.current.focus();
            return;
        }

        const validatedPhone = phoneValidation.test(phone);
        if (!validatedPhone) {
            phoneRef.current.focus();
            return;
        }

        const validatedEmail = emailValidation.test(email);
        if (!validatedEmail) {
            emailRef.current.focus();
            return;
        } */

        if (doctor == null || doctor == "") {
            return;
        }

        if (area == null || area == "") {
            return;
        }

        setModalOpen(true);
    }

    function ReserveConfirmed() {
        if(dbReady)
        {
            addData(RESERVES_STORE, {
                timestamp: Date.now(),
                firstName: firstName,
                lastName: lastName,
                doctorName: doctor,
                doctorArea: area,
                phone: phone,
                email: email
            })
        }

        setModalOpen(false);
        /* firstNameRef.current.value = null;
        lastNameRef.current.value = null;
        phoneRef.current.value = null;
        emailRef.current.value = null; */
    }  
}