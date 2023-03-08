const { getTokenSourceMapRange } = require("typescript");
const color = require('./colorConstants');

function createMediaItem(mediaId) {
  //var mediaItem = await client.mediaItem.getMediaItem('dkjRFDWSN0KnHk1VvnDZLw');
  const media = [
    {
      id: mediaId,
      relatedType: 'Media',
    },
  ];

  return media;
}

//TODO: how to set upload Source?
async function  createMediaItem(client,mediaItem, uploadSource){
  var a = await client.media.createAsync(mediaItem, uploadSource );
  return '';
}

async function mediaItemExists(client, mediaItemId) {
 
  var mediaItem = await client.media.singleAsync(mediaItemId);
  if (mediaItem != null ) {return true;}

  return false;
}

async function getMediaItem(client, mediaItemId) {
  var mediaItem = await client.media.singleAsync(mediaItemId);
  return mediaItem;
}

async function deleteMediaItem(client,mediaItemId) {
  try {
    await client.media.deleteAsync(mediaItemId);
    console.log(color.SUCCESS,'Media Item deleted: ' + mediaItemId);
  } catch (error) {
    console.log(color.ERROR,'Error (deleteMediaItem): ' + error);
  }
  
}


module.exports = {createMediaItem,mediaItemExists,getMediaItem,deleteMediaItem}
