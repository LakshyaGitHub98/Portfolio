"use client";

import Button from "@/components/Button";
import CallButton from "@/components/CallButton";

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2>Contact</h2>

        <p className="mt-6 text-fog text-lg leading-relaxed max-w-lg">
          System ready. Have something repetitive, frustrating or inefficient?
          Let&apos;s engineer a better way.
        </p>

        <form
          className="mt-10 max-w-lg space-y-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm text-fog mb-1 font-mono"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full bg-void border border-steel rounded px-4 py-2.5 text-bone text-sm focus:outline-none focus:border-copper transition-colors duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm text-fog mb-1 font-mono"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full bg-void border border-steel rounded px-4 py-2.5 text-bone text-sm focus:outline-none focus:border-copper transition-colors duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm text-fog mb-1 font-mono"
            >
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

          <Button variant="primary">Send</Button>
        </form>

        <div className="mt-10">
          <CallButton />
        </div>

        <p className="mt-16 font-mono text-sm text-fog">
          Build. Automate. Iterate.
        </p>
      </div>
    </section>
  );
}
