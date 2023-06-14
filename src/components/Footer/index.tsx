import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-0 lg:justify-between px-10 lg:px-20 bg-zinc-100 py-10 border-t border-gray-200">
      <div className="lg:border-none border-b border-gray-200 py-10">
        <p className="font-semibold pb-4">Support</p>
        <div className="sm:flex lg:flex sm:flex-col xl:flex-col gap-3 md:grid md:grid-cols-3">
          <p className="text-gray-600">Help Center</p>
          <p className="text-gray-600">AirCover</p>
          <p className="text-gray-600">Supporting people with disabilities</p>
          <p className="text-gray-600">Cancellation options</p>
          <p className="text-gray-600">Our COVID-19 Response</p>
          <p className="text-gray-600">Report a neighborhooh concern</p>
        </div>
      </div>
      <div className="lg:border-none border-b border-gray-200 py-10">
        <p className="font-semibold pb-4">Community</p>
        <div className="sm:flex lg:flex sm:flex-col xl:flex-col gap-3 md:grid md:grid-cols-3">
          <p className="text-gray-600">Airbnb.org: disaster relief housing</p>
          <p className="text-gray-600">Combating discrimination</p>
        </div>
      </div>
      <div className="lg:border-none border-b border-gray-200 py-10">
        <p className="font-semibold pb-4">Hosting</p>
        <div className="sm:flex lg:flex sm:flex-col xl:flex-col gap-3 md:grid md:grid-cols-3">
          <p className="text-gray-600">Airbnb your home</p>
          <p className="text-gray-600">AirCover for Hosts</p>
          <p className="text-gray-600">Explore hosting resources</p>
          <p className="text-gray-600">Visit our community forum</p>
          <p className="text-gray-600">How to host responsibly</p>
          <p className="text-gray-600">Airbmb-friendly apartments</p>
        </div>
      </div>
      <div className="py-10">
        <p className="font-semibold pb-4">Airbnb</p>
        <div className="sm:flex lg:flex sm:flex-col xl:flex-col gap-3 md:grid md:grid-cols-3">
          <p className="text-gray-600">Newsroom</p>
          <p className="text-gray-600">Learn about new features</p>
          <p className="text-gray-600">Letter from our founders</p>
          <p className="text-gray-600">Careers</p>
          <p className="text-gray-600">Investors</p>
          <p className="text-gray-600">Gift cards</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
