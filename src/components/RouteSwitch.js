import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogInPage from "./LogInPage";

const RouteSwitch = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}/>
                <Route path="/login" element={<LogInPage />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;