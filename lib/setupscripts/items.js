const sdk = require('@sitecore/contenthub-one-sdk');
const color = require('./colorConstants');

async function getItems(client, contentType, pagesize, pagenumber) {
  const items = await client.contentItems.getAsync(
    new sdk.ContentItemSearchRequest().withFieldQuery(
      ContentItemSearchField.contentType, 
      Equality.Equals, 
      contentType).withPageSize(pagesize).withPageNumber(pagenumber));
  return items;
}

async function deleteItem(client, id) {
  try {
    await client.contentItems.deleteAsync(id);
    console.log(color.SUCCESS,'Content Item deleted: ' + id);
  } catch (error) {
    console.log(color.ERROR,'Error (deleteItem): ' + error);
  }
}

async function createItem(client, contentType, contentItem) {

  const newContentItem = await client.contentItems.createAsync(contentType, contentItem);
  return newContentItem;
}

async function itemExists(client, itemId){
  
    var item = await client.contentItems.singleAsync(itemId);

    if (item != null) {return true;}

    return false;

}

async function getItem(client, contentItemId) {
  var item = await client.contentItems.singleAsync(contentItemId);
  return item;
}

module.exports = {deleteItem,createItem,getItems,itemExists,getItem}
