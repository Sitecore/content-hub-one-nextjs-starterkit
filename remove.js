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


removeSetup()

async function removeSetup () {

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

    // delete content Items
    console.log('');
    console.log(color.INFO,'Step 1/3: Delete Content Items');
    for(var i in constants.contentItems) {

        var contentId = constants.contentItems[i];
        //TODO: check if item exists
        exists = await items.itemExists(client,contentId);
        if (exists) {
            // check if item is unpublished already
            var deleted = false;
            var counter = 0;
            while (!deleted && counter < 10) {        
                var item = await items.getItem(client,contentId);
                if (item != null) {

                    var published = publish.isPublished(item);
                    if (!published) {
                        await items.deleteItem(client, contentId); 
                        deleted = true;
                    }
                }
                counter++;
            }
            if (!deleted) {
                console.log(color.WARNING, 'Content Item ' + contentId + ' could not be deleted after ' + counter + ' iterations.')
            }
        } else {
            console.log(color.WARNING, 'Item with ID ' + contentId + ' does not exist');
        }   
        
    }
    console.log(color.SUCCESS,'Step 1 complete');
    
    // delete media items (files are deleted along with the item)
    console.log('');
    console.log(color.INFO,'Step 2/3: Delete Media Items');
    for (var i in constants.mediaItems) {
        var mediaId = constants.mediaItems[i];
        
        // Check if item exists        
        exists = await media.mediaItemExists(client,mediaId);
        
        if (exists) {
            // check if item is unpublished already
            var deleted = false;
            var counter = 0;
            while (!deleted && counter < 10) {        
                var mediaItem = await media.getMediaItem(client,mediaId);

                if (mediaItem != null) {

                    var published = publish.isPublished(mediaItem);

                    if (!published) {

                        await media.deleteMediaItem(client, mediaId);
                        deleted = true;
                    }
                }
                counter++;
            }
            if (!deleted) {
                console.log(color.WARNING, 'Media Item ' + mediaId + ' could not be deleted after ' + counter + ' iterations. It seems the item is still not fully unpublished. Please check and rerun the script when Item is unpublished.')
            }
        } else {
            console.log(color.WARNING, 'Media Item with ID ' + mediaId + ' does not exist');
        }   

    }
    console.log(color.SUCCESS,'Step 2 complete');

   
    // delete Content Types
    console.log('');
    console.log(color.INFO,'Step 3/3: Delete Content Type');
    for (var i in constants.contentTypes){
        contentTypeId = constants.contentTypes[i];
        await types.deleteContentType(client,contentTypeId);
    }


    console.log(color.SUCCESS,'Step 3 complete');

    console.log(color.INFO,'Remove Script executed successfully! Have fun!');

}
