export type Post = {
  id: number
  userId: number
  title: string
  body: string
  createdAt: string
  updatedAt: string
}

export type PostComment = {
  id: number
  postId: number
  name: string
  email: string
  body: string
  createdAt: string
  updatedAt: string
}

export type User = {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  createdAt: string
  updatedAt: string
  address: {
    id: number
    userId: number
    street: string
    suite: string
    city: string
    zipcode: string
    createdAt: string
    updatedAt: string
  }
}
