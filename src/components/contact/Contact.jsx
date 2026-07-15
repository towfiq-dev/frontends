"use client";
import React, { useState } from "react";
import LeftSideInfo from "./LeftSideInfo";
import RightSideInfo from "./RightSideInfo";
import RevealOnScroll from "../shared/revealOnScroll/RevealOnScroll";

// EmailJS credentials — public-safe values, loaded from environment
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID; 
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };

const ContactSection = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Sends the contact form via EmailJS. The SDK is dynamically imported so
  // it's only loaded when the user actually submits, keeping it out of the
  // initial page bundle.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const emailjs = (await import("@emailjs/browser")).default;

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: "towfiqulislam017399@gmail.com",
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setFormData(INITIAL_FORM); 
      setTimeout(() => setStatus("idle"), 4000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section className="bg-black text-white min-h-screen">
      {/* Header */}
      <RevealOnScroll>
      <div className="text-center pt-28 sm:pt-32 md:pt-36 pb-10 sm:pb-14 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-3">
          Get In Touch
        </h2>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg">
          Have a project in mind? Let's work together
        </p>
        <div className="w-16 h-1.5 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
      </div>
      </RevealOnScroll>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">

          {/* Left: Contact Info */}
          <LeftSideInfo/>

          {/* Right: Form */}
          <RightSideInfo 
          handleSubmit={handleSubmit} 
          handleChange={handleChange} 
          formData={formData} 
          status={status}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;