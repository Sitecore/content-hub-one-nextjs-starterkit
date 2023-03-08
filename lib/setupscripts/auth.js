#!/usr/bin/env node
require('dotenv').config();
const sdk = require('@sitecore/contenthub-one-sdk');
const axios = require('axios');
const color = require('./colorConstants');

function authenticate (clientId, clientSecret) {
  //use SDK & Connect
  const credentials = new sdk.ClientCredentialsScheme(clientId, clientSecret);
  const client = sdk.ContentHubOneClientFactory.create(credentials);

  return client;
}


async function authenticateAPI(client_id,client_secret) {
    console.log('');
    console.log(color.INFO,'Get Bearer Token...');
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
        //console.log(color.INFO,token.substring(0,20) + '...');
    })
    .catch(function (error) {
        console.log(color.ERROR,'ERROR: ' + error);
    });

    token = token.replaceAll('"','');
    console.log(color.SUCCESS,'Token Generated: ' + token.substring(0,10) + '...');

    return token;
}

module.exports = {authenticate,authenticateAPI}