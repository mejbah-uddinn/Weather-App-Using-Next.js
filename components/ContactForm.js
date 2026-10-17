"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Please enter a valid email address.";
    if (form.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length === 0) {
      // Demo only: no backend. Replace with a real API call if needed.
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    }
  }

  const input = "mt-1 w-full rounded-lg border border-sky-mist bg-white px-4 py-3";

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
      {sent && (
        <p className="rounded-lg bg-green-50 p-4 text-green-800" role="status">
          Message sent. Thanks for getting in touch!
        </p>
      )}

      <div>
        <label htmlFor="name" className="font-medium">Name</label>
        <input id="name" name="name" value={form.name} onChange={handleChange} className={input} />
        {errors.name && <p className="mt-1 text-sm text-red-700">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="font-medium">Email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className={input} />
        {errors.email && <p className="mt-1 text-sm text-red-700">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="font-medium">Message</label>
        <textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange} className={input} />
        {errors.message && <p className="mt-1 text-sm text-red-700">{errors.message}</p>}
      </div>

      <button type="submit" className="rounded-lg bg-sky-deep px-6 py-3 font-medium text-white hover:bg-sky-mid">
        Send message
      </button>
    </form>
  );
}
