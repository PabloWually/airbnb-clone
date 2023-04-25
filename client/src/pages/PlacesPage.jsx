import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNavigation from "../components/AccountNavigation";
import PlaceImg from "../components/PlaceImg";

export default function PlacesPage() {
	const [places, setPlaces] = useState([]);
	useEffect(() => {
		axios.get("/places/list-by-user").then(({ data }) => {
			setPlaces(data);
		});
	}, []);

	async function deletePlace(id) {
		if (confirm("Are you sure?" + id)) {
			const { data } = axios.delete("/places/delete/" + id);
		}
	}

	return (
		<div>
			<AccountNavigation />
			<div className="text-center">
				<div>
					List of all added Places
				</div>
				<Link
					className="inline-flex gap-1 bg-primary text-white py-2 px-6"
					to={"/account/places/new"}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 4.5v15m7.5-7.5h-15"
						/>
					</svg>
					Add new place
				</Link>
			</div>
			<div className="mt-4">
				{places.length > 0 && places.map(place => (
					<div className="flex gap-2 bg-gray-200 m-2 p-4 rounded-2xl">
						<Link to={"/account/places/" + place._id} className="flex gap-2" key={place._id}>
							<div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
								<PlaceImg place={place} />
							</div>
							<div className="grow-0 shrink">
								<h2 className="text-xl">{place.title}</h2>
								<p className="text-sm mt-2">{place.description}</p>
							</div>
						</Link>
						<div className="my-auto">
							<button className="primary" onClick={(ev)=> deletePlace(place._id)} >Delete Place</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
