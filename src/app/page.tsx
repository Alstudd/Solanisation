import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) redirect("/chat");

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-5">
      <div className="flex items-center gap-4">
        <Image src="/file.svg" alt="Logo" width={100} height={100} />
        <span className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Solana GPT
        </span>
      </div>
      <p className="max-w-prose text-center">
        Welcome to Solana GPT, a chatbot that can help you with Solana-related
        questions. Click the button below to start chatting.
      </p>
      <Link href="/sign-in">
        <button className="bg-black rounded-md text-white px-4 py-2">
          Login
        </button>
      </Link>
    </main>
  );
}
