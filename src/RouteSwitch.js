import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./components/HomePage/HomePage";
import ProfilePage from "./components/ProfilePage/ProfilePage";

const RouteSwitch = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/user-page" element={<ProfilePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;