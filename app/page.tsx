"use client";

import { WagmiConfig, createConfig } from "wagmi";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import {
  Client,
  Provider as UrqlProvider,
  cacheExchange,
  fetchExchange,
} from "urql";

import { MainNav } from "@/components/ui/main-nav";
import { Separator } from "@/components/ui/separator";
import WalletButton from "@/components/ui/wallet-button";
import ClaimSection from "@/components/claim-section";
import ClaimsTable from "@/components/claims-table";
import { ModalProvider } from "@/contexts/modal";

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});

const client = new Client({
  url: process.env.NEXT_PUBLIC_SUBGRAPH_URL ?? "",
  exchanges: [cacheExchange, fetchExchange],
});

export default function Home() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <UrqlProvider value={client}>
        <main className="flex flex-col min-h-screen items-center">
          <ModalProvider>
            <div className="flex max-w-lg h-16 justify-between px-4">
              <MainNav className="mx-6" />
              <div className="ml-auto flex items-center space-x-4">
                <WalletButton />
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex-1 max-w-screen-lg p-4">
              <h3 className="text-md font-medium leading-loose pt-3 px-4">
                Immutable Base. Infinite Possibility.
              </h3>
              <p className="text-sm leading-loose text-muted-foreground py-2 px-4">
                DYAD unlocks unprecedented DeFi opportunities.
              </p>
              <Separator className="my-4" />
              <ClaimSection />
              <Separator className="my-4" />
              <ClaimsTable className="p-4" />
            </div>
          </ModalProvider>
        </main>
      </UrqlProvider>
    </WagmiConfig>
  );
}
