import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCard from "./components/UserTripCard";
import Footer from "@/components/custom/Footer";

const MyTrips = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
      return;
    }

    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrips((prev) => [...prev, doc.data()]);
    });
  };
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-100 px-5 m-10">
      <h2 className="font-bold text-3xl text-brand-custom-red">My Trips</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-8">
        {userTrips?.length > 0
          ? userTrips.map((trip, index) => (
              <UserTripCard trip={trip} key={index} />
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="h-72 w-full bg-brand-custom-blue/50 animate-pulse rounded-xl"
              ></div>
            ))}
      </div>
      {/* Last part */}
    </div>
  );
};

export default MyTrips;
