const { parallel, series } = require('gulp');
const { spawn, exec } = require("child_process");
const path = require("path")

function startRoot() {
    const getPath = path.join(__dirname, "/root")
    process.chdir(getPath)
    const start = spawn("npm start", { shell: true, detached: true, })
    start.stdout.on('data', data => {
        console.log(data.toString('utf-8'))
    })
}

function startDesignSystem() {
    const getPath = path.join(__dirname, "/designSystem")
    process.chdir(getPath)
    const start = spawn(`npm start`, { shell: true, detached: true, })
    start.stdout.on('data', data => {
        console.log(data.toString('utf-8'))
    })
}
function startAuth() {
    const getPath = path.join(__dirname, "/auth")
    process.chdir(getPath)
    const start = spawn(`npm start`, { shell: true, detached: true, })
    start.stdout.on('data', data => {
        console.log(data.toString('utf-8'))
    })
}
function startProperties() {
    const getPath = path.join(__dirname, "/properties")
    process.chdir(getPath)
    const start = spawn(`npm start`, { shell: true, detached: true, })
    start.stdout.on('data', data => {
        console.log(data.toString('utf-8'))
    })
}
function startSignup() {
    const getPath = path.join(__dirname, "/signup")
    process.chdir(getPath)
    const start = spawn(`npm start`, { shell: true, detached: true, })
    start.stdout.on('data', data => {
        console.log(data.toString('utf-8'))
    })
}
// function startDash() {
//     const getPath = path.join(__dirname, "/dashboard")
//     process.chdir(getPath)
//     const start = spawn(`npm start`, { shell: true, detached: true, })
//     start.stdout.on('data', data => {
//         console.log(data.toString('utf-8'))
//     })
// }
exports.default = parallel(startRoot, startAuth, startDesignSystem, startProperties, startSignup);
