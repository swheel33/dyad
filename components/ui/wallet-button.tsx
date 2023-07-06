import { useCallback } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import { Button } from "@/components/ui/button";

interface Props {
  className?: string;
}

export default function WalletButton({ className }: Props) {
  const { isConnected } = useAccount();

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
