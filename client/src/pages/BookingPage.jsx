import axios from "axios";
import { useEffect, useState } from "react";
import { differenceInCalendarDays, format } from "date-fns";
import { useParams } from "react-router-dom";
import PlaceGallery from "../components/PlaceGallery";

export default function BookingPage() {
	const { id } = useParams();
	const [booking, setBooking] = useState(null);
	useEffect(() => {
		if (id) {
			axios.get("/booking/list").then(response => {
				const foundBooking = response.data.find(({ _id }) => id === _id);
				if (foundBooking) {
					setBooking(foundBooking);
				}
			});
		}
	}, [id]);

	if (!booking) {
		return "";
	}

	return (
		<div className="my-8">
			<div className="border-t border-x border-gray-300 rounded-t-xl text-center">
				<h2 className="text-xl font-bold border-gray-300">Your booking Information </h2>
			</div>
			<div className="grid border-x border-b border-gray-300 rounded-b-xl sm:grid-cols-1 md:grid-cols-2 py-3 pr-6 mb-3 grow">
				<div className="m-auto">
					<div className="flex mt-2" >
						<div className="flex gap-1 items-center">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
							</svg>
							{format(new Date(booking.checkIn), "yyyy-MM-dd")} &rarr;
						</div>
						<div className="flex gap-1 items-center">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
							</svg>
							{format(new Date(booking.checkOut), "yyyy-MM-dd")}
						</div>
					</div>
					<div className="text-l font-bold pt-3 text-center">
						{differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} Nights
					</div>
				</div>
				<div className="text-xl m-auto pt-3">
					<h2 className="text-center text-black bg-red-400 px-2">Total Price: <br /> ${booking.price}</h2>
				</div>
			</div>
			<PlaceGallery place={booking.place} />
			<div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
				<div>
					<div className="my-4">
						<h2 className="font-semibold text-2xl">Description</h2>
						{booking.place.description}
					</div>
					Check-in: {booking.place.checkIn} <br />
					Check-out: {booking.place.checkOut} <br />
					Max number of guests: {booking.place.maxGuests}
				</div>
				<div className="bg-white -mx-8 px-8 py-8 border-t">
					<div>
						<h2 className="font-semibold text-2xl">Extra Infomation</h2>
					</div>
					<div className="mb-4 mt-2 text-sm text-gray-700 leading-5"> {booking.place.extraInfo} </div>
				</div>
			</div>
		</div>
	);
}
