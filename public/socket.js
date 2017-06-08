    const socket = io()

    // const btn = document.querySelector( '.js-btn' )
    // btn.addEventListener( 'click', function( event ) {
    //   socket.emit( 'data', {
    //     foo: 'foo'
    //   })
    // })

    // const ack = document.querySelector( '.js-ack' )
    // ack.addEventListener( 'click', function( event ) {
    //   socket.emit( 'ack', {
    //     foo: 'foo'
    //   }, res => {
    //     console.log( 'acknowledgement:', res )
    //   })
    // })

    // const chatBtn = document.querySelector( '.js-chatBtn' )
    // chatBtn.addEventListener( 'click', function( event ) {
    //   chat.emit( 'message', 'yo central, are you on the line?' )
    // })

    const connections = document.querySelector( '.js-connect' )
    socket.on( 'connections', function( event ) {
      console.log( 'connected', event )
      connections.innerHTML = event.numConnections
    })
    socket.on( 'response', function( event ) {
      console.log( 'response:', event.message )
    })

    const chat = io( 'http://localhost:4000/chat' )
    chat.on( 'message', function( event ) {
      console.log( 'chat message:', event )
      renderMessage(event)
    })

    const $messagesNode = document.getElementById('messages')

    function renderMessage(message) {
      const $messageNode = document.createElement('p')
      $messageNode.innerText = message
      $messagesNode.appendChild($messageNode)
    }

    function onSubmit(event) {
      event.preventDefault()
      const {target} = event
      const formData = new FormData(target)
      const message = formData.get('message')
      if(!message) return false;
      chat.emit( 'message', message )
      target.querySelectorAll('input, textarea').forEach( item => {
        item.value = ''
      })
    }

    const $formNode = document.getElementById('send-message')
    $formNode.addEventListener('submit', onSubmit, false)

