import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./components/HomePage/HomePage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import UserPage from "./UserPage";

const RouteSwitch = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/user-page" element={<ProfilePage />} />
                <Route path="/user/:uid" element={<UserPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;