"use client"

import { useListSearchForm } from "@/hooks/useListSearchForm"
import { Input } from "../ui/input"

import { SearchIcon, XIcon } from "lucide-react"

interface Props {
  children?: React.ReactNode
  placeholder?: string
}

const ListSearchForm = ({ children, placeholder }: Props) => {
  const { searchInput, handleSubmit, resetKeyword, handleSearchInput } =
    useListSearchForm()

  return (
    <div className="mx-auto mb-3 mt-8 flex max-w-screen-sm flex-col items-center px-4 md:mb-12 md:mt-4">
      {children}
      <form className="relative mt-2 w-full" onSubmit={handleSubmit}>
        <Input
          value={searchInput}
          onChange={handleSearchInput}
          className="h-[44px] w-full rounded-3xl border-2 border-main px-14 text-base text-black placeholder-gray-400 placeholder:text-sm focus:outline-none focus:ring-0 focus-visible:ring-0"
          placeholder={placeholder || "직군, 전공, 분야 등을 검색해보세요."}
        />
        <button
          type="submit"
          className="absolute left-5 top-[14px] md:top-[12px]"
        >
          <SearchIcon className="h-4 w-4 text-gray-400 md:h-5 md:w-5" />
        </button>

        {searchInput && (
          <button
            type="button"
            onClick={resetKeyword}
            className="absolute right-3 top-3 md:top-[10px]"
          >
            <XIcon className="h-5 w-5 text-gray-400 md:h-6 md:w-6" />
          </button>
        )}
      </form>
    </div>
  )
}

export default ListSearchForm
