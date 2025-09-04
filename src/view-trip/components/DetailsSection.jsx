import { Button } from "@/components/ui/button";
import { GetPlaceData, PHOTO_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { RiShareBoxLine } from "react-icons/ri";

const DetailsSection = ({ tripData }) => {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    tripData && GetPlacePhoto();
  }, [tripData]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: tripData?.userPreferances?.destination?.label,
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
      <img
        src={photoUrl ? photoUrl : "/placeholder.jpg"}
        alt="Trip Image"
        className="h-[25rem] w-full object-cover rounded-2xl"
      />

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-semibold text-2xl text-brand-custom-red">
            {tripData?.userPreferances?.destination?.label}
          </h2>
          <div className="flex gap-5 ">
            <h2 className="p-1 px-3 rounded-full border border-brand-custom-ocean-green text-sm md:text-md xl:text-md">
              📅 {tripData?.userPreferances?.days} Days
            </h2>
            <h2 className="p-1 px-3 rounded-full border border-brand-custom-ocean-green text-sm md:text-md">
              💰 {tripData?.userPreferances?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 rounded-full border border-brand-custom-ocean-green text-sm md:text-md">
              {tripData?.userPreferances?.travelWith === "Solo" &&
                "🧳 Traveling Solo"}
              {tripData?.userPreferances?.travelWith === "Couple" &&
                "💕 Trip with a Partner"}
              {tripData?.userPreferances?.travelWith === "Family" &&
                "👨‍👩‍👧‍👦 Family Trip"}
              {tripData?.userPreferances?.travelWith === "Friends" &&
                "🍻 Trip with Friends"}
            </h2>
          </div>
        </div>
        <Button className="rounded-full">
          <RiShareBoxLine />
        </Button>
      </div>
    </div>
  );
};

export default DetailsSection;
