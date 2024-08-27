import {wc } from './wc';

const main = async () => {
    const result = await wc(process.argv, process.stdin)
}

main();