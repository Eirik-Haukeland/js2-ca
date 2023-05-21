import deletePost from "./deletePost.mjs";

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
                        ${(localStorage.getItem('username') === authorName) ? `<button class="remove-message" onclick="deletePost(${id})">delete message</button>` : '<span class="remove-message" hidden></span>'}
                      </div>
                      <h3>${title}${(updated !== created) ? '<span class="edit-lable"> - Edited</span>' : ''}</h3>
                      ${(media) ? `<img class="content" src="${media} alt=${body}">` : `<p class="content">${body}</p>`}`
  messageLi.innerHTML += messageInfo

  placementLocation.appendChild(messageLi)
}
