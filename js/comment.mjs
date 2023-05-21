export default async (id, data) => {
  try {
    const authorization = `Bearer ${localStorage.getItem('accessToken')}`
    const respons = await fetch(`https://api.noroff.dev/api/v1/social/posts/${id}/comment`, {
      'method': 'POST',
      'headers': {
        'Authorization': authorization,
        'content-type': 'application/json; charset:UTF-8',
      },
      'body': JSON.stringify(data),
    })
    if (respons.ok) {
      return respons
    }
  } catch (err) {
    console.error(await err.json())
  }
}