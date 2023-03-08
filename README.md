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

**SITECORE_CLIENT_ID** --> You can find the Client Id in the Content Hub ONE app under 'Settings'>'OAuthClient'>'Client Credentials'

**SITECORE_CLIENT_SECRET** --> You can find the Client Secret in the Content Hub ONE app under 'Settings'>'OAuthClient'>'Client Credentials'

This is required when uploading the demo images using the setup.js.

**SITECORE_ENDPOINT_URL**  --> Here you need the Delivery API Url, for example, https://edge.sitecorecloud.io/api/graphql/v1. More Information you find in the [Delivery API documentation](https://doc.sitecore.com/ch-one/en/developers/content-hub-one/graphql--preview-and-delivery-apis.html). 

**SITECORE_DEV_AUTH_TOKEN** --> In Content Hub ONE, create an API key. This can be done through the [Content Hub ONE app](https://doc.sitecore.com/ch-one/en/users/content-hub-one/content-delivery--manage-api-keys.html), CLI, or [Content Management API ](https://doc.sitecore.com/ch-one/en/developers/content-hub-one/graphql--api-keys.html)  

This is required to connect your app with the Content Hub ONE tenant.


## Push content to your tenant

The starter kit uses images, content types and content items. To install those to your Content Hub ONE tenant use your command prompt.

### Setup

Navigate to the root of the app (content-hub-one-nextjs-starterkit).

run in the root of your app directory:

    node setup

The Script will push the images to your environment, next the content types and last the content items.

The script is re-runnable.

### Publish 

To make the newly created images and content items available on the content delivery API (GraphQl endpoint on Edge) you need to publish.

run in the root of your app directory:

    node publish

The Script will publish all the required items. Please note that publishing is just being scheduled and can take up to a few minutes after finish of the script.

The script is re-runnable.
   

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


## Removal of starter kit related content

In case you want to remove all content items, content types or images installed by starter kit use the command prompt and navigate to the root of your app directory.

### Unpublish

First content items and images need to be unpublished.

run in your app root directory:

    node unpublish

The Script will unpublish all the required items. Please note that unpublishing is just being scheduled and can take up to a few minutes after finish of the script.

The script is re-runnable.

### Remove content

Make sure that the content has been unpublished. You can check that in the Content Hub ONE editing UI.

run in your app root directory:

    node remove
    
The script is re-runnable.