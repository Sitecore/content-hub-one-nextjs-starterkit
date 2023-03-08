#!/usr/bin/env node
require('dotenv').config();
const auth = require ('./lib/setupscripts/auth');
const publish = require('./lib/setupscripts/publishing');
const mediaAPI =require('./lib/setupscripts/mediaUploadAPI');
const serialize =require('./lib/setupscripts/serialize');
const media = require('./lib/setupscripts/media');
const color = require('./lib/setupscripts/colorConstants');
const constants = require('./lib/setupscripts/constants');

const client_id = process.env.SITECORE_CLIENT_ID;
const client_secret = process.env.SITECORE_CLIENT_SECRET;

startSetup();

async function startSetup(){
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

    const token = await auth.authenticateAPI(client_id, client_secret);

    // Publish Media Items
    console.log('');
    console.log(color.INFO,'Step 1: Publish Media Items');
    for (var i in constants.mediaItems) {
        var mediaId = constants.mediaItems[i];
        await publish.publishMediaItem(client,mediaId);
    }
    console.log(color.SUCCESS,'Completed - Publish Media Items');


    console.log(color.SUCCESS,'Completed - Push Content Items');
    // Publish Content Items
    console.log('');
    console.log(color.INFO,'Step 2: Publish Content Items');
    for (var i in constants.contentItems) {
        var contentId = constants.contentItems[i];
        await publish.publishItem(client, contentId); //homepage
    }

    console.log(color.SUCCESS,'Completed - Create Media Assets');

    console.log(color.INFO, 'Script Completed successfully! Have fun!');

}