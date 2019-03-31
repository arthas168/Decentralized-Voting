pragma solidity ^0.5.0;

contract Voting {
   uint256 votesForTrump = 0;
   uint256 votesForHillary = 0;

   function addHillaryVote() public{
       votesForHillary++;
   }

   function addTrumpVote() public{
       votesForTrump++;
   }

   function getTrumpVotes()  public view returns(uint256){
       return votesForTrump;
   }

   function getHillaryVotes() public view returns(uint256){
       return votesForHillary;
   }

   function getWinner() public view returns (string memory){
       if(votesForTrump>votesForHillary){
          return "trump";
       }else if(votesForTrump==votesForHillary){
          return "tie";
       }else if(votesForTrump<votesForHillary){
           return "hillary";
       }
   }
}