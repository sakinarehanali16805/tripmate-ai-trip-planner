import React from "react";
import HotelCard from "./HotelCard";

const HotelDetails = ({ tripData }) => {
  return (
    <div>
      <h2 className="font-semibold text-xl mt-5 text-brand-custom-blue">
        Suggested Hotels
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
        {tripData?.tripData?.hotels_options.map((hotel, index) => (
          <HotelCard hotel={hotel} key={index} />
        ))}
      </div>
    </div>
  );
};

export default HotelDetails;
