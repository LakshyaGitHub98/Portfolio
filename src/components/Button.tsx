interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
}

export default function Button({
  children,
  variant = "primary",
  href,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded transition-colors duration-200";

  const variants = {
    primary: "bg-copper text-void hover:bg-copper/80",
    secondary:
      "border border-steel text-bone hover:border-copper hover:text-copper",
  };

  const classes = `${base} ${variants[variant]}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return <button className={classes}>{children}</button>;
}
