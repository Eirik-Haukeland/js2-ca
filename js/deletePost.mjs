export default async (id) => {
  const authorization = `Bearer ${localStorage.getItem('accessToken')}`
  try {
    const respons = await fetch(`https://api.noroff.dev/api/v1/social/posts/${id}`, {
      'method': 'DELETE',
      'headers': {
        'content-type': 'application/json; charset:UTF-8',
        'Authorization': authorization,
      },
    })
    const json = await respons.json()
    if (respons.ok) {
      const deletedPost = document.querySelector(`.message[data-id="${id}"]`)
      deletedPost.innerHTML = ''
      deletedPost.innerText = `post Deleted`
      deletedPost.className = 'deleted-message'
    } else {
      console.log(json)
    }
  } catch (err) {
    console.error(await err.json())
  }
}