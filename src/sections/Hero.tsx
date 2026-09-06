import Button from "@/components/Button";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-16"
    >
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text block — left-aligned */}
        <div className="flex flex-col gap-6">
          <h1 className="text-balance">
            I don&apos;t just write code.
            <br />
            <span className="text-copper">I engineer solutions.</span>
          </h1>

          <p className="text-fog text-lg max-w-lg leading-relaxed">
            AI &amp; Automation Engineer building intelligent platforms and
            automation systems that turn repetitive, frustrating work into
            software that simply gets things done.
          </p>

          <div>
            <Button href="#projects" variant="primary">
              Explore
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
