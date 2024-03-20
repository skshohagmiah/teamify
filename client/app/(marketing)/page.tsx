import Header from "./_components/header/Header";
import Hero from "./_components/hero/Hero";
import Features from "./_components/feature/Features";
import Footer from "./_components/footer/Footer";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import CreateOrganization from "@/components/modal/CreateOrganization";
import Head from "next/head";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const organization = await prisma.organization.findMany({
    where: {
      members: {
        some: {
          userId: currentUser?.id,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
    },
    take: 1,
  });

  if (!currentUser?.email) {
    return (
      <div>
        <Header />
        <Hero />
        <Features />
        <Footer />
      </div>
    );
  } else if (organization[0]?.id) {
    return redirect(`/${organization[0]?.id}`);
  } else {
    return <CreateOrganization />;
  }
}
