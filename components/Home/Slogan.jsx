import React from "react";

const Slogan = () => {
  return (
    <section className="relative bg-[url('/sloganBG.jpg')] bg-cover bg-center rounded-3xl h-72 flex justify-center items-center text-white text-2xl font-bold text-center">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-primary-700/45 rounded-3xl"></div>

      {/* Text Content */}
      <h2 className="relative text-4xl md:mx-24 p-2 leading-12 font-hind-siliguri">
        লাখ টাকা আয়ের স্বপ্ন বিভোর না হয়ে স্কিল ডেভেলপ করে নিজের স্বপ্ন সত্যি
        করুন
      </h2>
    </section>
  );
};

export default Slogan;
