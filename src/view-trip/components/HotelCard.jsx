import { GetPlaceData, PHOTO_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotel_name,
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
    <div>
      <Link
        key={hotel?.hotel_name || hotel?.hotel_address}
        to={
          "https://www.google.com/maps?q=" +
          hotel?.hotel_name +
          "," +
          hotel?.hotel_address
        }
        target="_blank"
        className="h-full"
      >
        <div className="flex flex-col h-full hover:scale-105 transition-all cursor-pointer text-brand-custom-dark-blue hover:shadow-lg hover:shadow-brand-custom-blue rounded-lg p-2 border border-brand-custom-blue/20 ">
          <img
            src={photoUrl ? photoUrl : "/placeholder.jpg"}
            alt="Hotel image"
            className="rounded-xl h-40 object-cover w-full"
          />
          <div className="my-3 flex flex-col gap-2 flex-grow">
            <h2 className="font-medium">{hotel?.hotel_name}</h2>
            <h2 className="text-xs">📍 {hotel?.hotel_address}</h2>
            <h2 className="text-sm">💵 {hotel?.price}</h2>
            <h2 className="text-sm">⭐ {hotel?.rating}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HotelCard;
