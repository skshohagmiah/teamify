import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const MemberInvitePage = async ({
  params,
  searchParams,
}: {
  params: { orgId: string; projectId: string };
  searchParams: { token: string };
}) => {
  const { orgId, projectId } = params;
  const { token } = searchParams;
  const currentUser = await getCurrentUser();

  const dbToken = await prisma.inviteToken.findFirst({
    where: {
      token: token,
    },
  });

  if (!dbToken) {
    return (
      <div className="absolute inset-0 bg-white z-50 flex items-center justify-center flex-col gap-4 text-xl">
        <p>No valid token is found!</p>
      </div>
    );
  }

  const fiveMinutesLater = new Date(dbToken?.createdAt.getTime() + 300000);

  if (fiveMinutesLater.getTime() > Date.now()) {
    await prisma.member.create({
      data: {
        orgId: orgId,
        projectId: projectId,
        userId: currentUser?.id as string,
      },
    });

    redirect(`/${orgId}/${projectId}`);
  }

  return (
    <div className="absolute inset-0 bg-white z-50 flex items-center justify-center flex-col gap-4 text-xl">
      <p>This token is not valid, try again with a valid token</p>
    </div>
  );
};

export default MemberInvitePage;
