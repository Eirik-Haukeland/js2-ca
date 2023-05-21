const url = "https://api.noroff.dev/api/v1/social/posts"
const query = '?_author=true&_reactions=true&_comments=true'

export const fetchPosts = async (authorization, id) => {
  try {
    const searchPath = (id) ? `${url}/${id}${query}` : `${url}${query}`
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
