import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import DetailsSection from "../components/DetailsSection";
import HotelDetails from "../components/HotelDetails";
import ItineraryDetails from "../components/ItineraryDetails";

const ViewTrip = () => {
  const { tripId } = useParams();
  const [tripData, setTripData] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  //   Fetching trip data from Firebase
  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data: ", docSnap.data());
      setTripData(docSnap.data());
    } else {
      console.log("No such document!");
      toast.error("No such trip found!");
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      <DetailsSection tripData={tripData} />

      <HotelDetails tripData={tripData} />

      <ItineraryDetails tripData={tripData} />
    </div>
  );
};

export default ViewTrip;
