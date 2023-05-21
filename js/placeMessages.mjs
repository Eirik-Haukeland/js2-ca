import deletePost from "./deletePost.mjs";
import comment from './comment.mjs'
import editMessage from "./editMessage.mjs";
import {postFormSelectType} from "./helper.mjs";

export default (message, placementLocation) => {
  const {tags, body, id, title, media, updated, created, reactions, comments, author: {avatar: authorAvatar, name: authorName}} = message
  const messageLi = document.createElement('li')
  messageLi.classList.add("message")
  messageLi.setAttribute('data-tags', tags.join(' '))
  messageLi.setAttribute('data-id', id)

  let numbOfReactions = 0
  reactions.forEach(reaction => {
    numbOfReactions += reaction.count
  })
  const symbol = '👍'

  const messageInfo = `<div class="message-info">
                        <img class="author-img"
                         src="${(authorAvatar) ? authorAvatar : 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Sxw040Q_glzQBTXPgPvpiwHaFj%26pid%3DApi&f=1&ipt=36c3cddc0d79b88e738a555cde7324b816cdb830ff0f43f1db9a48c05d353fe3&ipo=images'}"
                         alt="${(authorAvatar) ? `the profile picture for ${authorName}` : 'default profile picture'}" />
                        <span class="author-name">${authorName}</span>
                        <button class="thumbs-up" data-symble="${symbol}" onclick="thumbsUp(this)">${symbol}</button>
                        <span class="reaction-count">${numbOfReactions}</span>
                        <a class="se-post btn" href="onePostPage.html?id=${id}">se post</a>
                        ${(localStorage.getItem('username') === authorName) 
                          ? `<button class="remove-message" data-post-id="${id}">delete message</button>
                             <button class="edit-message">edit message</button>
                             <dialog id="${id}-edit-modal">
                                <form id="${id}-edit-post" data-message-id>
                                    <label for="post-title">Title</label>
                                    <input type="text" name="post title" id="${id}-post-title" required>
                                    <label for="tags">Tags</label>
                                    <input type="text" name="tags" id="${id}-tags">
                                    <fieldset>
                                        <legend>message type</legend>
                                        <input type="radio" name="${id}-messageOrImage" id="${id}-send-image">
                                        <label for="${id}-send-image">Image</label>
                                        <input type="radio" name="${id}-messageOrImage" id="${id}-send-message" checked>
                                        <label for="${id}-send-message">Textual</label>
                                    </fieldset>
                                    <div id="${id}-send-image-form">
                                        <label for="${id}-media-url">Url to img</label>
                                        <input type="text" name="media url" id="${id}-media-url">
                                        <label for="${id}-alt-text">Textual alternative</label>
                                        <input type="text" name="alt text" id="${id}-alt-text">
                                    </div>
                                    <div id="${id}-send-message-form">
                                        <label for="${id}-message-text">Message</label>
                                        <div type="text" name="message text" id="${id}-message-text" contenteditable="true"></div>
                                    </div>
                                    <input type="submit" value="post message">
                                </form>
                             </dialog>`
                          : ''}
                      </div>
                      <h3>${title}${(updated !== created) ? '<span class="edit-lable"> - Edited</span>' : ''}</h3>
                      ${(media) ? `<img class="content" src="${media} alt=${body}">` : `<p class="content">${body}</p>`}
                      <div class="comment-section">
                        <form class="respond-form">
                          <label for="${id}-respons-message" class="visually-hidden">message for the respons</label>
                          <input type="text" data-id="${id}" name="respons message" id="${id}-respons-message">
                          <input type="submit" value="respond">
                        </form>
                        <ul class="comment-list">${(comments) ? comments.map(comment => {const {body: commentBody, author: {avatar: commentAuthorAvatar, name: commentAuthorName}} = comment
                                                                                        return `<li class="message-comment">
                                                                                                    <img class="author-img"
                                                                                                      src="${(commentAuthorAvatar) ? commentAuthorAvatar : 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Sxw040Q_glzQBTXPgPvpiwHaFj%26pid%3DApi&f=1&ipt=36c3cddc0d79b88e738a555cde7324b816cdb830ff0f43f1db9a48c05d353fe3&ipo=images'}"
                                                                                                      alt="${(commentAuthorAvatar) ? `the profile picture for ${commentAuthorName}` : 'default profile picture'}" />
                                                                                                    <span class="author-name">${commentAuthorName}</span>
                                                                                                    <p>${commentBody}</p>
                                                                                                  </li>`
                                                                                       }).reverse().join('') : ''}
                        </ul>
                      </div>`

  messageLi.innerHTML += messageInfo

  placementLocation.appendChild(messageLi)

  const delMessageBtn = placementLocation.lastChild.querySelector('.remove-message')
  if ( delMessageBtn ) {
    delMessageBtn.addEventListener('click', () => deletePost(id))
  }

  const editMessageBtn = placementLocation.lastChild.querySelector('.edit-message')
  const dialog = document.getElementById(`${id}-edit-modal`)
  const imageRadio = document.getElementById(`${id}-send-image`)
  const messageRadio = document.getElementById(`${id}-send-message`)
  const sendImgForm = document.getElementById(`${id}-send-image-form`)
  const sendMessageForm = document.getElementById(`${id}-send-message-form`)
  const postTitle = document.getElementById(`${id}-post-title`)
  const postTags = document.getElementById(`${id}-tags`)
  const postMessage = document.getElementById(`${id}-message-text`)
  const postImg = document.getElementById(`${id}-send-image`)
  const postAltText = document.getElementById(`${id}-alt-text`)
  if ( editMessageBtn ) {
    editMessageBtn.addEventListener('click', () => {
      dialog.showModal()
      postTitle.value = title
      postTags.value = tags.join(' ')
      if (media) {
        if (!imageRadio.hasAttribute('checked')) {
          imageRadio.checked = true
          messageRadio.checked = false
        }
        if (sendImgForm.classList.contains('hide-me')) {
          sendImgForm.classList.remove('hide-me')
        }
        if (!sendMessageForm.classList.contains('hide-me')) {
          sendMessageForm.classList.add('hide-me')
        }
        postImg.value = media
        postAltText.value = body
      } else {
        if (!messageRadio.hasAttribute('checked')) {
          imageRadio.checked = false
          messageRadio.checked = true
        }
        if (sendMessageForm.classList.contains('hide-me')) {
          sendMessageForm.classList.remove('hide-me')
        }
        if (!sendImgForm.classList.contains('hide-me')) {
          sendImgForm.classList.add('hide-me')
        }
        postMessage.textContent = body
      }
    })
  }

  const dialogForm = document.getElementById(`${id}-edit-post`)
  const editMessageType = document.getElementsByName(`${id}-messageOrImage`)
  editMessageType.forEach(radioElement => {
    radioElement.addEventListener('click', (ev) => postFormSelectType(ev.target))
  })

  dialogForm.addEventListener('submit', (ev) => {
    ev.preventDefault()

    let media = [ false ]
    let body = [ false ]
    const title = (postTitle) ? postTitle.value : false
    const tags = (postTags.value.trim().length >= 1) ? [ true, ...postTags.value.trim().split(' ') ] : [ false ]

    if (!sendImgForm.classList.contains('hide-me')) {
      media = (postImg.value.trim().length >= 1) ? [ true, postImg.value.trim() ] : [ false ]
      body = (postAltText.value.length >= 1) ? [ true, postAltText.value.trim() ] : [ false ]
    } else if (!sendMessageForm.classList.contains('hide-me')) {
      body = (postMessage.textContent.length >= 1) ? [ true, postMessage.textContent.trim() ] : [ false ]
    }

    const data = {
      title: title,
    }
    if (media[0]) {
      data.media = media[1]
    }
    if (body[0]) {
      data.body = body[1]
    }
    if (tags[0]) {
      let array = []
      tags.forEach((item, index) => {
        if (index >= 1) {
          array = [...array, item]
        }
        data.tags = array
      })
    }
    editMessage(id, data)
  })

  const responsForm =  placementLocation.lastChild.querySelector('.respond-form')
  const commentList = placementLocation.lastChild.querySelector('.comment-list')
  responsForm.addEventListener('submit', async (ev) => {
      ev.preventDefault()
      const form = ev.target
      const messageInput = form.children[1]

      const data = {
        'body': messageInput.value,
      }
      const respons = await comment(id, data)
      const json = await respons.json()
      console.log(commentList)
      const {body: commentBody, author: {avatar: commentAuthorAvatar, name: commentAuthorName}} = json
      commentList.innerHTML = `<li class="message-comment">
                                  <img class="author-img"
                                    src="${(commentAuthorAvatar) ? commentAuthorAvatar : 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Sxw040Q_glzQBTXPgPvpiwHaFj%26pid%3DApi&f=1&ipt=36c3cddc0d79b88e738a555cde7324b816cdb830ff0f43f1db9a48c05d353fe3&ipo=images'}"
                                    alt="${(commentAuthorAvatar) ? `the profile picture for ${commentAuthorName}` : 'default profile picture'}" />
                                  <span class="author-name">${commentAuthorName}</span>
                                  <p>${commentBody}</p>
                                </li>${commentList.innerHTML}`
  })
}
