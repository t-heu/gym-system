import NotiPushSend from '../../lib/Noti'

class NotiRegistrationUpdate {
  noti(token) {
    const setPush = {
      title: 'informação sobre sua matricula',
      body: 'sua matricula foi renovada ou atualizada',
      data: { key: 7730 },
      token
    }
    NotiPushSend(setPush)
  }
}

export default new NotiRegistrationUpdate()