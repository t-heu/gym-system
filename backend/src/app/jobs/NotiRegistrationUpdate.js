import NotiPushSend from '../../lib/Noti'

class NotiRegistrationUpdate {
  noti() {
    const setPush = {
      title: 'informação sobre sua matricula',
      body: 'sua matricula foi renovada ou atualizada',
      data: { link: 'cool' }
    }
    NotiPushSend(setPush)
  }
}

export default new NotiRegistrationUpdate()