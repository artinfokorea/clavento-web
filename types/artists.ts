import { MajorType } from "."

export interface Artist {
  id: number
  major: MajorType
  name: string
  contents: string
  imageUrl: string
  createdAt: string
}
