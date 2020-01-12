import React, { useEffect } from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const PUSH_ENDPOINT = 'http://192.168.15.2:3333/users/push/v2';

export async function register() {
  const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
  let finalStatus = existingStatus;
      
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    finalStatus = status;
  }
    
  if (finalStatus !== 'granted') {
    return;
  }
    
  let token = await Notifications.getExpoPushTokenAsync();
  console.log(existingStatus, token)
  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token,
      },
      user: {
        code: await AsyncStorage.getItem('@key')
      },
    }),
  });
}

export default function noti() {
  useEffect(() => {
    register()
    //Notifications.addListener(listen)
  },[])
  
  listen = ({ origin, data }) => {
    if(data.key == key) {
      console.log(data.key)
      return
    }
  }
}
/*
https://expo.io/notifications
*/