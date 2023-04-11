import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AccountNavigation from "../components/AccountNavigation";
import PlacesFormPage from "./PlacesFormPage";

export default function PlacesPage() {
	const { action } = useParams("");

	return (
		<div>
			<AccountNavigation />
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
					<PlacesFormPage />
				</div>
			)}
		</div>
	);
}
