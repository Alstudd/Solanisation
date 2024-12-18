import MainWrapper from "@/components/MainWrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";

const Page = async () => {
  const sessionId = String((await cookies()).get("sessionId")?.value);
  // const isSolanaDocsUrlAlreadyIndexed = await redis.sismember(
  //   "indexed-urls",
  //   "https://solana.com/docs"
  // );
  const initialMessages = await ragChat.history.getMessages({
    amount: 10,
    sessionId,
  });

  // if (!isSolanaDocsUrlAlreadyIndexed) {
  //   await ragChat.context.add({
  //     type: "html",
  //     source: "https://solana.com/docs",
  //     // config: { chunkOverlap: 50, chunkSize: 200 },
  //   });
  //   await redis.sadd("indexed-urls", "https://solana.com/docs");
  // }
  return (
    <MainWrapper sessionId={sessionId} initialMessages={initialMessages} />
  );
};

export default Page;
