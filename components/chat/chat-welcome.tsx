"use client";

import { Hash } from "lucide-react";

interface ChatWelcomeProps {
  name: string;
  type: "channel" | "conversation";
}

export const ChatWelcome = ({ name, type }: ChatWelcomeProps) => {
  return (
    <div className="space-y-2 px-4 mb-4">
      {type === "channel" && (
        <div className=" h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
          <Hash className="h-12 w-12 text-white" />
        </div>
      )}
      <div className="text-xl md:text-3xl font-bold">
        {type === "channel" ? (
          <div>
            Welcome to
            <span className="text-indigo-500"> #{name}</span>
          </div>
        ) : (
          `Start chatting with ${name}`
        )}
      </div>
      <div className="text-zinc-600 dark:text-zinc-400 text-sm">
        {type === "channel" ? (
          <div>
            This is the beginning of the
            <span className="text-indigo-500"> #{name} </span>
            channel.
          </div>
        ) : (
          `This is the beginning of your conversation with ${name}`
        )}
      </div>
    </div>
  );
};
