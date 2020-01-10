import { Expo } from 'expo-server-sdk'

let expo = new Expo();
//export let somePushTokens = []

class NotificationController {
  async store({ body }, res) {
    const { user, token } = body
    console.log(user.code)
    //somePushTokens.push(token.value)
    
    return res.json({ok: 'success'});
  }
}

export default new NotificationController();