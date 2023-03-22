import axios from "axios";
import { Routes, Route } from "react-router-dom" 
import Layout from "./components/Layout";
import AccountPage from "./pages/AccountPage";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import PlacesPage from "./pages/PlacesPage";
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
          <Route path="/account/:subpage?" element={<AccountPage/>} />
          <Route path="/account/:subpage/:action" element={<PlacesPage/>} /> 
				</Route>
			</Routes>
    </UserContextProvider>
    
  );
}

export default App;
