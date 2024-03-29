import axios from "axios";
import { useContext, useState } from "react";
import { Navigate, Link, useParams } from "react-router-dom";
import AccountNavigation from "../components/AccountNavigation.jsx";
import { UserContext} from "../UserContext.jsx";
import PlacesPage from "./PlacesPage.jsx";

export default function AccountPage() {
	const [redirect, setRedirect] = useState(null);
	const {ready, user, setUser} = useContext(UserContext);
	
	let {subpage} = useParams();
	if(subpage === undefined) {
		subpage = 'profile';
	}

	async function logout(){
		await axios.post('/users/logout');
		setRedirect('/')
		setUser(null);
	}
	
	if (!ready) {
		return "loading..."
	}

	if (ready && !user && !redirect) {
		return <Navigate to={"/login"} />
	} 

	if (redirect) {
		return <Navigate to={redirect} />
	}

  return (
    <div>
			<AccountNavigation />
			{subpage === 'profile' && (
				<div className="text-center max-w-lg mx-auto">
					Logged in as {user.name} ({user.email})<br />
					<button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
				</div>
			)}
			{subpage === 'places' && (
				<div>
					My Places
					<PlacesPage />
				</div>
			)}

		</div>
  );
}
