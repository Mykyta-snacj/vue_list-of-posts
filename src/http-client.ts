import axios from 'axios'
import type { User } from './types'

const delayTime = 1000

const httpClient = axios.create({
  baseURL: 'https://mate.academy/students-api',
})

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

//posts
export const getPosts = async (userId: number | null) => {
  await delay(delayTime)

  const response = await httpClient.get(`/posts?userId=${userId}`)
  return response.data
}

export const createPost = (userId: number | null, title: string, body: string) => {
  return httpClient.post(`/posts`, {
    userId: userId,
    title,
    body,
  })
}

export const removePost = (id: number) => {
  return httpClient.delete(`/posts/${id}`)
}

export const updatePost = (userId: number | null, id: number, title?: string, body?: string) => {
  return httpClient.patch(`/posts/${id}`, {
    title: title,
    body: body,
    userId: userId,
  })
}

//comments
export const getComments = async (postId?: number) => {
  if (postId) {
    await delay(delayTime)

    const response = await httpClient.get(`/comments?postId=${postId}`)
    return response.data
  }
}

export const createComment = (postId: number, name: string, email: string, body: string) => {
  return httpClient.post('/comments', {
    postId: postId,
    name: name,
    email: email,
    body: body,
  })
}

export const removeComment = (id: number) => {
  return httpClient.delete(`/comments/${id}`)
}

//user
export const getUser = async (email: string): Promise<User | null> => {
  await delay(delayTime)

  const response = await httpClient.get(`/users?email=${email}`)

  if (response.data.length > 0) {
    return response.data[0]
  }

  return null
}

export const createUser = async (email: string, name: string) => {
  return httpClient.post(`/users`, {
    name: name,
    username: null,
    email: email,
    phone: null,
  })
}
