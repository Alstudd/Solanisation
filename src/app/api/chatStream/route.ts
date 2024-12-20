import { ragChat } from "@/lib/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const POST = async (req: NextRequest) => {
  try {
    const { messages, chatId } = await req.json();
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!chatId) {
      const newChat = await prisma.chat.create({
        data: {
          title: "New Chat",
          userId,
        },
      });
      const lastMessage = messages[messages.length - 1]
      console.log("lastMessage", lastMessage);
      await prisma.message.create({
        data: {
          role: "user",
          content: lastMessage,
          chatId: newChat.id,
        },
      })
      const response = await ragChat.chat(lastMessage, {
        sessionId: userId + "--" + newChat.id,
      });
      console.log("response", response);
      await prisma.message.create({
        data: {
          role: "ai",
          content: response.output,
          chatId: newChat.id,
        },
      })
      const redirectUrl = `/chat/${newChat.id}`;
      return NextResponse.json({ redirectUrl }, { status: 200 });
    } else {
      const lastMessage = messages[messages.length - 1].content;
      console.log("lastMessage", lastMessage);
      await prisma.message.create({
        data: {
          role: "user",
          content: lastMessage,
          chatId,
        },
      })
      const response = await ragChat.chat(lastMessage);
      console.log("response", response);
      await prisma.message.create({
        data: {
          role: "ai",
          content: response.output,
          chatId,
        },
      })
      const streamResponse = await ragChat.chat(lastMessage, {
        streaming: true,
        sessionId: userId + "--" + chatId,
      });
      return aiUseChatAdapter(streamResponse);
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
