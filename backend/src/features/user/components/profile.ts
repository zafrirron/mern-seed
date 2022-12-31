'use strict'

import User from '../user.model'
import { ClientError } from '../../../core/server/server.interface'

/**
 * Get all user data by id
 * @param id string
 * @returns object
 */
const check = async (id: string): Promise<any> => {
  const result = await User.findOne({ _id: id })
  if (!result) {
    throw new ClientError(1002, 'account not found')
  }
  return result
}

/**
 * Remove user by id
 * @param id string
 * @returns object
 */
const remove = async (id: string): Promise<any> => {
  const result = await User.findOneAndRemove({ _id: id })
  if (!result) {
    throw new ClientError(1002, 'account not found')
  }
  return true
}

/**
 * Get all users
 * @param sort string
 * @param page number
 * @param perpage number
 * @returns object
 */

const getAll = async (sort: string ,page: number,perPage: number): Promise<any> => {
  const result = await User.find().sort({'created': 'asc'}).limit(perPage).skip(perPage * page)
  if (!result) {
    throw new ClientError(1002, 'no results found')
  }
  return result
}

export default { check, remove, getAll }
export { check, remove, getAll }
