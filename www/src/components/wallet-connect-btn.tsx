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
        <button
          className="rounded bg-[#2e026d] px-4 py-2 font-bold text-white hover:bg-[#15162c]"
          onClick={handleConnectWallet}
        >
          NOT CONNECTED
        </button>
      ) : (
        <button
          className="rounded bg-[#2e026d] px-4 py-2 font-bold text-white hover:bg-[#15162c]"
          onClick={handleDisconnectWallet}
        >
          {ellipseAddress(account)}
        </button>
      )}
    </span>
  );
};

export default WalletConnectButton;
