import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"

export const useListSearchForm = () => {
  const searchParams = useSearchParams()
  const keyword = searchParams.get("keyword") as string
  const [searchInput, setSearchInput] = useState(keyword || "")
  const router = useRouter()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const searchParams = new URLSearchParams(window.location.search)
    searchParams.delete("keyword")

    if (searchInput) {
      searchParams.append("keyword", searchInput)
    }

    const newUrl = `/?${searchParams.toString()}`

    router.push(newUrl)
  }

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const resetKeyword = () => {
    setSearchInput("")
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.delete("keyword")

    const newUrl = `/?${searchParams.toString()}`

    router.push(newUrl)
  }

  return {
    searchInput,
    handleSearchInput,
    handleSubmit,
    resetKeyword,
  }
}
