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
    start();
}
else {
    console.log(red,'Client ID or Client Secret not set. check your .env file. For more information check the readme.md file.');
}

async function start () {
    await mediaUploadFunction('ch-one-logo.png', //fileName
                        'image/png', //fileType
                        '13213', //fileSize
                        'WdokfNA8xkeL6SV8sTfv8A', //Media Item Id: leave empty when not needed, e.g. ''
                        'Content Hub ONE Logo',//Media Item Name.
                        'Content Hub ONE, a great choice for Omnichannel Marketing'); //Media Item Description

    await mediaUploadFunction('hero-image-homepage.jpg', //fileName
                        'image/jpeg', //fileType
                        '13213', //fileSize
                        'YPNKM-DYFkCoy8P4F4OY-Q', //Media Item Id: leave empty when not needed, e.g. ''
                        'Homepage Hero Image',//Media Item Name.
                        'Father and daughter in kitchen'); //Media Item Description

    await mediaUploadFunction('sitecore-logo.png', //fileName
                        'image/png', //fileType
                        '13213', //fileSize
                        'e-oVETnuUEij414Iq6gcfg', //Media Item Id: leave empty when not needed, e.g. ''
                        'Sitecore Logo',//Media Item Name.
                        'Sitecore, your partner for awesome web experiences'); //Media Item Description

    await mediaUploadFunction('cream-latte.jpg', //fileName
                        'image/jpeg', //fileType
                        '13213', //fileSize
                        'dkjRFDWSN0KnHk1VvnDZLw', //Media Item Id: leave empty when not needed, e.g. ''
                        'Cream Latte',//Media Item Name.
                        'Tasty Cream Latte'); //Media Item Description

    await mediaUploadFunction('donuts.jpg', //fileName
                        'image/jpeg', //fileType
                        '13213', //fileSize
                        'gRTwjIf9QkOQyHYXgAFwbw', //Media Item Id: leave empty when not needed, e.g. ''
                        'Donuts',//Media Item Name.
                        'Tasty Donuts'); //Media Item Description

    await mediaUploadFunction('pizza.jpg', //fileName
                        'image/jpeg', //fileType
                        '13213', //fileSize
                        'Qo4o8lnJY0610sKe0Xlg3g', //Media Item Id: leave empty when not needed, e.g. ''
                        'Pizza',//Media Item Name.
                        'Tasty Pizza'); //Media Item Description

    await mediaUploadFunction('soft-ice.jpg', //fileName
                        'image/jpeg', //fileType
                        '13213', //fileSize
                        'rOfvb_Ix9kmeT7eRr4N5wg', //Media Item Id: leave empty when not needed, e.g. ''
                        'Soft Ice',//Media Item Name.
                        'Soft Ice Cream'); //Media Item Description
}

async function mediaUploadFunction(fileName, fileType, fileSize,itemId,itemName,itemDescripton) {
    console.log('');
    console.log(white,'******************');
    console.log(green,'Start Setup - ' + fileName);

    let token;
    let uploadUrl;
    let fileId;

    if ((fileName != '') && (fileType != '') && (fileSize != '') && (itemId != '') && (itemName != '') && (itemDescripton != '')) 
    {
        //Step 1: Authenticate using clientId and clientSecret maintained in .env file
        token = await authenticate();

        //Step 2: Create upload link for file upload
        var retArray = await createUploadLink(token,fileType,fileSize,fileName);
        uploadUrl = retArray[1];
        fileId = retArray[0];

        if (fileId!='' && uploadUrl != '') 
        {
            //Step 3: Upload the asset
            var uploadStatus = await uploadAsset(uploadUrl,fileName);
            
            if (uploadStatus === '201') {

                //Step 4: Complete the upload
                var completeStatus = await completeUpload(token, fileId,fileSize,fileType);

                //Step 5: Create Media Item connected to File
                var mediaItemStatus = await createMediaItem(token,itemId, itemName,itemDescripton, fileId,fileName);
            }
        }
        else 
        {
            console.log(red,'ERROR - fileId or uploadUrl not set! fileId: ' + fileId + ' uploadUrl: ' + uploadUrl)
        }
    }   
    else 
    {
        console.log(red,'ERROR - Input Parameters incomplete! fileName: ' + fileName + ' fileType: ' +  fileType + 'fileSize: ' + fileSize)
    }
    
    console.log(green,'End Setup');
}

async function authenticate () 
{
    console.log('');
    console.log(green,'Step 1/5: Get Bearer Token');
    var token = '';

    var qs = require('qs');
    var data = qs.stringify({
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret,
        'audience': 'https://api.sitecorecloud.io' 
    });
    
    var config = {
        method: 'post',
        url: 'https://auth.sitecorecloud.io/oauth/token',
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded', 
        },
        data : data
    };

    await axios(config)
    .then(function (response) {
        token = JSON.stringify(response.data.access_token);
        console.log(white,token.substring(0,20) + '...');
    })
    .catch(function (error) {
        console.log(red,'ERROR: ' + error);
    });

    token = token.replaceAll('"','');
    console.log(green,'Token Generated: ' + token.substring(0,10) + '...');

    return token;
}
async function createUploadLink (authToken,contentType,contentLength,fileName) 
{
    console.log('');
    console.log(green, 'Step 2/5: Create Uploadlink');
    
    var data = JSON.stringify({"filename": fileName});
    let fileId;
    let uploadUrl;
    var config = {
    method: 'post',
    url: 'https://mms-upload.sitecorecloud.io/api/media/v1/upload/link/generate',
    headers: { 
        'x-mms-content-type': contentType, 
        'x-mms-content-length': contentLength, 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer ' + authToken
    },
    data : data
    };

    await axios(config)
    .then(function (response) {
        fileId = JSON.stringify(response.data.fileId);
        uploadUrl = JSON.stringify(response.data.link);
    })
    .catch(function (error) {
        console.log(red, 'Error: ' + error);
    });

    fileId = fileId.replaceAll('"','');
    uploadUrl = uploadUrl.replaceAll('"','');
    
    console.log(white,'UploadUrl: ' + uploadUrl);
    console.log(white,'FileId: ' + fileId);
    console.log(green,'UploadUrl and FileId generated!');
    return [fileId,uploadUrl];
}
async function uploadAsset (url, fileName) {
    console.log('');
    console.log(green, 'Step 3/5: Upload Asset');
    let status;
    
    var file = fs.readFileSync(__dirname + '/setup/' + fileName);;
    
    console.log(white,'File: ');
    console.log(white, file);

    var config = {
        method: 'put',
        url: url,
        headers: { 
            'Content-Type': 'application/json', 
            'Application': 'application/json'
        },
        data : file
    };

    await axios(config)
    .then(function (response) {
        status = JSON.stringify(response.status);
        console.log(white,'Upload Status: ' + status);
    })
    .catch(function (error) {
        console.log(red, 'ERROR - Upload Status: ' + JSON.stringify(error.response.status));
        status = error.response.status;
        console.log(white, error);
    });

    console.log(green,'Asset Upload done!');
    return status;
}
async function completeUpload (authToken, fileId,fileLength,fileType) {
    console.log('');
    console.log(green,'Step 4/5: Complete Upload');
    let status;
    var data = JSON.stringify({"fileId":fileId});

    var config = {
        method: 'post',
        url: 'https://mms-upload.sitecorecloud.io/api/media/v1/upload/link/complete',
        headers: { 
            'x-mms-content-length': fileLength, 
            'x-mms-content-type': fileType, 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + authToken
        },
        data : data
    };

    await axios(config)
    .then(function (response) {
        status = JSON.stringify(response.status);
        console.log(white,'Completion Status: ' + status);
    })
    .catch(function (error) {
        status = JSON.stringify(error.status);
        console.log(red,'Status: ' + status);
        console.log(white,'Error - ' + error);
    });

    console.log(green,'Complete Upload - Done')
    return status;
}
async function createMediaItem (authToken,itemId, itemName,itemDescripton, fileId, fileName) {
    console.log('');
    console.log(green,'Step 5/5: Create Media Item');

    if (itemId === '') {itemId = fileId;}
    if (itemName === '') {itemName = fileName;}

    var data = JSON.stringify({"id": itemId,"name": itemName,"description": itemDescripton,"fileId": fileId});
    let status;

    var config = {
        method: 'post',
        url: 'https://content-api.sitecorecloud.io/api/content/v1/media',
        headers: { 
            'Content-Type': 'application/json', 
            'Accept': 'text/plain', 
            'Authorization': 'Bearer ' + authToken
        },
        data : data
    };

    await axios(config)
    .then(function (response) {
        status = JSON.stringify(response.status);
        console.log(white,'Media Item Status: ' + status);
    })
    .catch(function (error) {
        status = JSON.stringify(error.status);
        console.log(red,'Status: ' + status);
        console.log(white,error);
    });

    console.log(green,'Media Item created');
    return status;
}

