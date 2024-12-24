import { auth } from "@clerk/nextjs/server";
import { Bot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) redirect("/chat");

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-5">
      <div className="flex items-center gap-6">
        <Bot className="lg:w-24 lg:h-24 w-16 h-16" />
        <span className="text-4xl font-extrabold tracking-tight lg:text-5xl mt-2">
          Solanisation
        </span>
      </div>
      <p className="max-w-prose text-center px-8">
        Welcome to Solanisation, an advanced chatbot that can help you with anything Solana. Click the button below to start chatting.
      </p>
      <Link href="/sign-in">
        <button className="rounded-[10px] px-4 py-2 dark:bg-white dark:text-black bg-black text-white">
          Login
        </button>
      </Link>
    </main>
  );
}
