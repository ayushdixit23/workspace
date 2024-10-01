"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getData } from "./Useful";

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

//emitting function
export const socketemitfunc = async ({ event, data, socket }) => {
  console.log("Socket Connection:", socket?.connected);
  if (!socket?.connected) {
    socket?.connect();
    socket?.emit(event, data);
    setTimeout(() => {
      console.log("Reconnecting...", socket?.connected);
    }, 1000);
  } else {
    console.log("Connecting...");
    socket?.emit(event, data);
  }
};

//function for listening
export const socketonfunc = async ({ event, data }) => {
  if (!socket.connected) {
    socket.connect();
    socket.on(event, data);
    setTimeout(() => {
      console.log("Reconnecting...", socket.connected);
    }, 1000);
  } else {
    socket.emit(event, data);
  }
};

export const disconnectSocket = () => {
  socket.disconnect();
  console.log("Socket disconnected manually");
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { id } = getData();
  useEffect(() => {
    let newSocket;

    const url = "http://localhost:4400"
    // const url = "https://rooms.grovyo.xyz"

    newSocket = io(url, {
      auth: { id: id, type: "web" },
      reconnectionAttempts: 100,
      reconnectionDelay: 3000,
      reconnection: true,
      autoConnect: true,
      transports: ["websocket"],
    });

    setSocket(newSocket);

    console.log("Reconnecting...", newSocket.connected);

  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
