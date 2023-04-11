import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccountNavigation from "../components/AccountNavigation";
import Perks from "../components/Perks.jsx";
import PhotosUploader from "../components/PhotoUploader.jsx";

export default function PlacesFormPage() {
	const { id } = useParams();
	const [title, setTitle] = useState("");
	const [address, setAddress] = useState("");
	const [addedPhotos, setAddedPhotos] = useState([]);
	const [description, setDesecription] = useState("");
	const [perks, setPerks] = useState([]);
	const [extraInfo, setExtraInfo] = useState("");
	const [checkIn, setCheckin] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [maxGuests, setMaxGuests] = useState(1);
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		if (!id) {
			return;
		}
		axios.get("/places/list/" + id).then(response => {
			const { data } = response;
			setTitle(data.title);
			setAddress(data.address);
			setAddedPhotos(data.photos);
			setDesecription(data.description);
			setPerks(data.perks);
			setExtraInfo(data.extraInfo);
			setCheckin(data.checkIn);
			setCheckOut(data.checkOut);
			setMaxGuests(data.maxGuests);
		});
	}, [id]);

	async function savePlace(ev) {
		ev.preventDefault();
		const placeData = {title, address, addedPhotos, description,
				perks, extraInfo, checkIn, checkOut, maxGuests
}
		if (id) {
			const { data } = await axios.put("places/update", {
				id, ...placeData
			});
			setRedirect(true)
		} else {
			const { data } = await axios.post("places/create", { placeData });
			setRedirect(true);
		}
	}

	if (redirect) {
		return <Navigate to={"/account/places"} />
	}
	return (
		<div>
			< AccountNavigation />
			<form onSubmit={savePlace}>
				<h2 className="text-2xl mt-4">Title</h2>
				<p className="text-gray-500 text-sm">
					Title for your place, should be short and catchy as in
					advertisement
				</p>
				<input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Some tittle" />
				<h2 className="text-2xl mt-4">Adrress</h2>
				<p className="text-gray-500 text-sm">Address to this place</p>
				<input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Address" />
				<h2 className="text-2xl mt-4">Photos</h2>
				<p className="text-gray-500 text-sm">more = better</p>
				<PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
				<h2 className="text-2xl mt-4">Description</h2>
				<p className="text-gray-500 text-sm">Description for your place</p>
				<textarea value={description} onChange={ev => setDesecription(ev.target.value)} />
				<h2 className="text-2xl mt-4">Perks</h2>
				<p className="text-gray-500 text-sm">
					Select all your perk for your place
				</p>
				<div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
					<Perks selected={perks} onChange={setPerks} />
				</div>
				<h2 className="text-2xl mt-4">Extra info</h2>
				<p className="text-gray-500 text-sm">House ruels, etc.</p>
				<textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}></textarea>
				<h2 className="text-2xl mt-4">Chek in & out times</h2>
				<p className="text-gray-500 text-sm">
					Add check in and check out times.
				</p>
				<div className="grid gap-2 sm:grid-cols-3">
					<div>
						<h3 className="mt-2 -mb-1">Chek in time</h3>
						<input value={checkIn} onChange={ev => setCheckin(ev.target.value)} type="text" placeholder="08:00" />
					</div>
					<div>
						<h3 className="mt-2 -mb-1">Check out time</h3>
						<input value={checkOut} onChange={ev => setCheckOut(ev.target.value)} type="text" placeholder="14:00" />
					</div>
					<div>
						<h3 className="mt-2 -mb-1">Max number of guests</h3>
						<input value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} type="number" placeholder="4" />
					</div>
					<button className="primary my-4">Save</button>
				</div>
			</form>
		</div>
	);
}
