import { Expo } from 'expo-server-sdk'

let expo = new Expo();

let messages = [];
let somePushTokens = [ 'ExponentPushToken[WBCZmyCo4LDBoCglAyA26m]']

export default function NotiPushSend({title, body, data}) {
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
  let tickets = [];
  (async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk, ' P1');
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();
}
