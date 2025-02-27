import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";

export function ReservesList({reserves})
{
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>Paciente</TableHeaderCell>
                    <TableHeaderCell>Correo electrónico</TableHeaderCell>
                    <TableHeaderCell>Teléfono</TableHeaderCell>
                    <TableHeaderCell>Área de atención</TableHeaderCell>
                    <TableHeaderCell>Doctor(a)</TableHeaderCell>
                </TableRow>
            </TableHeader>

            <TableBody>
            {
                reserves.map((item, i) => 
                {
                    return(
                        <TableRow key={i}>
                            <TableCell>
                                {item.firstName + " " + item.lastName}
                            </TableCell>

                            <TableCell>
                                {item.email}
                            </TableCell>
                            
                            <TableCell>
                                {item.phone}
                            </TableCell>

                            <TableCell>
                                {item.doctorArea}
                            </TableCell>

                            <TableCell>
                                {item.doctorName}
                            </TableCell>
                        </TableRow>
                    )
                })
            }
            </TableBody>
        </Table>
    );
}