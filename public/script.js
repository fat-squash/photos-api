'use strict'

fetch('/test', { method: 'POST' })
.then( data => data.json() )
.then( data => {
  console.log('TEST POST data', data)
})

let dataArr = []

function renderAll(data) {
  if(!Array.isArray(data)) {
    dataArr.unshift(data)
  }else {
    dataArr = data
    dataArr = dataArr.reverse()
  }

  $('#users').html('')
  dataArr.forEach( item => {
    const {username, image, id} = item
    const $item = $(`
      <div class="item">
        <p>${username}</p>
        <img width="100" src="${image}" alt="${username}"/>
      </div>
    `)
    $item.on('click', event => {
      fetch(`/user/${id}`, { method: 'DELETE'}).then(paintAll)
    })
    $('#users').append($item)
  })
}

paintAll()

function paintAll() {
  fetch('/users')
    .then( data => data.json() )
    .then( renderAll )
}

const form = document.querySelector('.send-form')
form.addEventListener('submit', (event) => {
  event.preventDefault()
  const {target} = event
  const formData = new FormData(target)
  fetch('/user', {
    method: 'POST',
    body: formData
  })
  .then( data => data.json() )
  .then( data => {
    renderAll(data)
    target.querySelectorAll('input').forEach( item => {
      item.value = ''
    })
  } )
}, true)
