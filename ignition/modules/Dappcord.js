
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");



module.exports = buildModule("Dappcord", (m) => {


  const Dappcord = m.contract("Dappcord", []);

  return { Dappcord };
});




