class Render {
  constructor() {
    const form = document.querySelector('.send-form')
    form.addEventListener('submit', this.onSubmit, true)
    this.dataArr = []
    this.text = 'text'
    this.paintAll()
  }

  onRemoveItem(id) {
    fetch(`/user/${id}`, { method: 'DELETE'}).then(this.paintAll)
  }

  onSubmit(event) {
    event.preventDefault()
    const {target} = event
    const formData = new FormData(target)
    fetch('/user', {
      method: 'POST',
      body: formData
    })
    .then( data => data.json() )
    .then( data => {
      render.renderAll(data)
      target.querySelectorAll('input').forEach( item => {
        item.value = ''
      })
    } )
  }

  renderItem(item) {
    const {username, image, id, birthday} = item

    const $container = document.createElement('section')
    $container.className = 'item'

    const $name = this.getNameNode(username)
    const $image = this.getImageNode(image, username)
    const $removeBtn = this.getRemoveBtnNode(id)
    const $birthDate = this.getBirthDayNode(birthday)

    $container.appendChild($name)
    $container.appendChild($image)
    $container.appendChild($removeBtn)
    $container.appendChild($birthDate)

    return $container
  }

  getNameNode(username) {
    const $name = document.createElement('p')
    $name.className = 'item__name'
    $name.innerText = username
    return $name
  }

  getImageNode(image, username) {
    const $image = document.createElement('img')
    $image.className = 'item__image'
    $image.setAttribute('width', 100)
    $image.setAttribute('src', image)
    $image.setAttribute('alt', username)
    return $image
  }

  getRemoveBtnNode(id) {
    const $removeBtn = document.createElement('div')
    $removeBtn.className = 'item__remove'
    $removeBtn.addEventListener('click', this.onRemoveItem.bind(this, id), false)
    return $removeBtn
  }

  getBirthDayNode(birthday) {
    const $birthDate = document.createElement('strong')
    $birthDate.innerText = new Date(birthday).toLocaleDateString()
    return $birthDate
  }

  renderAll(data) {
    if(!Array.isArray(data)) {
      this.dataArr.unshift(data)
    }else {
      this.dataArr = data
      this.dataArr = this.dataArr.reverse()
    }

    const $users = document.getElementById('users')
    $users.innerHTML =  ''

    this.dataArr.forEach( item => {
      $users.appendChild(
        this.renderItem(item)
      )
    })
  }

  paintAll() {
    fetch('/users')
      .then( data => data.json() )
      .then( data => {
        render.renderAll(data)
      })
  }
}

const render = new Render()
