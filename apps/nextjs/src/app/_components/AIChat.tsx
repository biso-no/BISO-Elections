import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";

const schema = z.object({
  message: z.string().min(1, "Please enter a message"),
});

export function ChatWithAI() {
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const errors = formState.errors;

  const [messages, setMessages] = useState([
    {
      sender: "AI Assistant",
      time: "10:15 AM",
      text: "Hello! How can I assist you today?",
    },
    { sender: "You", time: "10:16 AM", text: "I need help with my order." },
    {
      sender: "AI Assistant",
      time: "10:17 AM",
      text: "Sure, I'd be happy to help. Could you please provide me with your order number?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (data: any) => {
    setMessages([
      ...messages,
      {
        sender: "You",
        time: new Date().toLocaleTimeString(),
        text: data.message,
      },
    ]);
    setInput("");
    reset();
  };

  return (
    <>
      <ScrollArea className="flex-1 space-y-4 p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-col gap-2 ${
              message.sender === "You"
                ? "items-end text-right"
                : "items-start text-left"
            }`}
          >
            <div className={`text-xs text-gray-500 dark:text-gray-400`}>
              {message.sender} • {message.time}
            </div>
            <div
              className={`max-w-[70%] rounded-lg ${
                message.sender === "You"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
              } px-3 py-2`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="border-t border-gray-200 p-4 dark:border-gray-800">
        <form
          onSubmit={handleSubmit(handleSend)}
          className="flex items-center space-x-2"
        >
          <Input
            className="flex-1"
            placeholder="Type your message..."
            {...register("message")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {errors.message && <p>{errors.root?.message}</p>}
          <Button type="submit">
            <SendIcon className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </>
  );
}

function SendIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
