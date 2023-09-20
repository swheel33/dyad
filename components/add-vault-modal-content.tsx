import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { useCallback } from "react";
import { Abi } from "viem";

import { Vault } from "@/gql";
import VaultManagerAbi from "@/abis/VaultManager.json";
import Loader from "@/components/loader";
import { CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WalletButton from "@/components/ui/wallet-button";
import useModal from "@/contexts/modal";

interface Props {
  dnft: string;
  vault: string;
  vaultManagerAddress: string;
}

export function AddVaultModalContent({
  dnft,
  vault,
  vaultManagerAddress,
}: Props) {
  const { shiftModal } = useModal();
  const { address } = useAccount();

  const {
    data: txData,
    isLoading,
    isSuccess,
    isError,
    write,
    reset,
  } = useContractWrite({
    address: vaultManagerAddress as `0x${string}`,
    abi: VaultManagerAbi as Abi,
    functionName: "add",
    args: [vault],
  });

  const { isLoading: isTxLoading, isError: isTxError } = useWaitForTransaction({
    hash: txData?.hash,
    onError: console.error,
  });

  const addVault = useCallback(() => {
    if (vault && vaultManagerAddress) {
      write({
        args: [dnft, vault],
      });
    }
  }, [vaultManagerAddress, vault, write, dnft]);

  const close = useCallback(() => {
    reset();
    shiftModal();
  }, [reset, shiftModal]);

  return (
    <div className="w-80">
      <CardTitle className="text-md">
        {isError
          ? "Error"
          : isSuccess && !isTxLoading
          ? "Success!"
          : "Add Vault"}
      </CardTitle>
      <CardContent className="px-0 py-2 test-sm">
        {isError
          ? "Error sending transaction, please try again"
          : isSuccess && !isTxLoading
          ? "Vault added successfully!"
          : "This vault needs to be added to your dNft before you can deposit."}
      </CardContent>
      {address ? (
        <Button
          className="mt-2 w-full"
          onClick={
            isError || isTxError
              ? reset
              : isSuccess && !isTxLoading
              ? close
              : addVault
          }
        >
          {isError || isTxError ? (
            "Retry"
          ) : isSuccess && !isTxLoading ? (
            "Close"
          ) : isLoading || isTxLoading ? (
            <Loader />
          ) : (
            "Add vault"
          )}
        </Button>
      ) : (
        <WalletButton className="mt-2 w-full" />
      )}
    </div>
  );
}
