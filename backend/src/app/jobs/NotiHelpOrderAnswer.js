import NotiPushSend from '../../lib/Noti'

class NotiHelpOrderAnswer {
  noti(answer, token) {
    const setPush = {
      title: 'Sua pergunta foi respondida',
      body: answer,
      data: { key: 7733 },
      token,
    }
    NotiPushSend(setPush)
  }
}

export default new NotiHelpOrderAnswer()