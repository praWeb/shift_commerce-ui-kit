import { liveMessagingConfigured, liveMessage } from '../actions'

import Pusher from 'pusher-js'

export default function PusherMessaging(config, dispatch) {
  console.log("in Pusher Messagin")
  console.log(config)
  console.log(dispatch)
  if (config && config.pusher && config.pusher.key) {
    const account_reference = config.account_reference
    const socket = new Pusher(config.pusher.key, {
      cluster: config.pusher.cluster,
      encrypted: true
    })
    const channel = socket.subscribe(account_reference)

    function broadcastEvent(event, data) {
      dispatch(liveMessage(data))
    }

    channel.bind_global(broadcastEvent)

    dispatch(liveMessagingConfigured())
  }
}
