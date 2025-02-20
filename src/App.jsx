import './App.css'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import { Navbar } from './components/Navbar'
import HospitalRoutes from './routes/Routes'
import { AuthContext } from './context/AuthContext'

function App() 
{
    return (
        <AuthContext>
            <Navbar />
            <Container>
                <HospitalRoutes />
            </Container>
        </AuthContext>
    )
}

export default App
