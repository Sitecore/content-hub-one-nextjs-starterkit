const sdk = require('@sitecore/contenthub-one-sdk')
const color = require('./colorConstants');

async function deleteContentType (client,contentTypeId) {
    try {
        await client.contentTypes.deleteAsync(contentTypeId);
        console.log(color.SUCCESS,'Content Type ' + contentTypeId + ' has been deleted');
    } catch (error) 
    {
        console.log(color.ERROR,'ERROR: ' + error);
    }
}

async function createContentType (client,contentTypeId) {
    const contentType = new sdk.ContentType("<content_type_id>", {
        name: { "en-US": "<content_type_name>" },
        fields: [
            new sdk.ContentTypeField("title", {
                name: { "en-US": "Title" },
            }),
            new sdk.ContentTypeField("related", {
                name: { "en-US": "Title" },
                type: "Reference",
            }),
        ],
    });  
    
    const a = await client.contentTypes.createAsync(contentType);
}

async function getContentType(client, contentTypeId) {
    const contentType = await client.contentTypes.singleAsync(contentTypeId);

    return contentType;
}


async function contentTypeExists(client, contentTypeId){
    var type = await client.contentTypes.singleAsync(contentTypeId);

    if (type != null) {return true;}

    return false;

}

async function contentTypeIsUsed(client,contentTypeId) {

}

module.exports = {createContentType,getContentType,deleteContentType,contentTypeExists}