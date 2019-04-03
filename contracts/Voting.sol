pragma solidity ^0.5.0;

contract Voting {
   uint256 votesForTrump = 0;
   uint256 votesForHillary = 0;
   uint start = 0;
   mapping(address => bool) voted;

   address owner;

   constructor() public {
        owner = msg.sender;
    }

   modifier OnlyOwner(){
        require(msg.sender == owner);
        _;
    }

     modifier NotVoted(){
        require(voted[msg.sender]!=true);
        _;
    }

    modifier VoteOngoing{
        require(now < start + 1 minutes);
        _;
    }

    modifier VoteEnded{
        require(now >= start + 1 minutes);
        _;
    }

    modifier VoteStarted{
        require(start!=0);
        _;
    }

   function startVote() OnlyOwner public{
        start = now;
   }

   function addHillaryVote() NotVoted VoteStarted VoteOngoing public{
       votesForHillary++;
       voted[msg.sender] = true;
   }

   function addTrumpVote() NotVoted VoteStarted VoteOngoing public {
       votesForTrump++;
        voted[msg.sender] = true;
   }

   function getTrumpVotes() VoteEnded public view returns(uint256) {
       return votesForTrump;
   }

   function getHillaryVotes() VoteEnded public view  returns(uint256) {
       return votesForHillary;
   }

   function resetVote() OnlyOwner VoteEnded public{
       votesForHillary = 0;
       votesForTrump = 0;
   }
}