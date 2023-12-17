import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortAddr(addr: string): string {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function crColor(cr: number, max: number): string {
  try {
    switch (true) {
      case cr / max < 0.4:
        return "text-red-500";
      case cr / max < 0.7:
        return "text-yellow-500";
      case cr / max < 1:
        return "text-green-500";
      default:
        return "text-green-500";
    }
  } catch (error) {
    return "text-green-500";
  }
}
