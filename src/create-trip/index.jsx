import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { budgetOptions, travelOptions } from "@/constants/options";
import { generateTripPlan } from "@/service/AIModel";
import { toast } from "sonner";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [tripDetails, setTripDetails] = useState({
    destination: "",
    days: "",
    budget: "",
    travelWith: "",
  });

  const handleInputChange = (name, value) => {
    setTripDetails({
      ...tripDetails,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(tripDetails);
  }, [tripDetails]);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      GetUserDetails(tokenResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const OnGenerateTrip = async () => {
    const { days, destination, budget, travelWith } = tripDetails;

    if (!localStorage.getItem("user")) {
      toast("Please sign in to create a trip plan.");
      setOpenDialog(true);
      return;
    }

    if (!destination) {
      toast("Please select a destination.");
      return;
    }

    if (!days) {
      toast("Please enter number of days.");
      return;
    }

    const daysNum = Number(days);
    if (isNaN(daysNum)) {
      toast("Please enter a valid number for days.");
      return;
    }
    if (daysNum < 1) {
      toast("Trip must be at least 1 day.");
      return;
    }
    if (daysNum > 30) {
      toast("Please enter a trip duration of 30 days or less.");
      return;
    }

    if (!budget) {
      toast("Please select a budget option.");
      return;
    }

    if (!travelWith) {
      toast("Please select who you're traveling with.");
      return;
    }

    setLoading(true);

    toast("Generating your trip plan...");

    const tripPlan = await generateTripPlan({
      destination: destination.label,
      days: daysNum,
      budget,
      travelWith,
    });

    if (tripPlan) {
      console.log("Generated Trip Plan: ", tripPlan);
      toast.success("Trip plan generated.");
    } else {
      toast.error("Failed to generate trip plan. Try again!");
    }

    await CreateTrip(tripPlan);
    setLoading(false);
  };

  const CreateTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userPreferances: tripDetails,
      tripData: TripData,
      userEmail: user.email,
      id: docId,
    });
    setLoading(false);
    navigate(`/view-trip/${docId}`);
  };

  const GetUserDetails = (tokenResponse) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log("User Info: ", res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-100 px-5 m-10">
      <h2 className="font-bold text-3xl text-brand-custom-red">
        What&apos;s your dream destination?🗺️
      </h2>
      <p className="mt-3 text-md">
        Tell us a little about your trip, and we&apos;ll put together a travel
        plan made just for you&#9992;&#65039;
      </p>

      <div className="mt-16 flex flex-col gap-10">
        <div>
          <h2 className="text-md my-3 font-medium">
            What is your destination?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("destination", v);
              },
              styles: {
                control: (provided, state) => ({
                  ...provided,
                  borderColor: state.isFocused ? "#A8DADC" : "#A8DADC",
                  boxShadow: state.isFocused ? "0 0 0 1.5px #A8DADC" : "none",
                  "&:hover": {
                    borderColor: "#A8DADC",
                  },
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused
                    ? "rgba(0, 137, 123, 0.2)"
                    : state.isSelected
                    ? "rgba(0, 137, 123, 0.4)"
                    : "white",
                  color: "black",
                  cursor: "pointer",
                }),
              },
            }}
          />
        </div>

        <div>
          <h2 className="text-md my-3 font-medium">
            How many days would you like to travel?
          </h2>
          <Input
            placeholder="E.g., 3"
            type="number"
            onChange={(e) => handleInputChange("days", e.target.value)}
          />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-md my-3 font-medium">
          What&apos;s your travel budget?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {budgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border rounded-lg flex flex-col justify-center cursor-pointer
                 ${
                   tripDetails?.budget === item.title
                     ? "shadow-md shadow-brand-custom-dark-blue border-brand-custom-dark-blue"
                     : "border-brand-custom-ocean-green hover:shadow-brand-custom-ocean-green hover:shadow-lg"
                 }
                 `}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-brand-custom-blue">
                {item.description}
              </h2>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-md my-3 font-medium">
          Who are you planning to travel with?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {travelOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("travelWith", item.title)}
              className={`p-4 border rounded-lg flex flex-col justify-center cursor-pointer
                 ${
                   tripDetails?.travelWith === item.title
                     ? "shadow-md shadow-brand-custom-dark-blue border-brand-custom-dark-blue"
                     : "border-brand-custom-ocean-green hover:shadow-brand-custom-ocean-green hover:shadow-lg"
                 }
                 `}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-brand-custom-blue">
                {item.description}
              </h2>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Button onClick={OnGenerateTrip} disabled={loading}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin text-brand-custom-red" />
          ) : (
            "Plan My Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-lg font-bold text-brand-custom-rusty-red">
              <img
                src="/logo.png"
                alt="Icon"
                className="w-15 h-12 object-cover"
              />
              TripMate
            </DialogTitle>
            <h2 className="font-semibold text-lg pt-3">Sign in with Google</h2>
            <DialogDescription className="py-3 text-sm text-brand-custom-blue">
              You need to be signed in to create a trip plan. Use Google to sign
              in quickly and securely.
            </DialogDescription>
            <div className="mt-5 flex justify-center items-center">
              <Button onClick={login} variant="outline">
                <FcGoogle className="w-7 h-7" />
                Sign In with Google
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
