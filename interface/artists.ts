import { MajorType } from "@/types"

export interface ArtistPayload {
  name: string
  contents: string
  major: MajorType
  fileId: number
  password: string
}
