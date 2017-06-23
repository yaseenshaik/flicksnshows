import { schema } from 'normalizr'

export const showSchema = new schema.Entity('shows')

export const showListSchema = new schema.Entity(
  'showsPages',
  {
    results: [showSchema]
  },
  {
    idAttribute: result => result.page
  }
)

export const flickSchema = new schema.Entity('flicks')

export const flickListSchema = new schema.Entity(
  'flicksPages',
  {
    results: [flickSchema]
  },
  {
    idAttribute: result => result.page
  }
)
