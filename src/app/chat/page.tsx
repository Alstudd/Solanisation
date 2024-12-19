import MainWrapper from "@/components/MainWrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const Page = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/");
  const sessionId = "8c9e9625-f495-48eb-85dd-4aea54243db4";
  // const sessionId = String((await cookies()).get("sessionId")?.value);
  // const url = "https://solana.com/docs/rpc/http/gettokenaccountbalance";
  // const isSolanaDocsUrlAlreadyIndexed = await redis.sismember(
  //   "indexed-urls",
  //   url
  // );
  const initialMessages = await ragChat.history.getMessages({
    amount: 100,
    sessionId,
  });

  // if (!isSolanaDocsUrlAlreadyIndexed) {
  //   await ragChat.context.add({
  //     type: "html",
  //     source: url,
  //     // config: { chunkOverlap: 50, chunkSize: 200 },
  //   });
  //   await redis.sadd("indexed-urls", url);
  // }
  return (
    <div className="h-screen dark text-foreground bg-background">
      <MainWrapper sessionId={sessionId} initialMessages={initialMessages} />
    </div>
  );
};

export default Page;