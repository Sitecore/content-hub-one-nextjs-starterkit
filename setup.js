#!/usr/bin/env node
require('dotenv').config();
const auth = require ('./lib/setupscripts/auth');
const mediaAPI =require('./lib/setupscripts/mediaUploadAPI');
const serialize =require('./lib/setupscripts/serialize');
const media = require('./lib/setupscripts/media');
const color = require('./lib/setupscripts/colorConstants');
const constants = require('./lib/setupscripts/constants');
const cmd = require('./lib/setupscripts/cmd');


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

    // Create Media Assets and Media Items
    console.log('');
    console.log(color.INFO,'Step 1/3: Create Media Assets');
    exists = await media.mediaItemExists(client, 'WdokfNA8xkeL6SV8sTfv8A');
    if (!exists) {
        await mediaAPI.createMediaItemWithAPI(token,'ch-one-logo.png', //fileName
                            'image/png', //fileType
                            '13213', //fileSize
                            'WdokfNA8xkeL6SV8sTfv8A', //Media Item Id: leave empty when not needed, e.g. ''
                            'Content Hub ONE Logo',//Media Item Name.
                            'Content Hub ONE, a great choice for Omnichannel Marketing'); //Media Item Description
        console.log(color.SUCCESS,'Media Item created: WdokfNA8xkeL6SV8sTfv8A');
    } else {
        console.log(color.WARNING,'Media Item WdokfNA8xkeL6SV8sTfv8A already exists');
    }
    exists = await media.mediaItemExists(client, 'YPNKM-DYFkCoy8P4F4OY-Q');
    if (!exists) {
        await mediaAPI.createMediaItemWithAPI(token,'hero-image-homepage.jpg', //fileName
                            'image/jpeg', //fileType
                            '13213', //fileSize
                            'YPNKM-DYFkCoy8P4F4OY-Q', //Media Item Id: leave empty when not needed, e.g. ''
                            'Homepage Hero Image',//Media Item Name.
                            'Father and daughter in kitchen'); //Media Item Description
        console.log(color.SUCCESS,'Media Item created: YPNKM-DYFkCoy8P4F4OY-Q');
    }
    exists = await media.mediaItemExists(client, 'e-oVETnuUEij414Iq6gcfg');
    if (!exists) {    
        await mediaAPI.createMediaItemWithAPI(token,'sitecore-logo.png', //fileName
                            'image/png', //fileType
                            '13213', //fileSize
                            'e-oVETnuUEij414Iq6gcfg', //Media Item Id: leave empty when not needed, e.g. ''
                            'Sitecore Logo',//Media Item Name.
                            'Sitecore, your partner for awesome web experiences'); //Media Item Description
        console.log(color.SUCCESS,'Media Item created: e-oVETnuUEij414Iq6gcfg');
    }
    exists = await media.mediaItemExists(client, 'dkjRFDWSN0KnHk1VvnDZLw');
    if (!exists) {
        await mediaAPI.createMediaItemWithAPI(token,'cream-latte.jpg', //fileName
                            'image/jpeg', //fileType
                            '13213', //fileSize
                            'dkjRFDWSN0KnHk1VvnDZLw', //Media Item Id: leave empty when not needed, e.g. ''
                            'Cream Latte',//Media Item Name.
                            'Tasty Cream Latte'); //Media Item Description
        console.log(color.SUCCESS,'Media Item created: dkjRFDWSN0KnHk1VvnDZLw');
    }
    exists = await media.mediaItemExists(client, 'gRTwjIf9QkOQyHYXgAFwbw');
    if (!exists) {
        await mediaAPI.createMediaItemWithAPI(token,'donuts.jpg', //fileName
                            'image/jpeg', //fileType
                            '13213', //fileSize
                            'gRTwjIf9QkOQyHYXgAFwbw', //Media Item Id: leave empty when not needed, e.g. ''
                            'Donuts',//Media Item Name.
                            'Tasty Donuts'); //Media Item Description
        console.log(color.SUCCESS,'Media Item created: gRTwjIf9QkOQyHYXgAFwbw');
    }
    exists = await media.mediaItemExists(client, 'Qo4o8lnJY0610sKe0Xlg3g');
    if (!exists) {
        await mediaAPI.createMediaItemWithAPI(token,'pizza.jpg', //fileName
                            'image/jpeg', //fileType
                            '13213', //fileSize
                            'Qo4o8lnJY0610sKe0Xlg3g', //Media Item Id: leave empty when not needed, e.g. ''
                            'Pizza',//Media Item Name.
                            'Tasty Pizza'); //Media Item Description
        console.log(color.SUCCESS,'Media Item created: Qo4o8lnJY0610sKe0Xlg3g');
    }
    exists = await media.mediaItemExists(client, 'rOfvb_Ix9kmeT7eRr4N5wg');
    if (!exists) {
        await mediaAPI.createMediaItemWithAPI(token,'soft-ice.jpg', //fileName
                            'image/jpeg', //fileType
                            '13213', //fileSize
                            'rOfvb_Ix9kmeT7eRr4N5wg', //Media Item Id: leave empty when not needed, e.g. ''
                            'Soft Ice',//Media Item Name.
                            'Soft Ice Cream'); //Media Item Description
        console.log(color.SUCCESS,'Media Item created: rOfvb_Ix9kmeT7eRr4N5wg');
    }
    console.log(color.SUCCESS,'Completed - Create Media Assets');


    // Push Content Types
    console.log('');
    console.log(color.INFO,'Step 2/3: Push Content Types');
    var status = await serialize.pushContentTypes();
    
    
    // add Sleep timer to ensure that content items are installed after content types
    console.log(color.INFO,'Wait 10 seconds so push of content types can be completed');
    await cmd.sleep(10000);
    console.log(color.INFO,'Wait done');
    console.log(color.SUCCESS,'Completed - Push Content Types: ' + status);
    
    // Push Content Items
    console.log('');
    console.log(color.INFO,'Step 3/3: Push Content Items');
    for (var i in constants.contentTypes) {
        var typeId = constants.contentTypes[i];
        status = await serialize.pushContentItems(typeId);
    }

    console.log(color.SUCCESS,'Completed - Push Content Items');
    
    console.log(color.INFO, 'Script Completed successfully! Have fun!');

}