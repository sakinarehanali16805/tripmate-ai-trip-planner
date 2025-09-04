import { GetPlaceData, PHOTO_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PlaceCard = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place.place_name,
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
    <Link
      to={"https://www.google.com/maps?q=" + place.place_name}
      target="_blank"
    >
      <div className="border border-brand-custom-blue/20 rounded-lg p-2 flex gap-5 hover:scale-105 transition-all hover:shadow-lg hover:shadow-brand-custom-blue cursor-pointer">
        <img
          src={photoUrl ? photoUrl : "/placeholder.jpg"}
          alt="Place Img"
          className="h-[150px] w-[150px] rounded-lg object-cover"
        />
        <div>
          <h2 className="font-semibold text-lg text-brand-custom-rusty-red">
            {place.place_name}
          </h2>
          <p className="text-xs text-brand-custom-dark-blue/70">
            {place.place_details}
          </p>
          <h2 className="mt-2 text-sm text-brand-custom-dark-blue">
            ⏱️ Takes about {place.time_to_travel} to get here
          </h2>
          <h2 className="text-sm text-brand-custom-dark-blue">
            💵 Ticket costs {place?.ticket_pricing}
          </h2>
          <h2 className="text-sm text-brand-custom-dark-blue">
            ⭐ {place?.rating}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;
