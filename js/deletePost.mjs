export default async (id) => {
  const authorization = localStorage.getItem('accessToken')
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: authorization,
      },
    })
    if (response.ok) {
      const message = document.querySelector(`li[data-id="${id}"]`)
      message.remove()
    } else {
      throw new Error(JSON.stringify(response))
    }
  } catch (err) {
    console.error(await err.json())
  }
}