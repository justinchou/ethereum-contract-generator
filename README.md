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

### Quick Start

Under Truffle Project, After You Truffle Migrate, Run

`ctctg g --abi --client --server`

Then You Found Some More Files Generated Under Your `build` Folder~

Congratulations!

### Use Under Your Solidity Project

Befour You Start, Type `ctctg --help`.

Aha, Sorry That The Current Help Is Writen In Chinese, Maybe It's The Right Opportunity To Learn Some.

```txt
Usage: contract-generator|ctctg [command] [options]
  Options:
        --version         output the version number
    -h, --help            output usage information
  Commands:
    generate|g [options]  基于 sol 生的 json 文件生成给前后端使用的不同文件
```

This Means `ctctg --version` And `ctctg -h` Are Avaliable.

Support Command Is `generate` Or Simply `g`:

`ctctg g --help` Then:

```txt
Usage: generate|g [options]

  基于 sol 生的 json 文件生成给前后端使用的不同文件

  Options:

    -i, --input   [value]  输入源文件路径, 默认为 build/contracts
    -o, --output  [value]  输出目标路径, 默认为 build
    -n, --network [value]  指定使用的网络 ID
    -c, --client           生成 client 模板
    -s, --server           生成 server 模板
    -a, --abi              生成 abi 模板
    -h, --help             output usage information
```
