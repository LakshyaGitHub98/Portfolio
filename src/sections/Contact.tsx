"use client";

import CallButton from "@/components/CallButton";
import ContactForm from "@/components/ContactForm";
import ResumeExport from "@/components/ResumeExport";

export default function Contact() {
  const onLockOn = () => {
    window.dispatchEvent(new CustomEvent("core-lock-on"));
  };
  const onLockOff = () => {
    window.dispatchEvent(new CustomEvent("core-lock-off"));
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2>Contact</h2>

        <p className="mt-6 text-fog text-lg leading-relaxed max-w-lg">
          System ready. Have something repetitive, frustrating or inefficient?
          Let&apos;s engineer a better way.
        </p>

        <div
          onMouseEnter={onLockOn}
          onMouseLeave={onLockOff}
          onFocus={onLockOn}
          onBlur={onLockOff}
        >
          <ContactForm />
        </div>

        <div className="mt-10">
          <CallButton />
        </div>

        <ResumeExport />

        <p className="mt-16 font-mono text-sm text-fog">
          Build. Automate. Iterate.
        </p>
      </div>
    </section>
  );
}
