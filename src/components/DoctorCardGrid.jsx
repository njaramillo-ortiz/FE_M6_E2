import { Grid, GridColumn } from "semantic-ui-react";
import { DoctorCard } from "./DoctorCard";

export function DoctorCardGrid({doctors})
{ 
    return(
        <>
            <Grid doubling columns={3}>
                {
                    doctors.map((item, i) =>
                    {
                        return(
                            <GridColumn key={i}>
                                <DoctorCard doctor={item}/>
                            </GridColumn>
                        );
                    })
                }
            </Grid>
        </>
    );
}