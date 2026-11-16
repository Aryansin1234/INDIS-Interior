"use client";

import { FormEvent, useMemo, useState } from "react";
import { Send } from "lucide-react";
import { business, services } from "@/data/site";

type FormState = {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  propertyType: string;
  location: string;
  budget: string;
  requirements: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  projectType: "Full Home Interiors",
  propertyType: "Apartment",
  location: "",
  budget: "",
  requirements: ""
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [notice, setNotice] = useState("");

  const message = useMemo(() => {
    return encodeURIComponent([
      "New INDIS Interiors enquiry",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Project type: ${form.projectType}`,
      `Property type: ${form.propertyType}`,
      `Location: ${form.location}`,
      `Approx. budget: ${form.budget}`,
      `Requirements: ${form.requirements}`
    ].join("\n"));
  }, [form]);

  function update(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function openEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(`${business.emailHref}?subject=Interior design enquiry&body=${message}`, "_self");
    setNotice("Email draft opened. The enquiry is sent only after you confirm it in your email app.");
  }

  function openWhatsApp() {
    window.open(`${business.whatsappHref}?text=${message}`, "_blank", "noreferrer");
    setNotice("WhatsApp draft opened. The enquiry is sent only after you confirm it in WhatsApp.");
  }

  return (
    <form className="contact-form" onSubmit={openEmail}>
      <div className="form-grid">
        <label>
          <span>Name</span>
          <input value={form.name} onChange={(event) => update("name", event.target.value)} required autoComplete="name" />
        </label>
        <label>
          <span>Phone number</span>
          <input value={form.phone} onChange={(event) => update("phone", event.target.value)} required autoComplete="tel" inputMode="tel" />
        </label>
        <label>
          <span>Email</span>
          <input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} autoComplete="email" />
        </label>
        <label>
          <span>Project type</span>
          <select value={form.projectType} onChange={(event) => update("projectType", event.target.value)}>
            {services.map((service) => (
              <option key={service.slug}>{service.title}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Property type</span>
          <select value={form.propertyType} onChange={(event) => update("propertyType", event.target.value)}>
            <option>Apartment</option>
            <option>Villa</option>
            <option>Independent house</option>
            <option>Renovation</option>
            <option>Other</option>
          </select>
        </label>
        <label>
          <span>Location</span>
          <input value={form.location} onChange={(event) => update("location", event.target.value)} autoComplete="address-level2" />
        </label>
        <label>
          <span>Approximate budget</span>
          <input value={form.budget} onChange={(event) => update("budget", event.target.value)} placeholder="Optional" />
        </label>
        <label className="form-grid__wide">
          <span>Additional requirements</span>
          <textarea value={form.requirements} onChange={(event) => update("requirements", event.target.value)} rows={5} />
        </label>
      </div>
      <div className="contact-form__actions">
        <button className="btn btn-primary" type="submit">
          Open email draft <Send size={16} aria-hidden />
        </button>
        <button className="btn btn-secondary" type="button" onClick={openWhatsApp}>
          Send on WhatsApp
        </button>
      </div>
      <p className="contact-form__note">No backend endpoint is configured. This form prepares an email or WhatsApp draft instead of claiming a completed submission.</p>
      {notice ? <p className="contact-form__notice" role="status">{notice}</p> : null}
    </form>
  );
}
