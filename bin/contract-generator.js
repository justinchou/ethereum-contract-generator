#!/usr/bin/env node

'use strict';

const Path = require('path');
const Fs = require('fs');
const Program = require('commander');
const Ejs = require('ejs');

const debug = require('debug')('contract-generator');

const Utils = require('../lib/utils');

const appName = require('../package.json').name;
const Version = require('../package.json').version;

let rootPath = process.cwd();
let params = {};

const indexTemplate = Fs.readFileSync(Path.join(__dirname, '../templates/index.ejs'), 'utf8');
const clientTemplate = Fs.readFileSync(Path.join(__dirname, '../templates/client.ejs'), 'utf8');
const serverTemplate = Fs.readFileSync(Path.join(__dirname, '../templates/server.ejs'), 'utf8');

Program.name('contract-generator').alias('ctctg').usage('[command] [options]').version(Version, '    --version');

Program.command('generate')
    .alias('g')
    .description('基于 sol 生的 json 文件生成给前后端使用的不同文件')
    .option('-i, --input   [value]', '输入源文件路径, 默认为 build/contracts')
    .option('-o, --output  [value]', '输出目标路径, 默认为 build')
    .option('-n, --network [value]', '指定使用的网络 ID')
    .option('-c, --client', '生成 client 模板')
    .option('-s, --server', '生成 server 模板')
    .option('-a, --abi', '生成 abi 模板')
    .action(function () {
        let option = Utils.parseOption(arguments);
        params = Utils.parseParams(arguments);
        // console.log(option, params);

        const input = Path.join(rootPath, params.input || 'build/contracts');
        const output = Path.join(rootPath, params.output || 'build')
        // console.log(rootPath, input, output);

        if (!Utils.isOkDirectory(input)) throw new Error('invalid input directory');
        Utils.mkOutputDirectory(output);

        const files = Fs.readdirSync(input);
        const metas = files.map((file) => {
            return require(Path.join(input, file));
        });

        const contracts = [];
        getContractAbis(metas, contracts);

        contracts.forEach(contract => {
            if (params.client) Utils.writeOutputFile(output, 'client', contract.contractName, formatClient(contract));
            if (params.server) Utils.writeOutputFile(output, 'server', contract.contractName, formatServer(contract));
            if (params.abi) Utils.writeOutputFile(output, 'abi', contract.contractName, formatAbiData(contract));
        });

        if (params.client) Utils.writeOutputFile(output, 'client', 'index', formatClientIndex(contracts));
        if (params.server) Utils.writeOutputFile(output, 'server', 'index', formatServerIndex(contracts));
    });

Program.parse(process.argv);

function getContractAbis(metas, contracts) {
    if (!contracts || !Array.isArray(contracts)) contracts = [];

    metas.forEach(element => {
        // 只有合约中有 network 地址的才需要直接使用 api 进行调研.
        if (JSON.stringify(element.networks) === '{}') return;

        const list = [];
        element.abi.forEach(abi => {
            if (abi.type === 'function') list.push(abi);
        });
        if (list.length <= 0) return;

        contracts.push({
            contractName: element.contractName,
            abi: list,
            originAbi: element.abi
        });
    });

    return contracts;
}

function formatClient(contract) {
    return Ejs.render(clientTemplate, { name: contract.contractName, abi: contract.abi });
}

function formatServer(contract) {
    return Ejs.render(serverTemplate, { name: contract.contractName, abi: contract.abi });
}

function formatAbiData(contract) {
    return JSON.stringify(contract.originAbi, null, 2);
}

function formatIndex(contracts) {
    const abis = [];
    contracts.forEach(element => {
        const abi = {
            // contractName: element.contractName.toLowerCase().replace(/^./, element.contractName[0].toUpperCase()),
            contractName: element.contractName.replace(/^./, element.contractName[0].toUpperCase()),
            file: element.contractName
        }
        abis.push(abi);
    });

    return abis;
}

function formatClientIndex(contracts) {
    return Ejs.render(indexTemplate, { abis: formatIndex(contracts), role: 'client' });
}

function formatServerIndex(contracts) {
    return Ejs.render(indexTemplate, { abis: formatIndex(contracts), role: 'server' });
}