import "./globals.css";
import { Inter } from "next/font/google";

import { headers } from "next/headers";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/ui/footer";
import { MainNav } from "@/components/ui/main-nav";
import MobileNotSupported from "@/components/ui/MobileNotSupported";
import { cookieToInitialState } from "wagmi";
import { wagmiConfig } from "@/lib/config";
import { Providers } from "./providers";
import { TransactionModal } from "@/components/reusable/TransactionModal";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState = cookieToInitialState(
    wagmiConfig,
    headers().get("cookie")
  );
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <Providers initialState={initialState}>
          <main className="flex flex-col min-h-screen items-center desktop-view">
            <div className="flex max-w-screen-md w-[745px] h-16 justify-start box-border">
              <MainNav className="mx-4 flex-1 max-w-screen-md" />
              <div className="ml-auto flex items-center space-x-4 mr-4">
                <w3m-button />
              </div>
            </div>
            {children}
            <Footer />
          </main>
          <MobileNotSupported />
          <TransactionModal />
        </Providers>
      </body>
    </html>
  );
}
