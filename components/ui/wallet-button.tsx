import { useCallback, useEffect } from "react";
import { useAccount, useConnect, useDisconnect, useNetwork } from "wagmi";
import { switchNetwork } from "@wagmi/core";
import { InjectedConnector } from "wagmi/connectors/injected";

import { Button } from "@/components/ui/button";
import { deployments } from "@/lib/deployments";

interface Props {
  className?: string;
}

export default function WalletButton({ className }: Props) {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const { disconnect } = useDisconnect();

  const handleClick = useCallback(() => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  }, [isConnected, connect, disconnect]);

  useEffect(() => {
    if (chain && !deployments[chain.id]) {
      switchNetwork({
        chainId: process.env.DEFAULT_NETWORK_ID
          ? +process.env.DEFAULT_NETWORK_ID
          : +Object.keys(deployments)[0],
      });
    }
  }, [chain]);

  return (
    <Button
      onClick={handleClick}
      variant={isConnected ? "outline" : "default"}
      className={className}
    >
      {isConnected ? "Disconnect" : "Connect"}
    </Button>
  );
}
