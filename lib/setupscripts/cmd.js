const color = require('./colorConstants');


async function runCommand (command) {
    const { exec } = require("child_process");
    try {
        await exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(color.ERROR,`error: ${error.message}`);
                return 'ERROR';
            }
            if (stderr) {
                console.log(color.ERROR,`stderr: ${stderr}`);
                return 'STDERROR';
            }
            console.log(color.INFO,`${stdout}`);
        });
    } catch(error) {
        console.log(color.ERROR,'Error (runCommand): ' + error)
    }

    return 'OK';
}

function getRootDirectory() {

    var root = __dirname.replace("\\lib\\setupscripts","");;
    return root;
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
module.exports = {runCommand,getRootDirectory,sleep}