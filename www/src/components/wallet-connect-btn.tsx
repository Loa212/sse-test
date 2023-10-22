import React from "react";
import { Web3ModalContext } from "~/contexts/Web3ModalProvider";

const WalletConnectButton: React.FC = () => {
  function ellipseAddress(address = "", width = 4): string {
    return `xdc${address.slice(2, width + 2)}...${address.slice(-width)}`;
  }

  const { account, connect, disconnect } = React.useContext(Web3ModalContext);

  const handleConnectWallet = React.useCallback(() => {
    connect();
  }, [connect]);

  const handleDisconnectWallet = React.useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <span>
      {!account ? (
        <div onClick={handleConnectWallet}>NOT CONNECTED</div>
      ) : (
        <div onClick={handleDisconnectWallet}>{ellipseAddress(account)}</div>
      )}
    </span>
  );
};

export default WalletConnectButton;
