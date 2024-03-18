import { vaultAddress, wethAddress } from "@/generated";
import { defaultChain } from "./config";

export const vaultInfo = [
  {
    vaultAddress: vaultAddress[defaultChain.id],
    symbol: "wETH",
    tokenAddress: wethAddress[defaultChain.id],
  },
];
