---
icon: question
---

## Shimmer Claiming

### Overview

"Shimmer Claiming" refers to a process of transferring SMR tokens from UTXOs that were included 
in the genesis snapshot to new  UTXOs that use addresses that are of the same seed but use the Shimmer
`coin_type` rather than the IOTA `coin_type`, which is used to derive key pairs to generate addresses
and sign transactions with. These SMR tokens correspond to the Shimmer staking airdrops the IOTA
community received last year (2021) in November.

### Claiming Transactions

Because the rewards originally reside on addresses that were derived with `coin_type = 4218` (IOTA)
