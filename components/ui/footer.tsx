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
        href="https://dyadstable.notion.site/dyadstable/DYAD-design-outline-v3-28b79ebd6acb42009ff5a751c3158781"
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
        href="https://x.com/0xDYAD"
        className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        X
      </Link>
      <Link
        href="https://github.com/DyadStablecoin"
        className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Github
      </Link>
    </footer>
  );
}
