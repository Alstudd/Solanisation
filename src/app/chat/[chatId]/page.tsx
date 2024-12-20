import MainWrapper from "@/components/MainWrapper";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { ragChat } from "@/lib/rag-chat";

type Props = {
  params: {
    chatId: string;
  };
};

const Page = async ({ params }: Props) => {
  const { chatId } = await params;
  const { userId } = await auth();
  if (!userId) redirect("/");
  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
    include: { messages: true },
  });
  if (!chat) {
    return redirect("/chat");
  }

  const sessionId = userId + "--" + chatId;
  const initialMessages = await ragChat.history.getMessages({ amount: 10000, sessionId });

  return (
    <div className="h-screen dark text-foreground bg-background">
      <MainWrapper chat={chat} initialMessages={initialMessages} />
    </div>
  );
};

export default Page;
