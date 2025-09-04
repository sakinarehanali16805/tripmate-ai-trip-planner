import React from "react";
import { Button } from "../ui/button.jsx";
import { Link } from "react-router-dom";
import { Plane, Hotel, Map, Save } from "lucide-react"; // icons
import { CheckCircle } from "lucide-react";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-auto px-6 text-center max-w-5xl">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-10 mt-10">
        <div className="flex-1">
          <h2 className="text-4xl font-extrabold text-brand-custom-red">
            Discover Your Next Adventure with AI
          </h2>
          <p className="text-2xl text-brand-custom-blue mt-2">
            Personalized itineraries at your fingertips
          </p>
          <p className="text-lg mt-6">
            Your personal trip planner and travel curator, creating custom
            itineraries tailored to your interests and budget.
          </p>
          <Link to={"/create-trip"}>
            <Button className="bg-brand-custom-red text-brand-custom-beige mt-5">
              Get Started — It&apos;s Free!
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-center text-center p-4 hover:scale-110 transition-all">
          <Plane className="h-10 w-10 text-brand-custom-red mb-3" />
          <h3 className="font-semibold text-lg">Smart Itineraries</h3>
          <p className="text-sm text-brand-custom-blue/90 mt-2">
            AI builds your trip in seconds.
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-4 hover:scale-110 transition-all">
          <Hotel className="h-10 w-10 text-brand-custom-red mb-3" />
          <h3 className="font-semibold text-lg">Hotels Made Simple</h3>
          <p className="text-sm text-brand-custom-blue/90 mt-2">
            Find the best stays within your budget.
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-4 hover:scale-110 transition-all">
          <Map className="h-10 w-10 text-brand-custom-red mb-3" />
          <h3 className="font-semibold text-lg">Explore Attractions</h3>
          <p className="text-sm text-brand-custom-blue/90 mt-2">
            Discover must-visit spots with ease.
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-4 hover:scale-110 transition-all">
          <Save className="h-10 w-10 text-brand-custom-red mb-3" />
          <h3 className="font-semibold text-lg">Save & Revisit</h3>
          <p className="text-sm text-brand-custom-blue/90 mt-2">
            Access your trips anytime, anywhere.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="my-10 max-w-4xl">
        <h3 className="text-2xl font-bold text-brand-custom-blue mb-8">
          How It Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="hover:scale-110 transition-all">
            <CheckCircle className="h-10 w-10 text-brand-custom-red mx-auto mb-3" />
            <h4 className="font-semibold text-lg">Step 1</h4>
            <p className="text-sm text-brand-custom-blue/90 mt-2">
              Tell us your destination, number of days, budget, and who
              you&apos;re traveling with.
            </p>
          </div>
          <div className="hover:scale-110 transition-all">
            <CheckCircle className="h-10 w-10 text-brand-custom-red mx-auto mb-3" />
            <h4 className="font-semibold text-lg">Step 2</h4>
            <p className="text-sm text-brand-custom-blue/90 mt-2">
              Get your personalized itinerary instantly.
            </p>
          </div>
          <div className="hover:scale-110 transition-all">
            <CheckCircle className="h-10 w-10 text-brand-custom-red mx-auto mb-3" />
            <h4 className="font-semibold text-lg">Step 3</h4>
            <p className="text-sm text-brand-custom-blue/90 mt-2">
              Save, share, and enjoy your trip stress-free.
            </p>
          </div>
        </div>
      </section>

      <Link to={"/create-trip"} className="my-5">
        <Button className="bg-brand-custom-red text-brand-custom-beige">
          Get Started — It&apos;s Free!
        </Button>
      </Link>
    </div>
  );
}

export default Hero;
