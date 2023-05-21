const baseurl = "https://api.noroff.dev/api/v1/social"
const registerEndpoint = "/auth/login"

export default async (data) => {
  try{
    const response = await fetch(baseurl + registerEndpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json; charset:UTF-8',
      },
    })
    return response
  } catch (error) {
    console.error(error)
  }
}
