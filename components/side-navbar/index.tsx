"use client";

import { ChatItem } from "@/components/side-navbar/chat-item";
import { UserSettings } from "@/components/side-navbar/user-settings";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { SidebarIcon, SquarePenIcon } from "lucide-react";
import { useState } from "react";

export const SideNavBar = () => {
  const [open, setOpen] = useState(false);

  if (open) {
    return (
      <div className="h-screen max-h-screen overflow-hidden flex flex-col gap-4 justify-between px-2 py-2 pb-4 bg-slate-50 w-[200px]">
        <div className="flex flex-col gap-2">
          <span className="text-lg font-semibold text-center">
            Open Artifacts
          </span>

          <div className="flex items-center justify-between gap-2">
            <Button onClick={() => setOpen(false)} size="icon" variant="ghost">
              <SidebarIcon className="w-4 h-4" />
            </Button>

            <Button size="icon" variant="ghost">
              <SquarePenIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-2 overflow-hidden">
          <span className="font-medium">Chats</span>
          <div className="flex flex-col flex-1 gap-2 overflow-auto">
            {generateChats(20).map((item, index) => (
              <ChatItem
                key={index}
                title={item.title}
                selected={item.selected}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-2">
          <UserSettings showLabel />

          <UserButton
            showName
            appearance={{
              elements: {
                userButtonBox: {
                  flexDirection: "row-reverse",
                },
                userButtonOuterIdentifier: {
                  fontSize: "14px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                },
                userButtonTrigger: {
                  padding: "0 4px",
                },
                avatarBox: {
                  width: "24px",
                  height: "24px",
                },
              },
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen max-h-screen flex flex-col gap-2 justify-between px-2 py-2 pb-4 items-center">
      <div className="flex flex-col gap-2">
        <span className="text-lg font-semibold text-center">OA</span>
        <div className="flex items-center gap-2">
          <Button onClick={() => setOpen(true)} size="icon" variant="ghost">
            <SidebarIcon className="w-4 h-4" />
          </Button>

          <Button size="icon" variant="ghost">
            <SquarePenIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <UserSettings />
        <UserButton
          appearance={{
            elements: {
              avatarBox: {
                width: "24px",
                height: "24px",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

const generateChats = (count: number) =>
  Array.from({ length: count }).map((_, index) => ({
    selected: index === 0,
    title: `${index} Blalalalalallalalalallabbababababab`,
  }));
