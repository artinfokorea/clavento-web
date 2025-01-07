import { Input } from "@headlessui/react"
import { ChangeEvent } from "react"

interface FileUploaderProps {
  ref: React.RefObject<HTMLInputElement | null>
  uploadedFile: (files: File) => void
}

export const FileUploader = ({ ref, uploadedFile }: FileUploaderProps) => {
  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target as HTMLInputElement
    if (!files) {
      return
    }

    if (uploadedFile) {
      uploadedFile(files[0])
    }
  }

  return (
    <div>
      <Input
        type="file"
        ref={ref}
        className="hidden h-[34px] w-full rounded-3xl px-4 placeholder:text-sm placeholder:text-coolgray md:w-[228px]"
        placeholder="Name or Organization"
        onChange={handleChangeFile}
      />
    </div>
  )
}
