var Voting = artifacts.require("Voting");

contract('Voting', function(accounts){

    it("should start with candidate 1 having 0 votes", function(){
        return Voting.deployed().then(function(instance){
            return instance.getTrumpVotes();
        }).then(function(votes){
            assert.equal(votes, 0, "Must have 0 votes");
        });
    });
    it("should start with candidate 2 having 0 votes", function(){
        return Voting.deployed().then(function(instance){
            return instance.getHillaryVotes();
        }).then(function(votes){
            assert.equal(votes, 0, "Must have 0 votes");
        });
    });
    it("should be false when the contract is deployed", function(){
        return Voting.deployed().then(async function(instance){
            return instance.getIsVotingInitiated();
        }).then(function(isInitiated){
            assert.equal(isInitiated, false, "Value has to be false");
        });
    });
    it("should set the bool value to true once the start function is invoked", function(){
        return Voting.deployed().then(async function(instance){
            await instance.startVote();
            return instance.getIsVotingInitiated();
        }).then(function(isInitiated){
            assert.equal(isInitiated, true, "Value has to be true");
        });
    });
    it("should start with the mapping value for the account key being false", function(){
        return Voting.deployed().then(function(instance){
            return instance.voted.call(accounts[0]);
        }).then(function(balance){
            assert.equal(balance.valueOf(), false, "Value has to be false");
        });
    });
});
