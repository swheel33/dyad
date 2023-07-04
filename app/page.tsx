"use client";

import Link from "next/link";

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
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center">
      <NavigationMenu className="px-4 max-h-16 w-full max-w-none flex justify-between border-b">
        <NavigationMenuList>
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
        <Button variant="outline">Connect Wallet</Button>
      </NavigationMenu>

      <div className="flex-1 max-w-screen-lg mt-4">
        <Card className="my-4 py-2">
          <h3 className="text-md font-medium leading-none pt-3 px-4">
            Immutable Base. Infinite Possibility.
          </h3>
          <p className="text-sm text-muted-foreground py-2 px-4">
            DYAD unlocks unprecedented DeFi opportunities.
          </p>
          <Separator />
          <p className="text-sm leading-none my-4 px-4 leading-5">
            dNFTs are DYAD’s base layer. They are ERC 721 NFTs with a unique and
            maximally composable metadata structure. Ecosystem builders can
            design protocols using dNFT metadata instead of fungible tokens as
            incentives.
          </p>
          <Button className="mb-3 mx-4">Claim dNFT</Button>
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
    </main>
  );
}
