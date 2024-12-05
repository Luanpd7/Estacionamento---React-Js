"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      router.replace("/login"); // Redireciona para /login
    }
  }, [router]);

  return <div>Redirecionando para login...</div>;
}
