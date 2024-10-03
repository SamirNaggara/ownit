"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { contactShapeOne, contactShapeTwo } from "../../../../public";

export default function S_contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmited, setIsSubmited] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmited(true);
    setErrorMessage(""); // Réinitialiser les messages
    setSuccessMessage("");

    try {
      const res = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 200) {
        setSuccessMessage(
          "Thank you for your interrest ! We will get back to you shortly."
        );
        setFormData({ name: "", email: "", message: "" }); // Réinitialiser le formulaire
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to send email.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("There was a technical issue. Please try again later.");
    }
  };

  return (
    <div className="relative px-[10%] py-[5%] bg-gradient-home" id="contact">
      <form onSubmit={handleSubmit} className=" xl:w-[50%] mx-auto mt-[8%]">
        <div className="mb-5">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="First Name*"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-4 border focus:outline-none focus:border-black/50 rounded-[15px] text-black placeholder-black text-[14px]"
          />
        </div>
        <div className="mb-5">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-4 border focus:outline-none focus:border-black/50 rounded-[15px] text-black placeholder-black text-[14px]"
          />
        </div>
        <div className="relative mb-5">
          <textarea
            id="message"
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-3 py-4 border focus:outline-none focus:border-black/50 rounded-[15px] text-black placeholder-black text-[14px]"
            rows={4}
          ></textarea>
          <Image
            src={contactShapeOne}
            alt="shape one"
            className="absolute bottom-0 right-0 z-[-1]"
          />
          <Image
            src={contactShapeTwo}
            alt="shape two"
            className="absolute top-0 left-0 z-[-1]"
          />
        </div>
        <div className="flex justify-center gap-8 relative flex-wrap">
          <div className="relative w-full">
            <button
              type="submit"
              className="z-10 relative px-4 py-4 bg-white/[.44] border-[1px] border-solid border-white backdrop-blur-lg text-white focus:outline-none hover:border-black/30 rounded-[15px] w-full"
            >
              Confirm
            </button>
            <div className="absolute inset-0 z-0">
              <Image
                src={contactShapeOne}
                alt="shape one"
                className="absolute w-[80%] h-[80%] top-2 left-6"
              />
              <Image
                src={contactShapeTwo}
                alt="shape two"
                className="absolute bottom-0 right-1"
              />
            </div>
          </div>
          {isSubmited && (
            <>
              {successMessage && (
                <p className="text-[green] text-xl">{successMessage}</p>
              )}
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </>
          )}
        </div>
      </form>
    </div>
  );
}
