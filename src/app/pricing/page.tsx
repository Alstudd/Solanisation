import Pricing from "@/components/Pricing";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const PricingPage = async () => {
  const { userId } = await auth();

  if (!userId) redirect("/");
  return (
    <>
      <Pricing />
    </>
  );
};

export default PricingPage;
