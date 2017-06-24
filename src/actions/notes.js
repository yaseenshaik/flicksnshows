export const PUT_NOTE = 'PUT_NOTE'

export const putNote = (id, mediaType, note) => ({
  type: PUT_NOTE,
  id,
  mediaType,
  note
})
