"use client";

import { useChat } from "ai/react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function MyComponent() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  return (
    <div className="flex flex-col p-4 border rounded-md">
      <ScrollArea className="w-[300px] mb-4 h-[400px] sm:w-96">
        {messages.map((m, index) => (
          <div key={index} className="py-2 text-sm border-b">
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
        ))}
      </ScrollArea>

      <form onSubmit={handleSubmit} className="flex gap-x-1">
        <Input
          value={input}
          onChange={handleInputChange}
          type="search"
          placeholder="Ask something..."
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          variant={"default"}
          size={"default"}
        >
          {isLoading ? <ReloadIcon className="animate-spin" /> : "Send"}
        </Button>
      </form>
    </div>
  );
}
