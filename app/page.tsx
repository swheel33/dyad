"use client";

import Link from "next/link";
import { WagmiConfig, createConfig } from "wagmi";
import { createPublicClient, http } from "viem";
import { goerli } from "viem/chains";
import { useState } from "react";
import {
  Client,
  Provider as UrqlProvider,
  cacheExchange,
  fetchExchange,
} from "urql";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import WalletButton from "@/components/ui/wallet-button";
import ClaimsTable from "@/components/claims-table";
import { ClaimModal } from "@/components/claim-modal";

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: goerli,
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
          <NavigationMenu className="px-4 max-h-16 w-full max-w-none flex justify-between">
            <NavigationMenuList className="gap-3">
              <NavigationMenuItem>
                <Link
                  href="https://dyadstablecoin.github.io/claim-frontend/"
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink className="font-bold">
                    DYAD
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>

            <WalletButton />
          </NavigationMenu>

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
              to learn how dNFTs are your key to participate and build in the DYAD ecosystem.
            </p>

            <ClaimsTable className="p-4" />
          </div>

          <NavigationMenu className="px-4 max-h-12 w-full max-w-none border-t">
            <NavigationMenuList className="flex justify-center gap-4">
              <NavigationMenuItem>
                <Link
                  href="https://discord.gg/z3wdvqM3kt"
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink className="text-sm text-muted-foreground hover:text-foreground">
                    Discord
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="https://twitter.com/0xdyad" legacyBehavior passHref>
                  <NavigationMenuLink className="text-sm text-muted-foreground hover:text-foreground">
                    Twitter
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className="text-sm text-muted-foreground hover:text-foreground">
                    Medium
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="https://github.com/DyadStablecoin"
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink className="text-sm text-muted-foreground hover:text-foreground">
                    Github
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <ClaimModal showModal={showModal} closeModal={closeModal} />
        </main>
      </UrqlProvider>
    </WagmiConfig>
  );
}
