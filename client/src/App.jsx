import axios from "axios";
import { Routes, Route } from "react-router-dom" 
import Layout from "./components/Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

axios.defaults.baseURL = 'http://172.29.99.94:4000/';
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<IndexPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage />}/>
      </Route>
    </Routes>
    
  );
}

export default App;
