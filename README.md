# content-hub-one-nextjs-starterkit

The Content Hub ONE NextJS starter kit is intended to help you begin Content Hub ONE development quickly. It includes useful functionalities, such as the handling of GraphQL JSON output conversion to HTML for rich text, media fields, and references and contains a small sample implementation that you can use to start building customer projects on.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

More Information about Content Hub ONE, including video tutorials, is available from the [Developer Portal]( https://developers.sitecore.com/content-management/content-hub-one).

## Prerequisites
To use this starter kit you require 
- a Content Hub ONE tenant. Find more information here: [https://www.sitecore.com/products/content-hub-one](https://www.sitecore.com/products/content-hub-one)
- node.js incl. npm you can download it [here](https://nodejs.org)
- for installing the Github CLI and the CH-ONE CLI chocolatey can be helpful. You can download it from [here](https://chocolatey.org/install) 
- [Github CLI](https://cli.github.com/manual/installation)


### Install the Content Hub ONE CLI. 

To install the Content Hub ONE CLI, see the [CLI documentation](https://doc.sitecore.com/ch-one/en/developers/content-hub-one/content-hub-one-cli--install-and-run-the-cli.html).

## Clone this repository

Clone this repository to your local drive. 

## Install required npm packages

In the root of your repository folder, run the following command: 

    npm install

## setup .env 

Copy the .env.example file to your repository root and rename it to ".env".

Provide the following parameters:

SITECORE_CLIENT_ID --> You can find the Client Id in the Content Hub ONE app under 'Settings'>'OAuthClient'>'Client Credentials'

SITECORE_CLIENT_SECRET. --> You can find the Client Secret in the Content Hub ONE app under 'Settings'>'OAuthClient'>'Client Credentials'

This is required when uploading the demo images using the setup.js.


SITECORE_ENDPOINT_URL  --> Here you need the Delivery API Url, for example, https://edge.sitecorecloud.io/api/graphql/v1. More Information you find in the [Delivery API documentation](https://doc.sitecore.com/ch-one/en/developers/content-hub-one/graphql--preview-and-delivery-apis.html). 

SITECORE_DEV_AUTH_TOKEN --> In Content Hub ONE, create an API key. This can be done through the [Content Hub ONE app](https://doc.sitecore.com/ch-one/en/users/content-hub-one/content-delivery--manage-api-keys.html), CLI, or [Content Management API ](https://doc.sitecore.com/ch-one/en/developers/content-hub-one/graphql--api-keys.html)  

This is required to connect your app with the Content Hub ONE tenant.

## Serialization

### Media items and files

The starter kit includes images. Currently, the CLI cannot handle media assets and media items. These need to be created manually.

The kit contains a node script to upload images from the /setup folder and create the media items.

In the root of your repository, you will find the setup.js file. 

In your console window, navigate to the root of the solution and run the following command:

    node setup.js
Note: If you are not working with the production environment, you need to change the urls in the setup.js script to match your environment.


### Push the serialized content types to your Content Hub ONE tenant 

Connect the cli with the your Content Hub ONE tenant. Therefore use:
    
    ch-one-cli tenant add --organization-id <Organization ID> --tenant-id <Tenant ID> --client-id <Device: OAuth client ID> 


Note: If you are not working with the production environment, you need to change base-path, authority and audience. Check command parameters with:
    
    ch-one-cli tenant add -h
    

In your console, navigate to the *serialization* folder within your solution. Run the following command:

    ch-one-cli ser push content-type
    

### Push the serialized content items to your Content Hub ONE tenant. 

In your console, navigate to the *serialization* folder within your solution. Run the following command: 

    ch-one-cli ser push content-item -c "menu"

    ch-one-cli ser push content-item -c "header"

    ch-one-cli ser push content-item -c "footer"

    ch-one-cli ser push content-item -c "recipe"

    ch-one-cli ser push content-item -c "homepage"

### Publish media items, and content items

In the Content Hub ONE app, publish in the following order:

1. Media items
2. Content items

Note: If you are connecting to the Delivery API, items need to be published to be available. Using the Preview API, publishing is not required.

## Start the application

navigate back to the root folder of your application/repo and run the development server:

```bash
npm run dev
# or
yarn dev
```

To see the result, open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

See the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more information.
