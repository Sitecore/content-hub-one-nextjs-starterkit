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

let token;

if (client_secret != '' && client_id != '') {
    start();
}
else {
    console.log(red,'Client ID or Client Secret not set. check your .env file. For more information check the readme.md file.');
}

async function start () {
    token = await authenticate();

    await publishMediaItem(token,'WdokfNA8xkeL6SV8sTfv8A'); //Content Hub ONE logo
    await publishMediaItem(token,'YPNKM-DYFkCoy8P4F4OY-Q'); //Hero Image Homepage
    await publishMediaItem(token,'e-oVETnuUEij414Iq6gcfg'); //SitecoreLogo
    await publishMediaItem(token,'dkjRFDWSN0KnHk1VvnDZLw'); //CreamLatte
    await publishMediaItem(token,'gRTwjIf9QkOQyHYXgAFwbw'); //Donuts
    await publishMediaItem(token,'Qo4o8lnJY0610sKe0Xlg3g'); //Pizza
    await publishMediaItem(token,'rOfvb_Ix9kmeT7eRr4N5wg'); //Soft Ice

    await publishContentItem(token, '1VcOwIfbqk6toyJiKuOWWg'); //homepage
    await publishContentItem(token, 'RaUpzYq9-U6mkdOUD8hMqg'); //header
    await publishContentItem(token, 'ERTQNM3AxUWpbhIBhcBe8g'); //footer
    await publishContentItem(token, 'uP-cIOB-LUOfJcFmHLi17w'); //menu
    await publishContentItem(token, 'OSQicScOMEKNxsx3sqew0w'); //menu
    await publishContentItem(token, 'G7Jr0W6Z0UiB7MnXv-r9bg'); //menu
    await publishContentItem(token, '-2OFtOw5zEekwWNhAocubQ'); //recipe
    await publishContentItem(token, '7DHrtexF3Eew9M5kow5h7A'); //recipe
    await publishContentItem(token, 'T1t4v4fg4EqBDv3dzol2wA'); //recipe
    await publishContentItem(token, 'W0XD7ovswU2ctmOx-Zw45Q'); //recipe

}

async function publishMediaItem (authToken,itemId) 
{
    console.log('');
    console.log(green, 'Publish Media Item: ' + itemId);

    //var data = JSON.stringify({"id": itemId,"name": itemName,"description": itemDescripton,"fileId": fileId});
    let status;

    var config = {
        method: 'post',
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
        console.log(white,'Publish Media Item Status: ' + status);
    })
    .catch(function (error) {
        status = JSON.stringify(error.status);
        console.log(red,'Status: ' + status);
        console.log(white,error);
    });

    console.log(green,'Published Media Item');
    return status;
}

async function publishContentItem (authToken,itemId) 
{
    console.log('');
    console.log(green, 'Publish Content Item ');

    //var data = JSON.stringify({"id": itemId,"name": itemName,"description": itemDescripton,"fileId": fileId});
    let status;

    var config = {
        method: 'post',
        url: 'https://content-api.sitecorecloud.io/api/content/v1/items/'+itemId+'/publish',
        headers: { 
            'Content-Type': 'application/json', 
            'Accept': 'text/plain', 
            'Authorization': 'Bearer ' + authToken
        }
    };

    await axios(config)
    .then(function (response) {
        status = JSON.stringify(response.status);
        console.log(white,'Publish Content Item Status: ' + status);
    })
    .catch(function (error) {
        status = JSON.stringify(error.status);
        console.log(red,'Status: ' + status);
        console.log(white,error);
    });

    console.log(green,'Published Content Item');
    return status;
}

async function authenticate () 
{
    console.log('');
    console.log(green,'Get Bearer Token for Publishing');
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