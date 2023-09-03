import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

//template_snvbgso
//service_0uqdqle
//RryGNRclgd4btszQm

const Contact = () => {
  const formRef = useRef();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      "service_0uqdqle",
      "template_snvbgso",
      {
        from_name: form.name,
        to_name: "Krish",
        from_email: form.email,
        to_email: "krishdave011@gmail.com",
        message: form.message,
      },
      "RryGNRclgd4btszQm"
    )
    .then(() => {
      setLoading(false);
      alert("Thank you for your message. I'll get back to you soon!");
      setForm({
        name: "",
        email: "",
        message: "",
      })
    }, (error) => {
      setLoading(false);
      alert("Something went wrong. Please try again!");
    })
  };

  return (
    <div className="flex-row xl-mt-12 xl-flex-row flex-col-reverse flex gap-10 overflow-hidden contact-box">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="bg-black-100 p-8 rounded-2xl custom-contact-form"
      >
        <p className="section-sub-text">Get in Touch</p>
        <h3 className="section-head-text">Contact</h3>

        <form ref={formRef} onSubmit={handleSubmit} className="custom-form mt-12 flex flex-col gap-8">
          <label className="flex flex-col custom-label">
            <span className="custom-label-text">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="what's your name?"
              className="custom-input"
            />
          </label>
          <label className="flex flex-col custom-label">
            <span className="custom-label-text">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="what's your email?"
              className="custom-input"
            />
          </label>
          <label className="flex flex-col custom-label">
            <span className="custom-label-text">Your Message</span>
            <textarea
              rows="7"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="what do you want to say?"
              className="custom-input"
            />
          </label>
          <button
            type="submit"
            className="custom-button"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div variants={slideIn("right", "tween", 0.2, 1)} className="xl-flex-1 xl-h-auto md-h-[550px] h-[350px] custom-earth-canvas">
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
