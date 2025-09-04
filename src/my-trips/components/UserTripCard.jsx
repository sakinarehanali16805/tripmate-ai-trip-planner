import { GetPlaceData, PHOTO_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserTripCard = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userPreferances.destination.label,
    };
    const result = await GetPlaceData(data).then((res) => {
      // console.log("Place Data", res.data.places[0].photos[3].name);
      const photoRef = res.data.places[0].photos[3].name;
      const photoURL = PHOTO_URL.replace("{NAME}", photoRef);
      // console.log("Photo URL", photoURL);
      setPhotoUrl(photoURL);
    });
  };
  return (
    <Link to={"/view-trip/" + trip.id}>
      <div className="h-72 border border-brand-custom-blue/20 hover:shadow-lg hover:shadow-brand-custom-blue p-2 rounded-xl transition-all cursor-pointer hover:scale-105">
        <img
          src={photoUrl ? photoUrl : "/placeholder.jpg"}
          alt="Place Image"
          className="object-cover rounded-xl h-40 w-full mb-2"
        />
        <div>
          <h2 className="font-medium text-lg text-brand-custom-rusty-red">
            {trip.userPreferances.destination.label}
          </h2>
          <h2 className="text-sm text-brand-custom-dark-blue">
            {trip.userPreferances.days} - day trip planned with a{" "}
            {trip.userPreferances.budget} budget.
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default UserTripCard;
