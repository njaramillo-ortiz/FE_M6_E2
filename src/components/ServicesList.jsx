import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";

export function ServicesList({services})
{
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>Servicio</TableHeaderCell>
                    <TableHeaderCell>Integrantes</TableHeaderCell>
                    <TableHeaderCell>Encargado/a</TableHeaderCell>
                </TableRow>
            </TableHeader>

            <TableBody>
            {
                services.map((item, i) => 
                {
                    return(
                        <TableRow key={i}>
                            <TableCell>
                                {item.text}
                            </TableCell>

                            <TableCell>
                                {item.members}
                            </TableCell>
                            
                            <TableCell>
                                {item.admin}
                            </TableCell>
                        </TableRow>
                    )
                })
            }
            </TableBody>
        </Table>
    );
}