import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="https://dyadstablecoin.github.io/claim-frontend/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        DYAD
      </Link>
      <Link
        href="https://dyadstable.notion.site/DYAD-full-52096aed265247e7a50b14f06c228a7e?pvs=4"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Docs
      </Link>
      <Link
        href="https://discord.gg/z3wdvqM3kt"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Discord
      </Link>
      <Link
        href="https://twitter.com/0xDYAD"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Twitter
      </Link>
    </nav>
  )
}
