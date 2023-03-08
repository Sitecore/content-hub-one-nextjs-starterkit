#!/usr/bin/env node
require('dotenv').config();
const types = require ('./lib/setupscripts/types');
const auth = require ('./lib/setupscripts/auth');
const items = require('./lib/setupscripts/items');
const publish = require('./lib/setupscripts/publishing');
const color = require('./lib/setupscripts/colorConstants');
const media = require('./lib/setupscripts/media');
const constants = require ('./lib/setupscripts/constants');


const client_id = process.env.SITECORE_CLIENT_ID;
const client_secret = process.env.SITECORE_CLIENT_SECRET;


unpublishSetup()

async function unpublishSetup () {

    // authenticate
    var client;
    var exists;
    if (client_id != null && client_secret != null ) {
        client = await auth.authenticate(client_id,client_secret);
    } else {
        console.log(color.WARNING,'clientId or clientsecret not properly set in constants file: ' + client_id + ' ### ' + client_secret);
    }
    if (client == null) {
        console.log(color.WARNING,'No Client retrieved')
        return;
    } 

    // unpublish content Items
    console.log('');
    console.log(color.INFO,'Step 1/2: Unpublish Content Items');

    for (var i in constants.contentItems) {
        var contentId = constants.contentItems[i];
        exists = await items.itemExists(client,contentId);
        if (exists) {
            await publish.unpublishItem(client, contentId);
        } else {
            console.log(color.WARNING, 'Item with ID ' + contentId + ' does not exist.')
        }
    }
    console.log(color.SUCCESS,'Step 1 complete');
    
    // unpublish media Items
    console.log('');
    console.log(color.INFO,'Step 2/2: Unpublish Media Items');

    for (var i in constants.mediaItems)  {
        var mediaId = constants.mediaItems[i];
        exists = await media.mediaItemExists(client,mediaId);
        if (exists) {
            await publish.unpublishMediaItem(client, mediaId);
        } else {
            console.log(color.WARNING, 'Media Item with ID ' + mediaId + ' does not exist.')
        }
    }
    console.log(color.SUCCESS,'Step 2 complete');
   

    
    
    

   

}
