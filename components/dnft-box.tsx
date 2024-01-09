import {
  useAccount,
  useContractRead,
  useContractReads,
  useNetwork,
} from "wagmi";
import { Abi, formatEther, getAddress, numberToHex } from "viem";
import { useMemo, useState } from "react";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import MintAndDepositTab from "@/components/mint-and-deposit-tab";
import BurnAndWithdrawTab from "@/components/burn-and-withdraw-tab";
import { MAX_UINT256, deployments } from "@/lib/deployments";
import VaultManagerAbi from "@/abis/VaultManager.json";
import DyadAbi from "@/abis/Dyad.json";
import VaultAbi from "@/abis/Vault.json";
import DNftAbi from "@/abis/DNft.json";
import useModal from "@/contexts/modal";
import { AddVaultModalContent } from "./add-vault-modal-content";
import { ClaimModalContent } from "./claim-modal-content";
import { round } from "../utils/currency";

export default function DnftBox() {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const [selectedDnft, setSelectedDnft] = useState<string>();
  const [cr, setCr] = useState<string>();
  const [mintedDyad, setMintedDyad] = useState<string>();
  const [usdValue, setUsdValue] = useState<string>();
  const [id2asset, setId2asset] = useState<string>();
  const [selectedVaultId, setSelectedVaultId] = useState<string>();
  const { pushModal } = useModal();

  const [selectedVault, setSelectedVault] = useState<string>();

  const { vaultManager, dyad, dnft, vault, wsteth, weth, payments } = useMemo(
    () =>
      chain && deployments[chain.id]
        ? deployments[chain.id]
        : Object.values(deployments)[0],
    [chain]
  );

  const vaults = vault ? [vault, wsteth] : [];

  const { data: initialContractReads } = useContractReads({
    contracts: [
      {
        address: dnft as `0x${string}`,
        abi: DNftAbi as Abi,
        functionName: "balanceOf",
        args: [address ?? "0"],
      },
      {
        address: vaultManager as `0x${string}`,
        abi: VaultManagerAbi as Abi,
        functionName: "collatRatio",
        args: [selectedDnft ?? "0"],
      },
      {
        address: vaultManager as `0x${string}`,
        abi: VaultManagerAbi as Abi,
        functionName: "getVaultsUsdValue",
        args: [selectedDnft ?? "0"],
      },
      {
        address: dyad as `0x${string}`,
        abi: DyadAbi["abi"],
        functionName: "mintedDyad",
        args: [vaultManager, selectedDnft ?? "0"],
      },
      {
        address: vaultManager as `0x${string}`,
        abi: VaultManagerAbi as Abi,
        functionName: "MIN_COLLATERIZATION_RATIO",
      },
      {
        address: vaultManager,
        abi: VaultManagerAbi["abi"],
        functionName: "collatRatio",
        args: [selectedDnft ?? "0"],
      },
      {
        address: vaultManager,
        abi: VaultManagerAbi["abi"],
        functionName: "getTotalUsdValue",
        args: [selectedDnft ?? "0"],
      },
      {
        address: vault,
        abi: VaultAbi["abi"],
        functionName: "id2asset",
        args: [selectedDnft ?? "0"],
      },
    ],
    watch: true,
    onSuccess: (data) => {
      console.log("data", data);
      setMintedDyad(data?.dyadMinted?.toString());
      setCr(
        data?.collatRatio?.toString() === MAX_UINT256
          ? "0"
          : data?.collatRatio?.toString()
      );
      setUsdValue(data?.usdValue?.toString());
      setId2asset(data?.id2asset?.toString());
    },
    select: (data) => ({
      dnftBalance: +(data?.[0]?.result?.toString() ?? "0"),
      collateralRatio: (data?.[1]?.result ?? BigInt(0)) as bigint,
      totalValueLocked: (data?.[2]?.result ?? BigInt(0)) as bigint,
      dyadMinted: (data?.[3]?.result ?? BigInt(0)) as bigint,
      minCollateralizationRatio: (data?.[4]?.result ?? BigInt(0)) as bigint,
      collatRatio: (data?.[5]?.result ?? BigInt(0)) as bigint,
      usdValue: (data?.[6]?.result ?? BigInt(0)) as bigint,
      id2asset: (data?.[7]?.result ?? BigInt(0)) as bigint,
    }),
  });
  const {
    dnftBalance,
    collateralRatio,
    totalValueLocked,
    dyadMinted,
    minCollateralizationRatio,
    collatRatio,
  } = initialContractReads ?? {};
  console.log("collatRatio", collatRatio);

  // Get addresses of all dnfts owned by user
  const { data: dnfts } = useContractReads({
    contracts: Array.apply(null, Array(dnftBalance ?? 0)).map((_, index) => ({
      address: dnft as `0x${string}`,
      abi: DNftAbi as Abi,
      functionName: "tokenOfOwnerByIndex",
      args: [address ?? "0", index],
    })),
    watch: true,
    select: (data) =>
      data
        .map((dnft) => (dnft?.result ?? -1).toString())
        .filter((id) => id !== "-1"),
  });

  // Prompt user to add vault if they haven't already
  useContractRead({
    enabled: selectedDnft !== undefined && selectedVault !== undefined,
    address: vaultManager,
    abi: VaultManagerAbi["abi"],
    functionName: "hasVault",
    args: [selectedDnft, selectedVault.address],
    onErr: (err) => {
      console.log("xxxx", err);
    },
    onSuccess: (result) => {
      console.log("result", result);
      if (
        result !== undefined &&
        selectedDnft !== undefined &&
        selectedVault !== undefined &&
        !result
      ) {
        pushModal(
          <AddVaultModalContent
            dnft={selectedDnft}
            vault={selectedVaultId}
            vaultAddress={selectedVault.address}
            vaultManagerAddress={vaultManager}
            vaultSymbol={selectedVault.symbol}
          />
        );
      }
    },
  });

  const { data: vaultsData } = useContractReads({
    watch: true,
    contracts: Array.apply(null, Array(vaults.length))
      .map((_, index) => [
        {
          address: (vaults[index] ?? `0x${"0".repeat(40)}`) as `0x${string}`,
          abi: VaultAbi["abi"],
          functionName: "asset",
        },
        {
          address: (vaults[index] ?? `0x${"0".repeat(40)}`) as `0x${string}`,
          abi: VaultAbi["abi"],
          functionName: "symbol",
        },
        {
          address: (vaults[index] ?? `0x${"0".repeat(40)}`) as `0x${string}`,
          abi: VaultAbi["abi"],
          functionName: "collatPrice",
        },
        {
          address: (vaults[index] ?? `0x${"0".repeat(40)}`) as `0x${string}`,
          abi: VaultAbi["abi"],
          functionName: "decimals",
        },
        {
          address: vaultManager as `0x${string}`,
          abi: VaultAbi["abi"],
          functionName: "getUsdValue",
          args: [selectedDnft ?? "0"],
        },
        {
          address: (vaults[index] ?? `0x${"0".repeat(40)}`) as `0x${string}`,
          abi: VaultAbi as Abi,
          functionName: "balanceOf",
          args: [
            getAddress(
              numberToHex(BigInt(selectedDnft ?? "0"), { size: 20 })
            ) as `0x${string}`,
          ],
        },
        {
          address: (vaults[index] ?? `0x${"0".repeat(40)}`) as `0x${string}`,
          abi: VaultAbi as Abi,
          functionName: "totalSupply",
        },
      ])
      .flat(),
    select: (data) => {
      const v: {
        address: string;
        asset: string;
        symbol: string;
        collatPrice: string;
        decimals: string;
        tvl: string;
        share: string;
        value: string;
      }[] = [];
      data.forEach((result, index) => {
        if (index % 7 === 0) {
          const share =
            data[index + 5]?.result && data[index + 6]?.result
              ? (
                  (BigInt(data[index + 5]?.result?.toString() ?? "0") *
                    BigInt(10 ** 18)) /
                  BigInt(data[index + 6]?.result?.toString() ?? "1")
                ).toString()
              : "0";
          const tvl = data[index + 4]?.result?.toString() ?? "";
          const value =
            share !== "0"
              ? ((BigInt(tvl) * BigInt(share)) / BigInt(10 ** 18)).toString()
              : "0";
          v.push({
            address: vaults[index / 7] ?? "",
            asset: weth,
            symbol: "WETH",
            collatPrice: data[index + 2]?.result?.toString() ?? "",
            decimals: data[index + 3]?.result?.toString() ?? "",
            tvl,
            share,
            value,
          });
        }
      });
      return v;
    },
  });

  console.log("vaults", vaultsData);
  return (
    <div className="pt-1">
      {(!isConnected || dnfts?.length === 0) && (
        <div className="text-sm leading-loose text-muted-foreground py-2">
          To start, claim your first Note. Notes are ERC-721 NFTs that track
          your collateral and DYAD minted balance.
        </div>
      )}
      <div className="w-full mb-4">
        <Button
          onClick={() => {
            pushModal(<ClaimModalContent />);
          }}
        >
          {dnfts?.length === 0 ? "Claim Note" : "Claim additional Note"}
        </Button>
      </div>
      {isConnected && dnfts?.length > 0 && (
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center space-x-10">
            <Select onValueChange={setSelectedDnft}>
              <SelectTrigger id="select-dnft" className="mt-1">
                <SelectValue placeholder="Select Note" />
              </SelectTrigger>
              <SelectContent>
                {dnfts?.map((dnft) => (
                  <SelectItem value={dnft} key={`dnft-${dnft}`}>
                    Note {dnft}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedDnft !== undefined && (
              <div className="flex space-x-4">
                <div className="flex space-x-1">
                  <div>CR:</div>
                  <div>{round(cr / 10 ** 16, 0)}%</div>
                </div>
                <div className="flex space-x-1">
                  <div className="flex space-x-1">
                    <div>{round(mintedDyad / 10 ** 18, 2)}</div>
                    <div>DYAD</div>
                  </div>
                  <div>/</div>
                  <div className="flex ">
                    <div>$</div>
                    <div>{round(usdValue / 10 ** 18, 2)}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {selectedDnft && (
            <div className="w-[33.5rem]">
              <Select onValueChange={setSelectedVault}>
                <SelectTrigger id="select-dnft" className="mt-1">
                  <SelectValue placeholder="Select Collateral" />
                </SelectTrigger>
                <SelectContent>
                  {vaultsData?.map((vault) => (
                    <SelectItem value={vault} key={`collat-${vault.address}`}>
                      {vault.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}
      {
        <div className="pt-4">
          <MintAndDepositTab
            setSelectedVaultId={setSelectedVaultId}
            vaults={vaultsData ?? []}
            vault={vault}
            payments={payments}
            weth={weth}
            vaultManager={vaultManager}
            selectedVault={vaultsData?.find(
              (vault) => vault?.address === selectedVaultId
            )}
            selectedDnft={selectedDnft}
            dyadMinted={dyadMinted}
            totalValueLocked={totalValueLocked}
            minCollateralizationRatio={minCollateralizationRatio}
            usdValue={usdValue}
            selectedVaultAddress={selectedVault.address}
          />
          <BurnAndWithdrawTab
            setSelectedVaultId={setSelectedVaultId}
            vaults={vaultsData ?? []}
            vault={vault}
            vaultManager={vaultManager}
            selectedVault={vaultsData?.find(
              (vault) => vault?.address === selectedVaultId
            )}
            selectedDnft={selectedDnft}
            dyadMinted={dyadMinted}
            totalValueLocked={totalValueLocked}
            minCollateralizationRatio={minCollateralizationRatio}
            dyad={dyad}
            collatRatio={collateralRatio}
            usdValue={usdValue}
            id2asset={id2asset}
          />
        </div>
      }
    </div>
  );
}
