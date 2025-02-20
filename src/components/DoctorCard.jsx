import { Card, CardContent, CardDescription, CardHeader, CardMeta } from "semantic-ui-react";
import PropTypes from "prop-types";

export function DoctorCard({doctor})
{
    return (
        <Card>
            <CardContent>
                <CardHeader>{doctor.text}</CardHeader>
                <CardMeta>Especialidad: {doctor.area}</CardMeta>
                <CardDescription>
                    <p>{doctor.desc}</p>
                    <p>{doctor.years} {doctor.years == 1 ? "año" : "años"} de experiencia</p>
                </CardDescription>   
            </CardContent>
        </Card>
    );
}

DoctorCard.propTypes = {
    doctor: PropTypes.shape({
        text: PropTypes.string.isRequired,
        area: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired,
        years: PropTypes.number.isRequired
    })
}