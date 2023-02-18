#!/usr/bin/env node
require('dotenv').config();
const https = require('https');
const axios = require('axios');
const fs = require('fs');
const { start } = require('repl');
const green = '\x1b[32m';
const red = '\x1b[31m';
const white = '\x1b[37m';


const client_secret = process.env.SITECORE_CLIENT_SECRET; 
const client_id = process.env.SITECORE_CLIENT_ID;
let token = '';

if (client_secret != '' && client_id != '') {
    startUndo();
}
else {
    console.log(red,'Client ID or Client Secret not set. check your .env file. For more information check the readme.md file.');
}

async function startUndo() {
//toDo: Authenticate

    token = await authenticate(client_id,client_secret);
    console.log('TOKEN: ' + token);

    let status ='';
    // unpublish Content Items
    status = await unpublishContentItem(token,'1VcOwIfbqk6toyJiKuOWWg'); //homepage
    status = await unpublishContentItem(token,'RaUpzYq9-U6mkdOUD8hMqg'); //header
    status = await unpublishContentItem(token,'ERTQNM3AxUWpbhIBhcBe8g'); //footer
    status = await unpublishContentItem(token,'uP-cIOB-LUOfJcFmHLi17w'); //menu
    status = await unpublishContentItem(token,'OSQicScOMEKNxsx3sqew0w'); //menu
    status = await unpublishContentItem(token,'G7Jr0W6Z0UiB7MnXv-r9bg'); //menu
    status = await unpublishContentItem(token,'-2OFtOw5zEekwWNhAocubQ'); //recipe
    status = await unpublishContentItem(token,'7DHrtexF3Eew9M5kow5h7A'); //recipe
    status = await unpublishContentItem(token,'T1t4v4fg4EqBDv3dzol2wA'); //recipe
    status = await unpublishContentItem(token,'W0XD7ovswU2ctmOx-Zw45Q'); //recipe

    // unpublish Media Items
    status = await unpublishMediaItem(token,'WdokfNA8xkeL6SV8sTfv8A'); //Content Hub ONE logo
    status = await unpublishMediaItem(token,'YPNKM-DYFkCoy8P4F4OY-Q'); //Hero Image Homepage
    status = await unpublishMediaItem(token,'e-oVETnuUEij414Iq6gcfg'); //SitecoreLogo
    status = await unpublishMediaItem(token,'dkjRFDWSN0KnHk1VvnDZLw'); //CreamLatte
    status = await unpublishMediaItem(token,'gRTwjIf9QkOQyHYXgAFwbw'); //Donuts
    status = await unpublishMediaItem(token,'Qo4o8lnJY0610sKe0Xlg3g'); //Pizza
    status = await unpublishMediaItem(token,'rOfvb_Ix9kmeT7eRr4N5wg'); //Soft Ice

    // delete Content Items (Homepage, Header, Footer, Menu, Recipe)
    await deleteContentItem(token,'1VcOwIfbqk6toyJiKuOWWg'); //homepage
    await deleteContentItem(token,'RaUpzYq9-U6mkdOUD8hMqg'); //header
    await deleteContentItem(token,'ERTQNM3AxUWpbhIBhcBe8g'); //footer
    await deleteContentItem(token,'uP-cIOB-LUOfJcFmHLi17w'); //menu
    await deleteContentItem(token,'OSQicScOMEKNxsx3sqew0w'); //menu
    await deleteContentItem(token,'G7Jr0W6Z0UiB7MnXv-r9bg'); //menu
    await deleteContentItem(token,'-2OFtOw5zEekwWNhAocubQ'); //recipe
    await deleteContentItem(token,'7DHrtexF3Eew9M5kow5h7A'); //recipe
    await deleteContentItem(token,'T1t4v4fg4EqBDv3dzol2wA'); //recipe
    await deleteContentItem(token,'W0XD7ovswU2ctmOx-Zw45Q'); //recipe

    //toDo: delete Content Types (Homepage, Header, Footer, Menu, Recipe)
    await deleteContentType(token,'test123'); //Dummy
    await deleteContentType(token,'homepage'); 
    await deleteContentType(token,'footer'); 
    await deleteContentType(token,'header'); 
    await deleteContentType(token,'menu'); 
    await deleteContentType(token,'recipe'); 

    //Delete Media Items and Assets
    //deleteMediaItemAndAsset(token,''); ???
    await deleteMediaItemAndAsset(token,'WdokfNA8xkeL6SV8sTfv8A'); //Content Hub ONE logo
    await deleteMediaItemAndAsset(token,'YPNKM-DYFkCoy8P4F4OY-Q'); //Hero Image Homepage
    await deleteMediaItemAndAsset(token,'e-oVETnuUEij414Iq6gcfg'); //SitecoreLogo
    await deleteMediaItemAndAsset(token,'dkjRFDWSN0KnHk1VvnDZLw'); //CreamLatte
    await deleteMediaItemAndAsset(token,'gRTwjIf9QkOQyHYXgAFwbw'); //Donuts
    await deleteMediaItemAndAsset(token,'Qo4o8lnJY0610sKe0Xlg3g'); //Pizza
    await deleteMediaItemAndAsset(token,'rOfvb_Ix9kmeT7eRr4N5wg'); //Soft Ice
}
/********************************************* */

//unpublish Content Items
async function unpublishContentItem(authToken, itemId) {
    console.log('');
    console.log(green, 'Unpublish Content Item '+ itemId);

    //var data = JSON.stringify({"id": itemId,"name": itemName,"description": itemDescripton,"fileId": fileId});
    let status;

    var config = {
        method: 'delete',
        url: 'https://content-api.sitecorecloud.io/api/content/v1/items/'+itemId+'/publish',
        headers: { 
            'Content-Type': 'application/json', 
            'Accept': 'text/plain', 
            'Authorization': 'Bearer ' + authToken
        },
        data: ''
    };

    await axios(config)
    .then(function (response) {
        status = JSON.stringify(response.status);
        console.log(white,'Unpublish Content Item Status: ' + status);
    })
    .catch(function (error) {
        status = JSON.stringify(error.status);
        console.log(red,'Status: ' + status);
        console.log(white,error);
    });

    console.log(green,'Unpublished Content Item');
    return status;
}

//toDo: unpublish Media Items
async function unpublishMediaItem(authToken, itemId) {
    console.log('');
    console.log(green, 'Unpublish Media Item ' + itemId);
    
    //var data = JSON.stringify({"id": itemId,"name": itemName,"description": itemDescripton,"fileId": fileId});
    let status;

    var config = {
        method: 'delete',
        url: 'https://content-api.sitecorecloud.io/api/content/v1/media/'+itemId+'/publish',
        headers: { 
            'Content-Type': 'application/json', 
            'Accept': 'text/plain', 
            'Authorization': 'Bearer ' + authToken
        }
    };

    await axios(config)
    .then(function (response) {
        status = JSON.stringify(response.status);
        console.log(white,'Unpublish Media Item Status: ' + status);
    })
    .catch(function (error) {
        status = JSON.stringify(error.status);
        console.log(red,'Status: ' + status);
        console.log(white,error);
    });

    console.log(green,'Unpublished Media Item');
    return status;
    
}

//toDo: delete Content Items (Homepage, Header, Footer, Menu, Recipe)
async function deleteContentItem(authToken, itemId) {
    console.log('');
    console.log(green, 'Delete Content Item '+ itemId);

    //var data = JSON.stringify({"id": itemId,"name": itemName,"description": itemDescripton,"fileId": fileId});
    let status;

    var config = {
        method: 'delete',
        url: 'https://content-api.sitecorecloud.io/api/content/v1/items/' + itemId,
        headers: { 
            'Content-Type': 'application/json', 
            'Accept': 'text/plain', 
            'Authorization': 'Bearer ' + authToken
        }
    };

    await axios(config)
    .then(function (response) {
        status = JSON.stringify(response.status);
        console.log(white,'Delete Content Item Status: ' + status);
    })
    .catch(function (error) {
        status = JSON.stringify(error.status);
        console.log(red,'Status: ' + status);
        console.log(white,error);
    });

    console.log(green,'Deleted Content Item');
    return status;  
}

//toDo: delete Content Types (Homepage, Header, Footer, Menu, Recipe)

async function deleteContentType(authToken, typeId) {
    console.log('');
    console.log(green, 'Delete Content Type '+ typeId);


    //var data = JSON.stringify({"id": itemId,"name": itemName,"description": itemDescripton,"fileId": fileId});
    let status;

    var config = {
        method: 'delete',
        url: 'https://content-api.sitecorecloud.io/api/content/v1/types/' + typeId,
        headers: { 
            'Content-Type': 'application/json', 
            'Accept': 'text/plain', 
            'Authorization': 'Bearer ' + authToken
        }
    };

    await axios(config)
    .then(function (response) {
        status = JSON.stringify(response.status);
        console.log(white,'Delete Content Type Status: ' + status);
    })
    .catch(function (error) {
        status = JSON.stringify(error.status);
        console.log(red,'Status: ' + status);
        console.log(white,error);
    });

    console.log(green,'Deleted Content Type');
    return status;  
}

//toDo: Delete Media Items and Assets
async function deleteMediaItemAndAsset(authToken, itemId) {
    deleteMediaItem(authToken,itemId);
    deleteMediaAsset(authToken,itemId);
}

async function deleteMediaItem (authToken, itemId) {
    console.log('');
    console.log(green, 'Delete Media Item '+ itemId);


    //var data = JSON.stringify({"id": itemId,"name": itemName,"description": itemDescripton,"fileId": fileId});
    let status;

    var config = {
        method: 'delete',
        url: 'https://content-api.sitecorecloud.io/api/content/v1/media/' + itemId,
        headers: { 
            'Content-Type': 'application/json', 
            'Accept': 'text/plain', 
            'Authorization': 'Bearer ' + authToken
        }
    };

    await axios(config)
    .then(function (response) {
        status = JSON.stringify(response.status);
        console.log(white,'Delete Media Item Status: ' + status);
    })
    .catch(function (error) {
        status = JSON.stringify(error.status);
        console.log(red,'Status: ' + status);
        console.log(white,error);
    });

    console.log(green,'Deleted Media Item');
    return status;  
}

async function deleteMediaAsset(authToken,itemId) {
//toDo...
}

async function authenticate (clientID, clientSecret) 
{
    console.log('');
    console.log(green,'Step 1/5: Get Bearer Token');
    var token = '';

    var qs = require('qs');
    var data = qs.stringify({
        'grant_type': 'client_credentials',
        'client_id': clientID,
        'client_secret': clientSecret,
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

