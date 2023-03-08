#!/usr/bin/env node
require('dotenv').config();
const https = require('https');
const axios = require('axios');
const fs = require('fs');
const color = require('./colorConstants');
const cmd = require('./cmd');

async function createMediaItemWithAPI(token,fileName, fileType, fileSize,itemId,itemName,itemDescripton){

    if (token == null || token == '') {
      console.log(color.ERROR,"ERROR - token not set");
      return 'ERROR';
    }
    
    if ((fileName == '') || (fileType == '') || (fileSize == '') || (itemId == '') || (itemName == '') || (itemDescripton == '')) {
      console.log(color.ERROR,'ERROR - Input Parameters incomplete! fileName: ' + fileName + ' fileType: ' +  fileType + 'fileSize: ' + fileSize);
      return 'ERROR';
    }
    //Step 1: Create upload link for file upload
    var retArray = await createUploadLink(token,fileType,fileSize,fileName);
    uploadUrl = retArray[1];
    fileId = retArray[0];

    if (fileId!='' && uploadUrl != '') 
    {
        //Step 2: Upload the asset
        var uploadStatus = await uploadAsset(uploadUrl,fileName);
        
        if (uploadStatus === '201') {

            //Step 3: Complete the upload
            var completeStatus = await completeUpload(token, fileId,fileSize,fileType);

            //Step 4: Create Media Item connected to File
            var mediaItemStatus = await createMediaItem(token,itemId, itemName,itemDescripton, fileId,fileName);
        }
    }
    else 
    {
        console.log(color.ERROR,'ERROR - fileId or uploadUrl not set! fileId: ' + fileId + ' uploadUrl: ' + uploadUrl)
    }

    return 'OK';//TODO:
  
}
  
async function createUploadLink (authToken,contentType,contentLength,fileName) {
    
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
        console.log(color.ERROR, 'Error: ' + error);
    });

    fileId = fileId.replaceAll('"','');
    uploadUrl = uploadUrl.replaceAll('"','');
    
    //console.log(color.INFO,'UploadUrl: ' + uploadUrl);
    //console.log(color.INFO,'FileId: ' + fileId);
    console.log(color.SUCCESS,'UploadUrl and FileId generated!');
    return [fileId,uploadUrl];
}
async function uploadAsset (url, fileName) {
    let status;

    var file = fs.readFileSync(cmd.getRootDirectory() + '/setup/' + fileName);;
    
    //console.log(color.INFO,'File: ');
    //console.log(color.INFO, file);

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
       
    })
    .catch(function (error) {
        console.log(color.ERROR, 'ERROR - Upload Status: ' + JSON.stringify(error.response.status));
        status = error.response.status;
        console.log(color.INFO, error);
    });

    console.log(color.SUCCESS,'Asset Upload succeeded with Status: ' + status);
    return status;
}
async function completeUpload (authToken, fileId,fileLength,fileType) {

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

    })
    .catch(function (error) {
        status = JSON.stringify(error.status);
        console.log(color.ERROR,'Status: ' + status);
        console.log(color.INFO,'Error - ' + error);
    });

    console.log(color.SUCCESS,'Upload completed with status: ' + status);
    return status;
}
async function createMediaItem (authToken,itemId, itemName,itemDescripton, fileId, fileName) {
    console.log(color.INFO,'Create Media Item');

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
    })
    .catch(function (error) {
        status = JSON.stringify(error.status);
        console.log(color.ERROR,'Status: ' + status);
        console.log(color.INFO,error);
    });

    console.log(color.SUCCESS,'Media Item created with status: ' + status);
    return status;
}

module.exports = {createMediaItemWithAPI}