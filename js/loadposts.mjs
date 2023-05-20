const url = "https://api.noroff.dev/api/v1/social/posts"

export const fetchPosts = async (authorization, query) => {
  try {
    const searchPath = (query) ? `url?${query}` : url
    const respons = await fetch (searchPath, {
      method: "GET",
      headers: {
        Authorization: authorization,
      },
    })
    return respons
  } catch (error) {
    console.error(error)
  }
}

export const placeMessages = (message, placementLocation) => {
  const {tags, body, id, title, media, updated, created} = message
/*  const messageDiv = `<li class="message" data-tags="${tags.join(' ')} data-id="${id}">
                          <h3>${title}${(updated !== created) ? '<span class="edit-lable"> - Edited</span>' : ''}</h3>
                          ${(media) ? '<img src="${media}" alt="${body}">' : '<p>${body}</p>'}
                      </li>`
  placementLocation.innerHTML += messageDiv;*/ // todo: make it so that it returns data and not ${media} or ${body} ${(media) ? '<img src="${media}" alt="${body}">' : '<p>${body}</p>'}
  const messageLi = document.createElement('li')
  messageLi.classList.add("message")
  messageLi.setAttribute('data-tags', tags.join(' '))
  messageLi.setAttribute('data-id', id)

  const messagetitle = document.createElement('h3')
  messagetitle.innerHTML = `${title}${(updated !== created) ? '<span class="edit-lable"> - Edited</span>' : ''}`
  messageLi.appendChild(messagetitle)

  if (media) {
    const messagemedia = document.createElement('img')
    messagemedia.src = media
    messagemedia.alt = body
    messageLi.appendChild(messagemedia)
  } else {
    const messageBody = document.createElement('p')
    messageBody.innerText = body
    messageLi.appendChild(messageBody)
  }

  placementLocation.appendChild(messageLi)
}
