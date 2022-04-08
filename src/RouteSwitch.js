import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from "./App";
import LogInPage from "./components/LogInPage";

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