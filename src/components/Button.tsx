interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({ children, variant = "primary" }: ButtonProps) {
  return (
    <button className={variant === "primary" ? "bg-copper text-void" : "border border-steel text-bone"}>
      {children}
    </button>
  );
}
