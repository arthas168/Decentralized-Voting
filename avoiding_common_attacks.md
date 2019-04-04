# Security 

## Access Restriction

The contract is built so as to allow only authorized parties to access certain
functions.

## Emergency Stop

I've implemented an emergency stop (or "circuit breaker") functionality,
to ensure that even if bad actors breach the contract security, the
vital functions get locked and nothing gets compromised or lost. 

## Re-entrance attack

The re-entrance attack and other similar to it attacks do not concern 
the dApp, because it does not send, nor receive ethers.

## On the usage of "now"

I am aware that the miners can influence the timestamp of the block,
so I only use it as a reference and not as a source of randomness or something like that.