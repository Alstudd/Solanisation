import NewChatMainWrapper from "@/components/NewChatMainWrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const Page = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/");
  // const url = "https://solana.com/docs/rpc/http/gettokenaccountbalance";
  // const isSolanaDocsUrlAlreadyIndexed = await redis.sismember(
  //   "indexed-urls",
  //   url
  // );

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
      <NewChatMainWrapper />
    </div>
  );
};

export default Page;
