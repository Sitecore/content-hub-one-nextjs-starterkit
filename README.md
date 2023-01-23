# content-hub-one-nextjs-starterkit
The Content Hub ONE NextJS starterkit contains helping functionalities such as handling GraphQL JSON output conversion to HTML for Rich Text, Media Fields and References. It also contains a small example implementation that Developers can use to start their customer projects on.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites
For this starterkit you require a Content Hub ONE tenant. Find more information here: [https://www.sitecore.com/products/content-hub-one](https://www.sitecore.com/products/content-hub-one)

### Install the Content Hub ONE CLI. 
Therefore, check the [documentation](https://doc.sitecore.com/ch-one/en/developers/content-hub-one/content-hub-one-cli--install-and-run-the-cli.html).

### Install required npm packages
In the root of your repository folder run: 

npm install

### Serialization
#### Push the serialized content types into your Contnet Hub ONE tenant. 

Run: ch-one-cli ser push content-type

#### Push the serialized content items into your Content Hub ONE tenant. 

Run: 
ch-one-cli ser push content-item -c "menu"
ch-one-cli ser push content-item -c "header"
ch-one-cli ser push content-item -c "footer"
ch-one-cli ser push content-item -c "recipe"
ch-one-cli ser push content-item -c "homepage"

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

