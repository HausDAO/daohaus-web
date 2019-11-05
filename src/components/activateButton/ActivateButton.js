import React from "react";
import { Link } from "react-router-dom";
import { useWeb3Context } from "web3-react";
import IconEthereum from "../../assets/icon__ethereum.png";

import "./ActivateButton.scss"

const ActivateButton = () => {
  const context = useWeb3Context();
  console.log(context);
  

  const activate = async () => {
    await context.setFirstValidConnector(["MetaMask"]);
  };

  if (!context.active && !context.error) {
    // loading
    return (
      <button className="AuthButton" onClick={() => activate()}>
        <img src={IconEthereum} /> Sign in<span> with Ethereum</span>
      </button>
    );
  } else if (context.error) {
    //error
    return (
      <>
        <button onClick={() => alert('You need a browser with web3 support on mainnet.')}>Sign in with Ethereum</button>

        {context.error.code === "UNSUPPORTED_NETWORK" && (
          <p className="ErrorText">Unsupported network: please use mainnet</p>
        )}
      </>
    );
  } else {
    // success
    return (
      <>
        {context.account ? (
          <Link to={`/profile/${context.account}`}>Profile</Link>
        ) : null}
      </>
    );
  }
};

export default ActivateButton;
