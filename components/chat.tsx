"use client";

import { useChat } from "ai/react";
import { useEffect, useRef } from "react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./mode-toggle";
import { Ban, Loader, SendHorizontalIcon, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { OpenaiLogo } from "./openai-logo";
import { OpenaiIcon } from "./openai-icon";

export default function Chat() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  return (
    <>
      <div className="sticky top-0 left-0 z-10 flex flex-col items-center w-full px-4 py-6 mx-auto border-b shadow gap-y-4 bg-background">
        <div className="flex items-center justify-between w-full max-w-xl">
          <OpenaiLogo
            className={"w-full max-w-28 sm:max-w-36 dark:fill-primary"}
          />
          <ModeToggle />
        </div>

        <form onSubmit={handleSubmit} className="relative flex w-full max-w-xl">
          <Input
            value={input}
            onChange={handleInputChange}
            type="search"
            placeholder={!isLoading ? "Say something..." : ""}
            disabled={isLoading}
            className="pr-16 placeholder:italic"
          />
          <Button
            size={"default"}
            variant={"default"}
            type="submit"
            disabled={isLoading || !input.trim() || input.trim().length < 2}
            className="absolute top-0 right-0 transition rounded-l-none"
          >
            {isLoading && <Loader className="animate-spin" />}
            {!isLoading && (!input.trim() || input.trim().length < 2) && (
              <Ban />
            )}
            {!isLoading && input.trim().length > 1 && <SendHorizontalIcon />}
          </Button>
        </form>
      </div>

      <ScrollArea
        className="h-[80vh] w-full max-w-xl flex sm:border sm:border-t-0 mx-auto rounded-b-md sm:shadow-md"
        ref={scrollRef}
      >
        {messages.map((m) => {
          const isUser = m.role === "user";

          return (
            <div key={m.id} className="whitespace-pre-wrap">
              <div
                className={cn("flex gap-2 px-4 py-3", {
                  "dark:bg-muted/25 bg-muted/50": !isUser,
                })}
              >
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback
                    title={isUser ? "User" : "OpenAI"}
                    className={cn("", !isUser && "bg-primary")}
                  >
                    {isUser ? (
                      <User />
                    ) : (
                      <OpenaiIcon className="w-6 h-6 fill-background" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className={`mt-2.5 text-sm sm:text-base`}>
                    <span className={`font-semibold`}>
                      {isUser ? "User" : "AI"}
                      {": "}
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
    </>
  );
}
