import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortAddr(addr: string): string {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function crColor(cr: number): string {
  switch (true) {
    case cr < 20:
      return "text-red-500";
    case cr < 30:
      return "text-yellow-500";
    case cr < 40:
      return "text-green-500";
    default:
      return "text-green-500";
  }
}
