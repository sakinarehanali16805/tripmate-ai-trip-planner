import React from "react";
import PlaceCard from "./PlaceCard";

const ItineraryDetails = ({ tripData }) => {
  return (
    <div>
      <h2 className="text-brand-custom-blue font-semibold text-xl mt-10">
        Trip Itinerary
      </h2>

      <div>
        {tripData?.tripData?.itinerary.map((day, index) => (
          <div key={index}>
            <h2 className="font-semibold text-lg mt-5 text-center">
              Day {day.day}
            </h2>
            <div className="grid grid-cols-1 gap-5">
              {day?.plan.map((place, index) => (
                <div key={index}>
                  <h2 className="text-sm font-medium text-brand-custom-red/80 my-2">
                    {place.best_time_to_visit}
                  </h2>
                  <PlaceCard place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryDetails;
