var Voting = artifacts.require("Voting");
var CandidateLib = artifacts.require("CandidateLib");

module.exports = function (deployer) {
  deployer.deploy(CandidateLib);
  deployer.link(CandidateLib, Voting);
  deployer.deploy(Voting);
};