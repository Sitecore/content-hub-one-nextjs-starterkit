#!/usr/bin/env node
require('dotenv').config();
const https = require('https');
const axios = require('axios');
const fs = require('fs');
const green = '\x1b[32m';
const red = '\x1b[31m';
const white = '\x1b[37m';


const client_secret = process.env.SITECORE_CLIENT_SECRET; 
const client_id = process.env.SITECORE_CLIENT_ID;

if (client_secret != '' && client_id != '') {
    
   startSetup();

}
else {
    console.log(red,'Client ID or Client Secret not set. check your .env file. For more information check the readme.md file.');
}

async function startSetup() {

    let status = '';
    //Create Media Assets and Items 
    console.log('');
    console.log('1/4 Create Media Assets');
    status = await createMediaAssets();
    console.log('1/4 END - Create Media Assets: ' + status);

    //Push Content Types
    console.log('');
    console.log('2/4 START - Push Content Types');
    status = await pushContentTypes();
    console.log('2/4 END - Push Content Types: ' + status);

    //Push Content Items
    console.log('');
    console.log('3/4 START - Push Content Items ');
    status = await pushContentItems('menu');
    status = await pushContentItems('recipe');
    status = await pushContentItems('header');
    status = await pushContentItems('footer');
    status = await pushContentItems('homepage');
    console.log('3/4 END - Push Content Items: ' + status);

    //toDo: Publish Media and Content Items
    status = await publishContentItems();

    console.log('4/4 END - Publish Content Items: ' + status)

}

//Create Media Assets and Items 
async function createMediaAssets() {
   
   var status =  await runCommand("node uploadMedia.js");
    return status;
  
};
//Push Content Types
async function pushContentTypes() {
    console.log('Push Content Types');
    var status = await runCommand("ch-one-cli ser push content-type -f \"" + __dirname + "\\serialization\"");
    return status;
}
//Push Content Items
async function pushContentItems(contentType) {
    console.log('Push Content Items for ContentType: ' + contentType);
    var status = await runCommand("ch-one-cli serialization push content-item -c " + contentType + " -f \"" + __dirname + "\\serialization\"");

    return status;

}
//toDo: Publish Media
async function publishContentItems() {
    console.log('');
    console.log('4/4 START - Publish Items');
    var status = await runCommand("node publishItems.js");
    console.log('4/4 END - Publish Media Items : ' + status);

    return status;
}

async function runCommand (command) {
    const { exec } = require("child_process");
    await exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return 'ERROR';
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return 'STDERROR';
        }
        console.log(`${stdout}`);
    });

    return 'OK';
}
