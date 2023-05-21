const url = "https://api.noroff.dev/api/v1/social/posts"
const query = '?_author=true&_reactions=true&_comments=true'

export default async (id, data) => {
  const authorization = `Bearer ${localStorage.getItem('accessToken')}`
  try {
    const searchPath = (id) ? `${url}/${id}${query}` : `${url}${query}`
    const respons = await fetch (searchPath, {
      'method': "PUT",
      'headers': {
        'Authorization': authorization,
        'content-type': 'application/json; charset:UTF-8',
      },
      'body': JSON.stringify(data),
    })
    return respons
  } catch (error) {
    console.error(error)
  }
}