import signUp from "./signUp.mjs";
import login from "./login.mjs";
import { fetchPosts } from './loadposts.mjs'
import placeMessages from "./placeMessages.mjs";
import postMessage from "./postMessage.mjs";

const messageList = document.getElementById('message-list')

const changeMenu = () => {
const authBtns = document.getElementById('auth-btns')
  const profileOrJoin = authBtns.children[1]
  if (profileOrJoin.innerText === 'Join') {
    profileOrJoin.innerText = 'Profile'
  } else {
    profileOrJoin.innerText = 'Join'
  }

  const logInOrOut = authBtns.children[2]
  if (logInOrOut.innerText === 'Login') {
    logInOrOut.innerText = 'Logout'
  } else {
    logInOrOut.innerText = 'Login'
  }
}

//open modules

const dialogLogin = document.getElementById('auth-dialog-login');
const dialogJoin = document.getElementById('auth-dialog-join');

const dialogLoginBtns = document.getElementsByClassName('auth-open-login');
[...dialogLoginBtns].forEach(button => {
  button.addEventListener('click', () => {
    if (button.innerText === 'Logout') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      changeMenu()
    } else {
      if (dialogJoin.open) {
        dialogJoin.close()
      }
      dialogLogin.showModal()
    }
  })
})

const dialogJoinBtns = document.getElementsByClassName('auth-open-join');
[...dialogJoinBtns].forEach(button => {
  button.addEventListener('click', () => {
    if (button.innerText === 'Profile') {
      navigate(URL + '/profile');
    } else {
      if (dialogLogin.open) {
        dialogLogin.close()
      }
      dialogJoin.showModal()
    }
  })
})

const dialogCanselBtns = document.querySelectorAll('#login-close-btn, #join-close-btn');
[...dialogCanselBtns].forEach(button => {
  button.addEventListener('click', (evt) => {
    const dialog = evt.target.parentElement.parentElement.parentElement;
    dialog.close()
  })
});

// login form

const loginAndStore = async ({email, password} = data) => {
  const response = await login({
    email: email,
    password: password
  })

  if (response.ok) {
    const {accessToken, name, email} = await response.json()
    localStorage.setItem('name', name)
    localStorage.setItem('email', email)
    localStorage.setItem('accessToken', accessToken)

    changeMenu()

    const postsResponse = await fetchPosts(`Bearer ${accessToken}`)
    const postJson = await postsResponse.json()
    if (postsResponse.ok) {
      console.log(postJson)
      postJson.forEach(post => {
        try { // do to me not guarding for null on line 132 in placeMessages.mjs i neaded to add this try catch
          placeMessages(post, messageList)
        } catch (err) {
          console.error(err)
        }
      })
    } else {
      console.log(postJson)
    }
  } else {
    return response
  }
}

const loginForm = document.getElementById('login-form')

loginForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const form = evt.target;
  const email = form.querySelector('#email-login').value
  const password = form.querySelector('#password-login').value

  loginAndStore({
    email: email,
    password: password,
  })

  dialogLogin.close()
})

// join form

const joinForm = document.getElementById('join-form')
joinForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const form = evt.target;
  const name = form.querySelector('#username-join').value;
  const email = form.querySelector('#email-join').value;
  const password = form.querySelector('#password-join').value;

  const resault = await signUp({
    name: name,
    email: email,
    password: password,
  })
  const json = await resault.json();

  const formPreviusSibling = form.previousElementSibling;
  if (formPreviusSibling.classList.contains('error-message')) {
    formPreviusSibling.remove();
  }

  if (resault.ok) {

    loginAndStore({
      email: email,
      password: password,
    })

    dialogJoin.close();

  } else {

    const errors = json.errors;
    errors.forEach(error => {
      const errorSpan = document.createElement('span')
      errorSpan.classList.add('error-message');
      errorSpan.innerText = error.message;
      form.insertAdjacentElement( 'beforebegin', errorSpan);
    })

  }
});

// send posts

const imageForm = document.getElementById('send-image-form')
const messageForm = document.getElementById('send-message-form')
const sendImage = document.getElementById('send-image');
const sendMessage = document.getElementById('send-message');

const changeMessageType = () => {
  imageForm.hidden = !sendImage.checked
  messageForm.hidden = !sendMessage.checked
}

changeMessageType()
sendImage.addEventListener('change', () => changeMessageType())
sendMessage.addEventListener('change', () => changeMessageType())

const sendPostForm = document.getElementById('send-post');
sendPostForm.addEventListener('submit',  async (evt) => {
  evt.preventDefault();

  const form = evt.target;
  const title = form.querySelector('#post-title').value
  const tags = form.querySelector('#tags').value.split(' ')
  const sendImg = form.querySelector('#send-image').checked
  const body = (sendImg) ? form.querySelector('#alt-text').value :form.querySelector('#message-text').value;
  const media = form.querySelector('#media-url').value
  const data = (sendImg) ? {title: title, body: body, tags: tags, media: media} :  {title: title, body: body, tags: tags}
  const accessToken = `Bearer ${localStorage.getItem('accessToken')}`

  const resault = await postMessage(data, accessToken)
  const json = await resault.json()

  if (resault.ok) {
    console.log(json)
    location.reload()
  } else {
    console.log(json)
  }
});

const accessToken = localStorage.getItem('accessToken')
if ( accessToken ) {
  const postsResponse = await fetchPosts(`Bearer ${accessToken}`)

  changeMenu()

  const postJson = await postsResponse.json()
  if (postsResponse.ok) {
    console.log(postJson)
    postJson.forEach(post => {
      try { // do to me not guarding for null on line 132 in placeMessages.mjs i neaded to add this try catch
        placeMessages(post, messageList)
      } catch (err) {
        console.error(err)
      }
    })
  } else {
    console.log(postJson)
  }

}
