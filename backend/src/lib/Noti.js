import { Expo } from 'expo-server-sdk'

let expo = new Expo();

let messages = [];
let somePushTokens = []
let tickets = [];
let receiptIds = [];

export default function NotiPushSend({title, body, data, token}) {
  
  if(token) {
    somePushTokens.push(...token)
  }
  
  for (let pushToken of somePushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }
  
    messages.push({
      to: pushToken,
      sound: 'default',
      title,
      body,
      data
    })
  }
  
  let chunks = expo.chunkPushNotifications(messages);
  
  (async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();

  for (let ticket of tickets) {
    if (ticket.id) {
      receiptIds.push(ticket.id);
    }
  }
  
  let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  
  (async () => {
    for (let chunk of receiptIdChunks) {
      try {
        let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
        console.log(receipts);
  
        for (let receipt of Object.keys(receipts)) {
          if (receipt.status === 'ok') {
            continue;
          } else if (receipt.status === 'error') {
            console.error(`There was an error sending a notification: ${receipt.message}`);
            if (receipt.details && receipt.details.error) {
              console.error(`The error code is ${receipt.details.error}`);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  })();
}