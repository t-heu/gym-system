import NotiPushSend from '../../lib/Noti'

class NotiGeneralWarnings {
  noti(message, tokens) {
    if(!message || !tokens) return 'vazio'
    
    let token = tokens.filter(r => {
      if(r.token_push != '') {
        return r.token_push
      }
    })
    
    token = token.map(r => r.token_push)
    
    const setPush = {
      title: 'Avisos',
      body: message,
      data: { links: '#' },
      token
    }
    NotiPushSend(setPush)
    
  }
}

export default new NotiGeneralWarnings()