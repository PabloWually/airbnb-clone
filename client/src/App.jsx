import axios from "axios";
import { Routes, Route } from "react-router-dom" 
import Layout from "./components/Layout";
import AccountPage from "./pages/AccountPage";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacesPage from "./pages/PlacesPage";
import PlacePage from "./pages/PlacePage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";

axios.defaults.baseURL = 'http://localhost:4000/api/v1/';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<IndexPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/account" element={<AccountPage/>} />
          <Route path="/account/places" element={<PlacesPage/>} /> 
          <Route path="/account/places/new" element={<PlacesFormPage />} /> 
          <Route path="/account/places/:id" element={<PlacesFormPage />} /> 
          <Route path="/place/:id" element={<PlacePage />} /> 
				</Route>
			</Routes>
    </UserContextProvider>
    
  );
}

export default App;
