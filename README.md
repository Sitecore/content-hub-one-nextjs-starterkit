# content-hub-one-nextjs-starterkit
The Content Hub ONE NextJS starterkit contains helping functionalities such as handling GraphQL JSON output conversion to HTML for Rich Text, Media Fields and References. It also contains a small example implementation that Developers can use to start their customer projects on.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

More Information about Content Hub ONE including Video Tutorials you find in the [Developer Portal]( https://developers.sitecore.com/content-management/content-hub-one).

## Prerequisites
For this starterkit you require a Content Hub ONE tenant. Find more information here: [https://www.sitecore.com/products/content-hub-one](https://www.sitecore.com/products/content-hub-one)

### Install the Content Hub ONE CLI. 
Check the [documentation](https://doc.sitecore.com/ch-one/en/developers/content-hub-one/content-hub-one-cli--install-and-run-the-cli.html).

## Clone this repository
Clone this repository to your local drive. 

## Install required npm packages
In the root of your repository folder run: 

    npm install

## setup .env 
Copy .env.example file in your repository root and rename it to ".env".
In there fill the following values:

**SITECORE_CLIENT_ID** --> You find the Client Id in the Content Hub ONE app under 'Settings'>'OAuthClient'>'Client Credentials'

**SITECORE_CLIENT_SECRET** --> You find the Client Secret in the Content Hub ONE app under 'Settings'>'OAuthClient'>'Client Credentials'

This is required later on for uploading the images of the demo solution using the setup.js.


**SITECORE_ENDPOINT_URL**  --> Here you need the Delivery API Url e.g.: https://edge.sitecorecloud.io/api/graphql/v1. More Information you find in the [Delivery API Documentation](https://doc.sitecore.com/ch-one/en/developers/content-hub-one/graphql--preview-and-delivery-apis.html). 

**SITECORE_DEV_AUTH_TOKEN** --> In Content Hub ONE you need to create an API Key. This can be done via the [Content Hub ONE App](https://doc.sitecore.com/ch-one/en/users/content-hub-one/content-delivery--manage-api-keys.html), CLI or [Content Management API ](https://doc.sitecore.com/ch-one/en/developers/content-hub-one/graphql--api-keys.html)  

This is required to connect your App with the Content Hub ONE tenant.

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

run:

    node publish

The Script will publish all the required items. Please note that publishing is just being scheduled and can take up to a few minutes after finish of the script.

The script is re-runnable.

## Start the application

run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


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

