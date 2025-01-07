const API_URL = process.env.NEXT_PUBLIC_API_URL

export const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("type", "ARTIST")

  const response = await fetch(`${API_URL}/system/files`, {
    method: "POST",
    body: formData,
  })

  return response.json()
}

export const getFile = async (fileId: number) => {
  const response = await fetch(`${API_URL}/system/files/${fileId}`)
  return response.json()
}
