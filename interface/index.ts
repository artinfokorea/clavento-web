import { MajorType } from "@/types"

export interface ListRequest {
  page: number
  size: number
  keyword?: string
  major?: MajorType
}

export interface ListResponse<T> {
  data: T[]
  type: string
  exception?: string
}

export type ScrollApiResponse<T, K extends string> = {
  [key in K]: T[]
} & {
  nextPage: number
  isLast: boolean
}

export interface DetailResponse<T> {
  data: T
  type: string
  exception?: string
}
