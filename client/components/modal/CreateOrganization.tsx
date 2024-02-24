"use client";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UploadDropzone } from "@/lib/uploadthing";
import { createOrganization } from "@/actions/organization/createOrg";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateOrganization = () => {
  const [loading, setLoading] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await createOrganization(orgName, fileUrl);
      if (res.ok) {
        toast("organization created successfully");
        router.replace(`/${res.data?.id}`);
        setLoading(false);
      }
    } catch (error) {
      console.log("organization creation error", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-8 rounded-md  shadow-md">
        <div className="my-4">
        <h2 className=" text-xl font-semibold">
          Create An Organization
        </h2>
        <p className="text-sm font-light">
          Organization is required to create projects and more
        </p>

        </div>
        <form className="my-8 space-y-4" onSubmit={handleFormSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Organization Name:</Label>
            <Input
            required
              onChange={(e) => setOrgName(e.target.value)}
              name="name"
              id="name"
              placeholder="org name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logo">Organization Logo (optional)</Label>
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setFileUrl(res[0].url);
              }}
              className="w-full p-6"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrganization;
