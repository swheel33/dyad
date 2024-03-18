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
        // [sepolia.id]: "0x07319c8e07847D346051858FD0Ea9b9990E2Df07",
        [sepolia.id]: "0xf799122A38EDadd17BF73433e93Aaa422a515880",
      },
      abi: dnftAbi,
    },
    {
      name: "Licenser",
      address: {
        // [sepolia.id]: "0x7Ad21b2D244789c2e483af902BB1Ad0101139E88",
        [sepolia.id]: "0x287f5Fe6551E7567eD8Bdb6B0801F6Fa2C765CEb",
      },
      abi: licenserAbi,
    },
    {
      name: "Dyad",
      address: {
        // [sepolia.id]: "0xf3b7B1CF5C5f32728D4cBb975c0969C23E70fA81",
        [sepolia.id]: "0x35C85fbC38c4fBBAb13603d2cce5eC521A022DC4",
      },
      abi: dyadAbi,
    },
    {
      name: "VaultManager",
      address: {
        // [sepolia.id]: "0xDbdF094Aa2d283C6F0044555931C8B50A41e7605",
        [sepolia.id]: "0x0ceedBf60e5DDa9562B34ac637e60Ac39eEe0213",
      },
      abi: vaultManagerAbi,
    },
    {
      name: "Vault",
      address: {
        // [sepolia.id]: "0xF19c9F99CC04C1C38D51dd3A0c2169D6485762b4",
        [sepolia.id]: "0x9802741d855b52E22E115B6cE7ba9E0e4433E8A9",
      },
      abi: vaultAbi,
    },
    {
      name: "Payments",
      address: {
        // [sepolia.id]: "0xe9F9Df2De303802f81EB114a5F24a3d4A17089f4",
        [sepolia.id]: "0xb1dD20c907e1DD95D6c05E29F0d79f6e8061735B",
      },
      abi: paymentsAbi,
    },
    // {
    //   name: "Kerosene",
    //   address: {
    //     [sepolia.id]: "0x956Ca322C709A97c5C2b4de3326D7b34dA7e9d75",
    //   },
    //   abi: "",
    // },
    // {
    //   name: "KeroseneManager",
    //   address: {
    //     [sepolia.id]: "0xDe663DdFB9e1F4ED902b0ac46BEB0d3ae59a90CB",
    //   },
    //   abi: "",
    // },
    // {
    //   name: "Staking",
    //   address: {
    //     [sepolia.id]: "0x795Ca95DD918856CDb8a56E9585A43A3E168774E",
    //   },
    //   abi: "",
    // },
    // {
    //   name: "UnboundedKeroseneVault",
    //   address: {
    //     [sepolia.id]: "0x0CD9502D4B649c87c1c42eEd71E679E79EFe8cE9",
    //   },
    //   abi: "",
    // },
    // {
    //   name: "BoundedKeroseneVault",
    //   address: {
    //     [sepolia.id]: "0x0eCa8b2Bd088163Be2533d1537b1Ff0d476fe28A",
    //   },
    //   abi: "",
    // },
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
