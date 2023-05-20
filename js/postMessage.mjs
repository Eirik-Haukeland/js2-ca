const url = "https://api.noroff.dev/api/v1/social/posts"

export default async (data, authorization) => {
  try {
    const response = await fetch(url, {
      'method': 'POST',
      'headers': {
        'Authorization': authorization,
        'content-type': 'application/json; charset:UTF-8',
      },
      'body': JSON.stringify(data),
    })
    return response
  } catch (error) {
    return error
  }
}