import {fetchPosts} from "./loadposts.mjs";
import placeMessages from "./placeMessages.mjs";

let query = new URL(document.location).searchParams
const id = parseInt(query.get('id'))
const messageList = document.querySelector('#message-list')
const authorization = `Bearer ${localStorage.getItem('accessToken')}`

const respons = await fetchPosts(authorization, id)
const json = await respons.json()

if (respons.ok) {
  placeMessages(json, messageList)
} else {
  console.log(json)
}