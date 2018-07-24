# Generate JavaScript Files Via Contract Json

What Is This Used For?

1. In Daily Usage, We Need To Write params Chack For Apis Of Every Contract Send And Call Methods.

Sometimes, We Can Just Make It Easier When The Api Check Is Under A Loose Check.

In This Condition, We Need An Auto-Generated Data Type Check Middleware To Do This For Us.

2. In Another Condition, We Want To Send Raw Transaction From Client To Server. But It Sucks To Write The Same Code Over And Over Again. Can It Be A Simpler Way To Write Code?

3. When We Want To Parse Log, Sha3 Call, We Need The Origin Abi Of Each Contract.

If You Are Confusing About What I Just Said, You May Need This!

Note: This Tool Is Perfect When You Use Together With Truffle.

## How To Use

### Install

`npm i -g ethereum-contract-generator`

Or

`yarn global add ethereum-contract-generator`

### Use Under Your Solidity Project

Befour You Start, Type `ctctg --help`.

