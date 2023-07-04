"use client";

import Link from "next/link";
import { WagmiConfig, createConfig, mainnet } from "wagmi";
import { createPublicClient, http } from "viem";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import WalletButton from "@/components/ui/wallet-button";
import { useState } from "react";

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
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
      <main className="flex flex-col min-h-screen items-center">
        <NavigationMenu className="px-4 max-h-16 w-full max-w-none flex justify-between border-b">
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className="text-lg tracking-wide font-bold">
                  DYAD
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  DOCS
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
          <div className="flex flex-row items-center justify-center gap-2 px-3 py-1">
            <b>TVL:</b> 1 ETH
          </div>
          <WalletButton />
        </NavigationMenu>

        <div className="flex-1 max-w-screen-lg p-4">
          <Card className="py-2 mb-4">
            <h3 className="text-md font-medium leading-none pt-3 px-4">
              Immutable Base. Infinite Possibility.
            </h3>
            <p className="text-sm text-muted-foreground py-2 px-4">
              DYAD unlocks unprecedented DeFi opportunities.
            </p>
            <Separator />
            <p className="text-sm leading-none my-4 px-4 leading-5">
              dNFTs are DYAD’s base layer. They are ERC 721 NFTs with a unique
              and maximally composable metadata structure. Ecosystem builders
              can design protocols using dNFT metadata instead of fungible
              tokens as incentives.
            </p>
            <Button className="mb-3 mx-4" onClick={openModal}>
              Claim dNFT
            </Button>
          </Card>

          <Card className="mb-4">
            <Table className="p-2">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">User</TableHead>
                  <TableHead>dNFT ID</TableHead>
                  <TableHead>Contribution</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Alice</TableCell>
                  <TableCell>#1</TableCell>
                  <TableCell>0.2225 ETH</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Alice</TableCell>
                  <TableCell>#1</TableCell>
                  <TableCell>0.2225 ETH</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Alice</TableCell>
                  <TableCell>#1</TableCell>
                  <TableCell>0.2225 ETH</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Alice</TableCell>
                  <TableCell>#1</TableCell>
                  <TableCell>0.2225 ETH</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </div>

        <NavigationMenu className="px-4 max-h-12 w-full max-w-none border-t">
          <NavigationMenuList className="flex justify-center gap-4">
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className="text-xs text-muted-foreground hover:text-foreground">
                  Discord
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className="text-xs text-muted-foreground hover:text-foreground">
                  Twitter
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className="text-xs text-muted-foreground hover:text-foreground">
                  Medium
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className="text-xs text-muted-foreground hover:text-foreground">
                  Github
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {showModal && (
          <div
            className="fixed w-screen h-screen flex items-center justify-center bg-black/[0.6] z-10"
            onClick={closeModal}
          >
            <Card
              className="p-4 w-80 max-w-screen-sm flex flex-col justify-start items-left min-w-sm"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <CardTitle className="test-md">Claim dNFT</CardTitle>
              <CardContent className="px-0 py-2 text-sm">
                Claim fee ... ETH
              </CardContent>
              <Button className="mt-2">Claim dNFT No. 1</Button>
            </Card>
          </div>
        )}
      </main>
    </WagmiConfig>
  );
}
