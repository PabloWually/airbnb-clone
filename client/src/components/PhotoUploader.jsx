import axios from "axios";
import { useState } from "react";

export default function PhotosUploader({ addedPhotos, onChange }) {

	const [photoLink, setPhotoLink] = useState("");
	async function addPhotoByLink(ev) {
		ev.preventDefault();
		const { data: filename } = await axios.post("places/upload-by-link", {
			link: photoLink
		});
		onChange(prev => {
			return [...prev, filename];
		});
		setPhotoLink("");
	}

	function uploadPhoto(ev) {
		const files = ev.target.files;
		const data = new FormData();
		for (let index = 0; index < files.length; index++) {
			data.append('photos', files[index]);
		}
		axios.post("places/uploads", data, {
			headers: { 'Content-type': 'multipart/form-data' }
		}).then(response => {
			const { data: filename } = response;
			onChange(prev => {
				return [...prev, ...filename]
			});
		});
	}

	function removePhoto(ev, filename) {
		ev.preventDefault();
		onChange([...addedPhotos.filter(photo => photo !== filename)])
	}

	function setMainPhoto(ev, filename) {
		ev.preventDefault();
		const addedPhotosWithoutSelected = addedPhotos
		.filter(photo => photo !== filename);
		const newAddedPhotos = [filename, ...addedPhotosWithoutSelected];
		onChange(newAddedPhotos);
	}

	return (
		<>
			<div className="flex gap-2">
				<input type="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} placeholder="{Add using a link...jpg}" />
				<button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">
					Add&nbsp;photo
				</button>
			</div>
			<div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
				{addedPhotos.length > 0 && addedPhotos.map(link => (
					<div className="h-32 flex relative" key={link}>
						<img className="rounded-2xl w-full object-cover" src={'http://localhost:4000/uploads/' + link} alt="" />
						<button onClick={(ev) => removePhoto(ev, link)} className="absolute bottom-0 right-2 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
								<path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
							</svg>
						</button>
						<button onClick={(ev) => setMainPhoto(ev, link)} className="absolute bottom-0 left-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3">
							{link === addedPhotos[0] && (
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
									<path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
								</svg>
							)}
							{link !== addedPhotos[0] && (
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
								</svg>
							)}

						</button>

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
		</>
	);
}
