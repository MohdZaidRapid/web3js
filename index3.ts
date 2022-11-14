const Tx = require("ethereumjs-tx").Transaction;
const Web3 = require("web3");
const web3 = new Web3(
  //   "https://goerli.infura.io/v3/946b624e5acb4dd4801cfba0ea04fa44"
  "http://127.0.0.1:7545"
);

const account1 = "0x41eCf8bf055FdbF7c454EE5D0E0eC51B05419A30";

const account2 = "0x111f21dC02744f7e72AC297Fb1A69fF3b8c6a830";

// console.log(web3.eth.accounts.create());

console.log(process.env.PRIVATE_KEY_1);
// console.log(process.env);
// const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1);
// const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2);
const privateKey1 = process.env.PRIVATE_KEY_1?.toString();
const privateKey2 = process.env.PRIVATE_KEY_2?.toString();

web3.eth.getTransactionCount(account1, (err, txCount) => {
  const txObject = {
    to: account2,
    value: web3.utils.toWei("0.5", "ether"),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toWei("10", "gwei"),
  };

  //   console.log(txObject);

  // Sign the transaction
  //   const tx = new Tx(txObject);
  //   tx.sign(privateKey1);

  //   const serializeTransaction = tx.serialize();
  //   const row = serializeTransaction.toString("hex");

  //   web3.eth.sendSignedTransaction(row, (err, txHash) => {
  //     console.log("txHash", txHash);
  //   });

  const signedTransaction = web3.eth.accounts.signTransaction(
    txObject,
    privateKey1
  );

  signedTransaction.then((signedTx) => {
    const sentTx = web3.eth.sendSignedTransaction(
      signedTx.raw || signedTx.rawTransaction
    );

    sentTx.on("receipt", (receipt) => {
      console.log(receipt);
    });

    sentTx.on("error", (err) => {
      console.log(err.message);
    });
  });
});

web3.eth.getBalance(account1, (err, bal) => {
  console.log("account 1 balance", web3.utils.fromWei(bal, "ether"));
});

web3.eth.getBalance(account2, (err, bal) => {
  console.log("account 2 balance", web3.utils.fromWei(bal, "ether"));
});

// console.log();
