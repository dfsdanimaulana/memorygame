'use strict'

// Auto commit to git script
const { exec } = require('child_process')
const chalk = require('chalk')

let args = process.argv
args.splice(0, 2)

let str = args.join(' ')

if (!str || str === '' || str === ' ') {
    console.log(chalk.red('please input some message!'))
    return
}
console.log(chalk.magenta.italic('adding untracked files...'))
exec('git add .', cbAdd)

function cbAdd(err) {
    if (err) {
        console.log(err)
        return
    }
    console.log(chalk.magenta.italic('commiting files...\n'))
    exec(`git commit -m "${str}"`, cbCommit)
}

function cbCommit(err, strout) {
    if (err) {
        console.log(err)
        return
    }
    console.log(chalk.green(strout))
    console.log(
        chalk.blue(`commit done with message : ${chalk.yellow(`"${str}"`)}`)
    )
}

// npm run commit -- message
