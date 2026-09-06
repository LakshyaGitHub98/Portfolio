"use client";

export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} color="#EDEDEF" />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#BF5B2E" decay={2} distance={12} />
      <pointLight position={[-3, -2, 4]} intensity={0.3} color="#E8541D" decay={2} distance={10} />
    </>
  );
}
