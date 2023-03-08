const cmd = require('./cmd');
const color = require('./colorConstants');

//Push Content Types
async function pushContentTypes() {
    console.log(color.INFO,'Push Content Types...');
    var status = await cmd.runCommand("ch-one-cli ser push content-type -f \"" + cmd.getRootDirectory() + "\\serialization\"");
    return status;
}



//Push Content Items
async function pushContentItems(contentType) {
    console.log(color.INFO,'Push Content Items for ContentType: ' + contentType + '...');
    try {
        var status = await cmd.runCommand("ch-one-cli serialization push content-item -c " + contentType + " -f \"" + cmd.getRootDirectory() + "\\serialization\"");
    } catch (error) {
        console.log(color.ERROR,'Error (pushContentItems): ' + error)
        return status; 
    }
    return status;   
}

module.exports = {pushContentTypes,pushContentItems}