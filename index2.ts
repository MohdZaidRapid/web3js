const Web3 = require("web3");

const web3 = new Web3("http://127.0.0.1:7545");

const account1 = "0x41eCf8bf055FdbF7c454EE5D0E0eC51B05419A30";
const account2 = "0x111f21dC02744f7e72AC297Fb1A69fF3b8c6a830";

web3.eth.getBalance(account1, (err, result) => {
  console.log(result);
});

web3.eth.sendTransaction({
  from: account1,
  to: account2,
  value: web3.utils.toWei("1", "ether"),
});

web3.eth.getBalance(account2, (err, result) => {
  console.log(result);
});

web3.eth.personal.unlockAccount();
