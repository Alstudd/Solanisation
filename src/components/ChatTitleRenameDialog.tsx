import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import LoadingButton from "./ui/loading-button";
import { Input } from "./ui/input";
import { useEffect } from 'react';

interface ChatTitleRenameDialogProps {
  id: string | null;
  chatTitle: string;
  setAllChats: (allChats: any) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ChatTitleRenameDialog({
  id,
  chatTitle,
  setAllChats,
  open,
  setOpen,
}: ChatTitleRenameDialogProps) {
  const form = useForm({
    defaultValues: {
      title: chatTitle,
    },
  });

  useEffect(() => {
    form.reset({ title: chatTitle });
  }, [chatTitle, form]);

  const handleRenameChat = async (input: { title: string }) => {
    await fetch("/api/chatApi", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title: input.title }),
    });
    setAllChats((prev: any) =>
      prev.map((chat: any) =>
        chat.id === id ? { ...chat, title: input.title } : chat
      )
    );
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-zinc-900 border-none text-white">
        <DialogHeader>
          <DialogTitle>Rename Chat Title</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRenameChat)}
            className="space-y-3"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chat title</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-zinc-800 text-white border-zinc-700 focus:border-violet-700 focus:ring-violet-700 my-4"
                      placeholder="Chat title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="gap-1 sm:gap-0">
              <LoadingButton
                className="border bg-violet-950 border-violet-700 hover:bg-violet-800 shadow-current shadow-sm"
                type="submit"
                loading={form.formState.isSubmitting}
              >
                Submit
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}