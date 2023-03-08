const sdk = require('@sitecore/contenthub-one-sdk');
const color = require('./colorConstants');

async function unpublishItem(client, id) {

  try {
    await client.contentItems.unPublishAsync(id);
    console.log(color.SUCCESS,'Unpublishing requested for item: ' + id);
  } catch (error) {
    console.log(color.ERROR,'Error (unpublishItem): ' + error);
  }
}

async function publishItem(client, id) {

  try {
    await client.contentItems.publishAsync(id);
    console.log(color.SUCCESS,'Publishing requested for item: ' + id);
  } catch (error) {
    console.log(color.ERROR,'Error (publishItem): ' + error);
  }

  
}

function isPublished(item) {
  if (item.system.lastPublishProgress != null) {
    if (item.system.lastPublishProgress.type == 'Publish') {
      //is published
      return true;
    } else if (item.system.lastPublishProgress.type == 'Unpublish') {
      //is unpublished
      return false;
    }
  } else {
    //not published yet
    return false;
  }

  return false;
}

function isUnPublished(item) {
  if (item.system.lastPublishProgress != null) {
    if (item.system.lastPublishProgress.type == 'Publish') {
      //is published
      return false;
    } else if (item.system.lastPublishProgress.type == 'Unpublish') {
      //is unpublished
      return true;
    }
  } else {
    //not published yet
    return false;
  }

  return false;
}

async function publishMediaItem(client, id) {

  try {
    await client.media.publishAsync(id);
    console.log(color.SUCCESS,'Publishing requested for media item: ' + id);
  } catch (error) {
    console.log(color.ERROR,'Error (publishMediaItem): ' + error);
  }
    
}

async function unpublishMediaItem(client,id) {
  try {
    await client.media.unPublishAsync(id);
    console.log(color.SUCCESS,'Unpublishing requested for media item: ' + id);
  } catch (error) {
    console.log(color.ERROR,'Error (unpublishMediaItem): ' + error);
  }
    
}

module.exports = {isUnPublished, isPublished, publishItem, unpublishItem,publishMediaItem,unpublishMediaItem}