import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { sepolia } from "viem/chains";
import { dnftAbi } from "@/lib/abi/Dnft";
import { licenserAbi } from "@/lib/abi/Licenser";
import { dyadAbi } from "@/lib/abi/Dyad";
import { vaultManagerAbi } from "@/lib/abi/VaultManager";
import { vaultAbi } from "@/lib/abi/Vault";
import { paymentsAbi } from "@/lib/abi/Payments";
import { erc20Abi } from "viem";

export default defineConfig({
  out: "generated.ts",
  contracts: [
    {
      name: "DNft",
      address: {
        [sepolia.id]: "0xf799122A38EDadd17BF73433e93Aaa422a515880",
      },
      abi: dnftAbi,
    },
    {
      name: "Licenser",
      address: {
        [sepolia.id]: "0x287f5Fe6551E7567eD8Bdb6B0801F6Fa2C765CEb",
      },
      abi: licenserAbi,
    },
    {
      name: "Dyad",
      address: {
        [sepolia.id]: "0x35C85fbC38c4fBBAb13603d2cce5eC521A022DC4",
      },
      abi: dyadAbi,
    },
    {
      name: "VaultManager",
      address: {
        [sepolia.id]: "0x0ceedBf60e5DDa9562B34ac637e60Ac39eEe0213",
      },
      abi: vaultManagerAbi,
    },
    {
      name: "Vault",
      address: {
        [sepolia.id]: "0x9802741d855b52E22E115B6cE7ba9E0e4433E8A9",
      },
      abi: vaultAbi,
    },
    {
      name: "Payments",
      address: {
        [sepolia.id]: "0xb1dD20c907e1DD95D6c05E29F0d79f6e8061735B",
      },
      abi: paymentsAbi,
    },
    {
      name: "WETH",
      address: {
        [sepolia.id]: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
      },
      abi: erc20Abi,
    },
  ],

  plugins: [react()],
});
