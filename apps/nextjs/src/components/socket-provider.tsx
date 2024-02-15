"use client";

import type { Socket } from "socket.io-client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export function useSocket() {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socket;
}

interface SocketProviderProps {
  url: string;
  options?: Parameters<typeof io>[1];
  children: React.ReactNode;
}

export function SocketProvider({
  url,
  options,
  children,
}: SocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(url, options);
    setSocket(newSocket);
    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, [url, options]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
