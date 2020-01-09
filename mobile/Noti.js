import React, { useEffect } from 'react'
import { Text } from 'react-native'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

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
}

export default function noti() {
  useEffect(() => {
    register()
    Notifications.addListener(listen)
  },[])
  
  listen = ({ origin, data }) => {
    console.log(data)
  }
}
/*
https://expo.io/notifications

export default class Noti extends React.Component {
  componentDidMount() {
    register()
    this.listener = Notifications.addListener(this.listen)
  }
  componentWillUnmount() {
    this.listener && Notifications.removeListener(this.listen)
  }
  listen = ({ origin, data }) => {
    console.log(data)
  }

  render() {
    return (
      <Text title='oii' />
    )
  }
}*/