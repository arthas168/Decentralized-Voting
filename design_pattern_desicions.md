## Overview

The Voting dApp is a fairly simple app so there isn't much to say about the used designed patterns.

The most important thing to notice is that the contract doesn't have any 
payable functions. It doesn't transfer or receive money at any point of it's
execution.

 ## Efficiency
 
 I haven't used any loops or arrays in the contract for the sake of it being 
 cheaper to deploy and interact with.
 
 ## Library
 
 I've cropped part of the dApp login into a small library that can be
 reused if needed and also to make it easier to change the functionality/count
 of the Candidate entities without compromising the main voting process logic.
 **bonus:  functions that are internal to the contract are always called
 before external ones, so that even if something in the library messes up, the
 contract function does it's job.
 
 ## Security
 
 On the security topic I've touched a lot in the avoiding_common_attacks.md file.