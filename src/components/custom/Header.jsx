import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      GetUserDetails(tokenResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

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
        window.location.reload();
      });
  };

  return (
    <div className="p-3 flex justify-between items-center px-5">
      <div className="flex items-center gap-1 mx-12">
        <img src="/logo.png" alt="Logo" className="h-12 w-12" />
        <span className="font-semibold text-xl text-brand-custom-rusty-red">
          <i>TripMate</i>
        </span>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip" className="text-brand-custom-dark-blue">
              <Button variant="outline" className="rounded-2xl">
                Create New Trip
              </Button>
            </a>

            <a href="/my-trips" className="text-brand-custom-dark-blue">
              <Button variant="outline" className="rounded-2xl">
                View My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user.picture}
                  alt="User Pic"
                  className="h-10 w-10 rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-lg font-bold text-brand-custom-ruisty-red">
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

export default Header;
