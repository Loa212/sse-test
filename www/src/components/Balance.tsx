import React from "react";
import { Web3ModalContext } from "~/contexts/Web3ModalProvider";

const Balance = () => {
  const [xdcBalance, setXdcBalance] = React.useState("");

  const { account, web3 } = React.useContext(Web3ModalContext);

  React.useEffect(() => {
    const getBalance = async () => {
      if (web3 && account) {
        try {
          const balance = await web3.eth.getBalance(account);
          setXdcBalance((Number(balance) / 1e18).toString());
        } catch (error) {
          console.error(error);
        }
      } else {
        setXdcBalance("");
      }
    };

    void getBalance();
  }, [account, web3]);

  if (!account || !xdcBalance) return <div></div>;

  return <div>You currently have: {parseInt(xdcBalance).toFixed(2)} XDC</div>;
};

export default Balance;
