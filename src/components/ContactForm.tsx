"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Button from "@/components/Button";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_REPLY_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("sent");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="mt-10 max-w-lg space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm text-fog mb-1 font-mono">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="from_name"
          required
          className="w-full bg-void border border-steel rounded px-4 py-2.5 text-bone text-sm focus:outline-none focus:border-copper transition-colors duration-200"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-fog mb-1 font-mono">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="from_email"
          required
          className="w-full bg-void border border-steel rounded px-4 py-2.5 text-bone text-sm focus:outline-none focus:border-copper transition-colors duration-200"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm text-fog mb-1 font-mono">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full bg-void border border-steel rounded px-4 py-2.5 text-bone text-sm focus:outline-none focus:border-copper transition-colors duration-200 resize-none"
        />
      </div>
      <Button variant="primary">
        {status === "sending" ? "Sending..." : "Send"}
      </Button>
      {status === "sent" && <p className="text-sm text-copper">Message sent!</p>}
      {status === "error" && <p className="text-sm text-ember">Something went wrong. Try again.</p>}
    </form>
  );
}
