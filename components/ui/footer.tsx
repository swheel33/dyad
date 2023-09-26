import Link from "next/link";

import { cn } from "@/lib/utils";

export function Footer({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer
      className={cn("flex items-center space-x-4 lg:space-x-6 my-2", className)}
      {...props}
    >
      <Link
        href="https://dyadstable.notion.site/DYAD-full-52096aed265247e7a50b14f06c228a7e?pvs=4"
        className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Docs
      </Link>
      <Link
        href="https://discord.gg/z3wdvqM3kt"
        className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Discord
      </Link>
      <Link
        href="https://twitter.com/0xDYAD"
        className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Twitter
      </Link>
    </footer>
  );
}
