"use client";

import { useChat } from "ai/react";
import { useEffect, useRef } from "react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./mode-toggle";
import { Ban, Bot, Loader, SendHorizontalIcon, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Chat() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className="relative w-full max-w-lg p-2 mx-auto border rounded-md">
      <ModeToggle className={"absolute right-4 top-4"} />

      <ScrollArea className="mb-2 h-[400px]" ref={scrollRef}>
        {messages.map((m) => {
          const isUser = m.role === "user";
          const isBot = m.role === "assistant";

          return (
            <div key={m.id} className="whitespace-pre-wrap">
              <div className="flex gap-2 mb-4">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback
                    className={`text-xs ${cn(isBot && "bg-primary")}`}
                  >
                    {isUser ? <User /> : <Bot />}
                  </AvatarFallback>
                </Avatar>
                <div className={`mt-1.5`}>
                  <div className={`mt-1.5 text-sm`}>
                    <span className={`font-semibold`}>
                      {isUser ? "User: " : "AI: "}
                    </span>

                    <span className={`text-muted-foreground`}>
                      {m.content.trim()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </ScrollArea>

      <form onSubmit={handleSubmit} className="relative">
        <Input
          value={input}
          onChange={handleInputChange}
          type="search"
          placeholder={!isLoading ? "Say something..." : ""}
          disabled={isLoading}
          className="pr-10 placeholder:italic"
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          variant={"default"}
          size={"icon"}
          className="absolute top-0 right-0 transition rounded-l-none rounded-r-md"
        >
          {isLoading && <Loader className="animate-spin" />}
          {!isLoading && !input.trim() && <Ban />}
          {!isLoading && input.trim() && <SendHorizontalIcon />}
        </Button>
      </form>
    </div>
  );
}
