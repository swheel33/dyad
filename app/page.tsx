"use client";

import { WagmiConfig, createConfig } from "wagmi";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { useState } from "react";
import {
  Client,
  Provider as UrqlProvider,
  cacheExchange,
  fetchExchange,
} from "urql";

import { MainNav } from "@/components/ui/main-nav";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import WalletButton from "@/components/ui/wallet-button";
import ClaimsTable from "@/components/claims-table";
import { ClaimModal } from "@/components/claim-modal";

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
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <WagmiConfig config={wagmiConfig}>
      <UrqlProvider value={client}>
        <main className="flex flex-col min-h-screen items-center">
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

            <Button className="mb-3 mx-4" onClick={openModal}>
              Claim dNFT
            </Button>

            <p className="text-sm leading-loose my-4 px-4">
              dNFTs are ERC 721 NFTs with a unique and maximally composable
              metadata structure.
            </p>

            <p className="text-sm leading-loose my-4 px-4">
              Read our{" "}
              <a
                href="https://dyadstable.notion.site/DYAD-full-52096aed265247e7a50b14f06c228a7e?pvs=4"
                className="underline"
              >
                DOCS
              </a>{" "}
              to learn how dNFTs are your key to participate in the
              DYAD ecosystem.
            </p>
            <Separator className="my-4" />
            <ClaimsTable className="p-4" />
          </div>

          <ClaimModal showModal={showModal} closeModal={closeModal} />
        </main>
      </UrqlProvider>
    </WagmiConfig>
  );
}
