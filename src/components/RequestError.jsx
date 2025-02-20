export function RequestError({error, callback})
{
    return(
        <>
            <p>{error}</p>
            <button onClick={() => callback()}>Reintentar solicitud</button>
        </>
    )
}