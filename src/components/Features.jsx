import React from "react";
import { Truck, Lock, RotateCcw, Clock } from "lucide-react";

function Features() {
  const features = [
    { icon: Truck, text: "Free Shipping", subtext: "On orders over $100" },
    { icon: Lock, text: "Secure Payment", subtext: "100% protected payments" },
    { icon: RotateCcw, text: "Easy Returns", subtext: "30-day return policy" },
    { icon: Clock, text: "24/7 Support", subtext: "Dedicated customer service" },
  ];

  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center md:justify-between gap-8 py-8 px-4">
          {features.map((item, index) => (
            <div key={index} className="flex items-center gap-4 w-full sm:w-auto">
              <item.icon
                className="flex-shrink-0 h-10 w-10 text-red-500"
                aria-hidden="true"
              />
              <div>
                <p className="font-semibold text-base text-gray-900">{item.text}</p>
                <p className="mt-1 text-sm text-gray-500">{item.subtext}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;
