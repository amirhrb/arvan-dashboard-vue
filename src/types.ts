export type UserDataTypes = {
  user: {
    email: string
    username: string
    bio: string | null
    image: string
    token: string
  }
}
export type ErrorDataTypes = {
  errors: any
}
export type ArticleDataTypes = {
  slug: string
  title: string
  description: string
  body: string
  tagList: [] | string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: {
    username: string
    bio: null | string
    image: string
    following: boolean
  }
}
export type CreateArticleDataTypes = {
  article: {
    title: string
    description: string
    body: string
    tagList?: string[]
  }
}
