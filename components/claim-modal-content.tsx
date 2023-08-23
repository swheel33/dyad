import {
  useAccount,
  useContractReads,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";
import { Abi, formatEther, parseEther } from "viem";
import { useCallback, useEffect, useMemo } from "react";

import { CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deployments } from "@/lib/deployments";
import DnftAbi from "@/abis/dnft.json";
import WalletButton from "./ui/wallet-button";
import Loader from "./loader";
import useModal from "@/contexts/modal";

export function ClaimModalContent() {
  const { closeModal } = useModal();
  const { address } = useAccount();
  const { chain } = useNetwork();

  const dnftAddress = useMemo(
    () =>
      (chain && deployments[chain.id]
        ? deployments[chain.id].dnft
        : Object.values(deployments)[0].dnft) as `0x${string}`,
    [chain]
  );

  const { data } = useContractReads({
    contracts: [
      {
        address: dnftAddress,
        abi: DnftAbi as Abi,
        functionName: "START_PRICE",
      },
      {
        address: dnftAddress,
        abi: DnftAbi as Abi,
        functionName: "PRICE_INCREASE",
      },
      {
        address: dnftAddress,
        abi: DnftAbi as Abi,
        functionName: "publicMints",
      },
    ],
  });

  const {
    data: txData,
    isLoading,
    isSuccess,
    isError,
    write,
    reset,
  } = useContractWrite({
    address: dnftAddress,
    abi: DnftAbi as Abi,
    functionName: "mintNft",
  });

  const {
    isLoading: isTxLoading,
    isError: isTxError,
    error,
  } = useWaitForTransaction({
    hash: txData?.hash,
  });

  const { startPrice, priceIncrease, publicMints } = useMemo(() => {
    let startPrice = BigInt(0);
    let priceIncrease = BigInt(0);
    let publicMints = BigInt(0);
    if (data?.[0]?.result) startPrice = data[0].result as bigint;
    if (data?.[1]?.result) priceIncrease = data?.[1]?.result as bigint;
    if (data?.[2]?.result) publicMints = data?.[2]?.result as bigint;
    return { startPrice, priceIncrease, publicMints };
  }, [data]);

  const mintPrice = useMemo(() => {
    if (
      startPrice === undefined ||
      priceIncrease === undefined ||
      publicMints === undefined
    )
      return 0;
    try {
      return formatEther(startPrice + priceIncrease * publicMints);
    } catch (err) {
      return 0;
    }
  }, [startPrice, priceIncrease, publicMints]);

  const mintNft = useCallback(() => {
    if (!address) {
      console.error("Not connected");
    } else if (mintPrice) {
      write({
        args: [address],
        value: parseEther(mintPrice),
      });
    }
  }, [address, mintPrice, write]);

  const close = useCallback(() => {
    reset();
    closeModal();
  }, [reset, closeModal]);

  useEffect(() => {
    if (isTxError) {
      console.error(error);
    }
  }, [isTxError, error]);

  return (
    <div className="w-80">
      <CardTitle className="text-md">
        {isError
          ? "Error"
          : isSuccess && !isTxLoading
          ? "Success!"
          : "Claim dNFT"}
      </CardTitle>
      <CardContent className="px-0 py-2 text-sm">
        {isError
          ? "Error sending transaction, please try again"
          : isSuccess && !isTxLoading
          ? "dNFT claimed successfully!"
          : `Claim fee ${mintPrice} ETH`}
      </CardContent>
      {address ? (
        <Button
          className="mt-2 w-full"
          onClick={
            isError || isTxError
              ? reset
              : isSuccess && !isTxLoading
              ? close
              : mintNft
          }
        >
          {isError || isTxError ? (
            "Retry"
          ) : isSuccess && !isTxLoading ? (
            "Close"
          ) : isLoading || isTxLoading ? (
            <Loader />
          ) : (
            `Claim dNFT No. ${publicMints.toString()}`
          )}
        </Button>
      ) : (
        <WalletButton className="mt-2 w-full" />
      )}
    </div>
  );
}
