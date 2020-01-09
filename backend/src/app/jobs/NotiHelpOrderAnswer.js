import NotiPushSend from '../../lib/Noti'

class NotiHelpOrderAnswer {
  noti(answer) {
    const setPush = {
      title: 'Sua pergunta foi respondida',
      body: answer,
      data: { link: 'cool' }
    }
    NotiPushSend(setPush)
  }
}

export default new NotiHelpOrderAnswer()