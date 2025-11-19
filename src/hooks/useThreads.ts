import { ThreadContext } from "@/context/ThreadContext";
import { useContext } from "react";

export const useThreads = () => {
  const context = useContext(ThreadContext);
  if (!context) {
    throw new Error("tidak ada context thread atau provider");
  }
  return context;
};
