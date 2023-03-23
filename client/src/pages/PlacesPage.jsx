import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../components/Perks";

export default function PlacesPage() {
	const { action } = useParams("");
	const [tittle, setTittle] = useState("");
	const [address, setAddress] = useState("");
	const [addedPhotos, setAddedPhotos] = useState([]);
	const [photoLink, setPhotoLink] = useState("");
	const [description, setDesecription] = useState("");
	const [perks, setPerks] = useState([]);
	const [extraInfo, setExtraInfo] = useState("");
	const [chekIn, setCheckin] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [maxGuests, setMaxGuests] = useState(1);

	async function addPhotoByLink(ev) {
		ev.preventDefault();
		const {data: filename} = await axios.post("places/upload-by-link", {
			link: photoLink
		});
		setAddedPhotos(prev => {
			return [...prev, filename];
		});
		setPhotoLink("");
	}

	function uploadPhoto(ev){
		const files = ev.target.files;
		const data = new FormData();
		for (let index = 0; index < files.length; index++) {
			data.append('photos', files[index]);
		}
		axios.post("places/uploads", data, {
			headers: {'Content-type': 'multipart/form-data'}
		}).then(response => {
			const {data:filename} = response;
				setAddedPhotos(prev => {
					return [...prev, ...filename]
				});
		});
	}

	return (
		<div>
			{action !== "new" && (
				<div className="text-center">
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
			)}
			{action === "new" && (
				<div>
					<form>
						<h2 className="text-2xl mt-4">Title</h2>
						<p className="text-gray-500 text-sm">
							Title for your place, should be short and catchy as in
							advertisement
						</p>
						<input type="text" value={tittle} onChange={ev => setTittle(ev.target.value)} placeholder="Some tittle" />
						<h2 className="text-2xl mt-4">Adrress</h2>
						<p className="text-gray-500 text-sm">Address to this place</p>
						<input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Address" />
						<h2 className="text-2xl mt-4">Photos</h2>
						<p className="text-gray-500 text-sm">more = better</p>
						<div className="flex gap-2">
							<input type="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} placeholder="{Add using a link...jpg}" />
							<button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">
								Add&nbsp;photo
							</button>
						</div>
						<div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
							{addedPhotos.length > 0 && addedPhotos.map(link => (
								<div className="h-32 flex">
									<img className="rounded-2xl w-full object-cover" src={'http://localhost:4000/uploads/'+link} alt=""/>
								</div>
							))}
							<label
								className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600"
								type=""
							>
								<input type="file" multiple className="hidden" onChange={uploadPhoto} />
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-8 h-8"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
									/>
								</svg>
								Upload
							</label>
						</div>
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
								<input value={chekIn} onChange={ev => setCheckin(ev.target.value)} type="text" placeholder="08:00" />
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
			)}
		</div>
	);
}
