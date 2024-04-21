'use client';
import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { contactShapeOne, contactShapeTwo } from '../../../../public';

export default function S_contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // BACKEND HERE
    console.log('Form data :', formData);
  };

  const handleCancel = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <div
      className="h-screen relative px-[10%] py-[5%] bg-gradient-home"
      id="contact">
      <form onSubmit={handleSubmit} className=" xl:w-[50%] mx-auto mt-[8%]">
        <div className="mb-5">
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name*"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-3 py-4 border focus:outline-none focus:border-black/50 rounded-[15px] text-black placeholder-black text-[14px]"
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name*"
            value={formData.lastName}
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
        <div className="mb-5">
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone*"
            value={formData.phone}
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
            rows={4}></textarea>
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
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-4 bg-white text-black hover:border-black/50 border rounded-[15px] w-full">
            Cancel
          </button>
          <div className="relative w-full">
            <button
              type="submit"
              className="z-10 relative px-4 py-4 bg-white/[.44] border-[1px] border-solid border-white backdrop-blur-lg text-white focus:outline-none hover:border-black/30 rounded-[15px] w-full">
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
        </div>
      </form>
    </div>
  );
}
