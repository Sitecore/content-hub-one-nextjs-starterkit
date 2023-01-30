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

As you might see 1 high severity vulnerability you might want to run following command to fix it.

    npm audit fix

## setup .env 
Copy .env.example file in your repository root and rename it to ".env".
In there fill the following values:

SITECORE_CLIENT_ID --> You find the Client Id in the Content Hub ONE app under 'Settings'>'OAuthClient'>'Client Credentials'

SITECORE_CLIENT_SECRET. --> You find the Client Secret in the Content Hub ONE app under 'Settings'>'OAuthClient'>'Client Credentials'

This is required later on for uploading the images of the demo solution using the setup.js.


SITECORE_ENDPOINT_URL  --> Here you need the Delivery API Url e.g.: https://edge.sitecorecloud.io/api/graphql/v1. More Information you find in the [Delivery API Documentation](https://doc.sitecore.com/ch-one/en/developers/content-hub-one/graphql--preview-and-delivery-apis.html). 

SITECORE_DEV_AUTH_TOKEN --> In Content Hub ONE you need to create an API Key. This can be done via the [Content Hub ONE App](https://doc.sitecore.com/ch-one/en/users/content-hub-one/content-delivery--manage-api-keys.html), CLI or [Content Management API ](https://doc.sitecore.com/ch-one/en/developers/content-hub-one/graphql--api-keys.html)  

This is required to connect your App with the Content Hub ONE tenant.

## Serialization

### Media items and Files
The Starterkit uses Images. Currently the CLI cannot handle Media Assets and Media Items. These need to be created manually.

This solution contains a node script to support you uploading the images from the /setup folder and creating the required media items.

In the root of your repository you find the setup.js file. 

In your console window, navigate to the root of the solution and run:

    node setup.js

### Push the serialized content types into your Contnet Hub ONE tenant. 
Navigate with your console to the serialization folder within your solution. Run:

    ch-one-cli ser push content-type

### Push the serialized content items into your Content Hub ONE tenant. 
Navigate with your console to the serialization folder within your solution. Run: 

    ch-one-cli ser push content-item -c "menu"

    ch-one-cli ser push content-item -c "header"

    ch-one-cli ser push content-item -c "footer"

    ch-one-cli ser push content-item -c "recipe"

    ch-one-cli ser push content-item -c "homepage"

### Publish Content Types, Media Items And Content Items
Go to the Content Hub ONE app and publish in the following order:
1. Content Types
2. Media Items
3. Content Items

If you are approaching the Delivery API items need to be published to be available. Using the preview API, publishing is not required.

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