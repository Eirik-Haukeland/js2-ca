export const postFormSelectType = (radioBtn) => {
  const messageDiv = document.querySelector('#send-message-form')
  const imageDiv = document.querySelector('#send-image-form')
  if (radioBtn.id === 'send-image') {
    if (!messageDiv.classList.contains('hide-me')) {
      messageDiv.classList.add('hide-me')
    }
    if (imageDiv.classList.contains('hide-me')) {
      imageDiv.classList.remove('hide-me')
    }
  } else if (radioBtn.id === 'send-message') {
    if (messageDiv.classList.contains('hide-me')) {
      messageDiv.classList.remove('hide-me')
    }
    if (!imageDiv.classList.contains('hide-me')) {
      imageDiv.classList.add('hide-me')
    }
  }
}