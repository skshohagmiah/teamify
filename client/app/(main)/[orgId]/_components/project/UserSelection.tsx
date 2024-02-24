"use client";
import React from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

const UserSelection = () => {
  return (
    <div>
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandList>
      </Command>
    </div>
  );
};

export default UserSelection;
