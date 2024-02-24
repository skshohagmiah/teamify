"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Organization } from "@prisma/client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useParams } from "next/navigation";
import Image from "next/image";
import CreateOrganization from "@/components/modal/CreateOrganization";
import OrgModalDialog from "@/components/modal/OrgModalDialog";
import { useRouter } from "next/navigation";

interface SlectOrgProps {
  organizations: Organization[];
}

export function SelectOrg({ organizations }: SlectOrgProps) {
  const { orgId } = useParams();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(orgId);
  const selectedValue = {
    image: "",
    name: "",
  };

  const allOrganization = organizations.map((org) => ({
    label: org.name,
    image: org.logo,
    value: org.id,
  }));

  allOrganization.forEach((org) => {
    if (org.value === value) {
      (selectedValue.image = org.image!), (selectedValue.name = org.label);
    }
  });


  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] md:w-[300px] justify-between"
          >
            {value ? (
              <div className="flex items-center gap-2">
                {selectedValue.image && (
                  <Image
                  src={selectedValue.image}
                  alt=""
                  width={30}
                  height={30}
                />
                )}
                {selectedValue.name}
              </div>
            ) : (
              "Select org..."
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] md:w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search org..." />
            <CommandEmpty>No org found.</CommandEmpty>
            <CommandGroup>
              {allOrganization.map((org) => (
                <CommandItem
                  key={org.value}
                  value={org.value}
                  onSelect={(currentValue: string) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    router.push(`/${org.value}`);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === org.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {org.image && (
                    <Image
                      className="mr-2"
                      src={org?.image || ""}
                      alt="org logo"
                      width={30}
                      height={30}
                    />
                  )}
                  {org.label}
                </CommandItem>
              ))}
              <div className="my-2 flex justify-end">
                <OrgModalDialog />
              </div>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
