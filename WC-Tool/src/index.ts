import { myWC } from './wc';

const main = async () => {
    const result = await myWC(process.argv, process.stdin)
}

main();