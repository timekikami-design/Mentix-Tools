"use client";
import { useState } from "react";
import { Input, Textarea, Button, Toast } from "./ui";
import { contactEmail } from "@/lib/site";
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const subject = encodeURIComponent(
          `Mentix Tools — message from ${name}`,
        );
        const body = encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\n\n${message}`,
        );
        window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
        setStatus(
          "Your email app should open. Nothing has been sent yet; review and send the message there.",
        );
      }}
    >
      <Input
        label="Your name"
        name="name"
        autoComplete="name"
        required
        maxLength={100}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        label="Your email"
        name="email"
        type="email"
        autoComplete="email"
        required
        maxLength={254}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Textarea
        label="What can we help with?"
        name="message"
        required
        maxLength={3000}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit">Open email app ↗</Button>
      <Toast message={status} />
    </form>
  );
}
