pragma solidity ^0.5.0;

contract Voting {
   uint256 votesForTrump = 0;
   uint256 votesForHillary = 0;
   uint256 start = 0;
   bool isVotingInitiated = false;
   mapping(address => bool) public voted;

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
        require(now < start + 4 minutes);
        _;
    }

    modifier VoteEnded{
        require(now >= start + 4 minutes);
        _;
    }

    modifier VoteStarted{
        require(start!=0);
        _;
    }

    modifier VoteNotStarted{
        require(start==0);
        _;
    }

   function startVote() OnlyOwner VoteNotStarted public{
        start = now;
        isVotingInitiated = true;
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

    function getIsVotingInitiated() public view returns(bool){
        return isVotingInitiated;
    }
}