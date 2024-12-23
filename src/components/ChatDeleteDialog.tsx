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
import { useRouter, usePathname } from "next/navigation";

interface ChatDeleteDialogProps {
  id: string | null;
  setAllChats: (allChats: any) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ChatDeleteDialog({
  id,
  setAllChats,
  open,
  setOpen,
}: ChatDeleteDialogProps) {
  const form = useForm();
  const router = useRouter();
  const pathname = usePathname();

  const handleDeleteChat = async () => {
    await fetch("/api/chatApi", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setAllChats((prev: any) => prev.filter((chat: any) => chat.id !== id));
    if (pathname === `/chat/${id}`) {
      router.push("/chat");
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-zinc-900 border-none text-white">
        <DialogHeader>
          <DialogTitle>Delete Chat</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleDeleteChat)}
            className="space-y-3"
          >
            Are you sure you want to delete this chat?
            <DialogFooter className="gap-1 sm:gap-0">
              <LoadingButton
                className="shadow-current shadow-sm"
                variant="destructive"
                type="submit"
                loading={form.formState.isSubmitting}
              >
                Delete
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
