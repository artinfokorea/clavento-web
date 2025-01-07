"use client"

import React, { useRef, useState } from "react"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { MajorType } from "@/types"
import { Button } from "../ui/button"
import { MajorSelect } from "../common/MajorSelect"
import { FileUploader } from "../common/FileUploader"
import { XIcon } from "lucide-react"
import { uploadFile } from "@/services/system"
import useToast from "@/hooks/useToast"
import dynamic from "next/dynamic"
import { Spinner } from "../common/Loading"
import { createArtist } from "@/services/artists"
import { ArtistPayload } from "@/interface/artists"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

const CKEditor = dynamic(() => import("@/components/common/CkEditor"), {
  loading: () => (
    <div className="flex h-[400px] items-center justify-center">
      <Spinner className="h-8 w-8" />
    </div>
  ),
  ssr: false,
})

const artistSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  contents: z.string().min(1, { message: "Contents is required" }),
  major: z.nativeEnum(MajorType).nullable(),
  password: z.string().min(1, { message: "Password is required" }),
  file: z.any().nullable(),
  fileId: z.number().nullable(),
})

type ArtistFormData = z.infer<typeof artistSchema>

export const ArtistForm = () => {
  const { successToast, errorToast } = useToast()
  const queryClient = useQueryClient()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    setError,
  } = useForm<ArtistFormData>({
    resolver: zodResolver(artistSchema),
    defaultValues: {
      major: MajorType.ORCHESTRA,
    },
  })
  const fileUploader = useRef<HTMLInputElement>(null)

  const openFileUploader = () => {
    fileUploader.current?.click()
  }

  const [isOpen, setIsOpen] = useState(false)

  const onSubmit = async (data: ArtistFormData) => {
    console.log("1")
    if (!data.fileId) {
      setError("file", { message: "File is required" })
    }
    console.log("2")
    if (!data.major) {
      setError("major", { message: "Major is required" })
    }
    console.log("errors", errors)

    const payload: ArtistPayload = {
      name: data.name,
      contents: data.contents,
      major: data.major as MajorType,
      fileId: data.fileId as number,
      password: data.password,
    }
    console.log("3")
    try {
      await createArtist(payload)
      successToast("Artist created successfully")
      queryClient.invalidateQueries({ queryKey: ["artists"] })
      router.push("/")
    } catch (error) {
      console.error(error)
      errorToast("Failed to create artist")
    }
  }

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const uploadedFile = async (file: File) => {
    try {
      const response = await uploadFile(file)
      if (response) {
        setValue("file", file)
        setValue("fileId", response.data.id)
      }
      successToast("File uploaded successfully")
    } catch (error) {
      console.error(error)
      errorToast("Failed to upload file")
    }
  }

  return (
    <form className="mt-8 md:mt-[60px]">
      <div className="flex flex-col gap-[20px] md:flex-row">
        <Input
          {...register("name")}
          className="h-[34px] w-[230px] rounded-3xl border-main px-4 placeholder:text-sm placeholder:text-coolgray focus:outline-none focus-visible:ring-0"
          placeholder="Name or Organization"
        />
        <MajorSelect
          isOpen={isOpen}
          handleOpen={handleOpen}
          value={watch("major")}
          setValue={(value: MajorType | null) => {
            setValue("major", value)
            handleOpen()
          }}
        />
        <div className="relative flex w-[300px] items-center gap-2 rounded-3xl border border-main px-2 py-[6px] md:py-1">
          <button
            type="button"
            onClick={openFileUploader}
            className="h-5 rounded-3xl bg-main px-2 py-[2px] text-xs font-semibold text-white"
          >
            Select file
          </button>
          {watch("file") ? (
            <div className="flex items-center justify-between">
              <p className="max-w-[180px] truncate text-xs">
                {watch("file")?.name}
              </p>
              <button
                onClick={() => {
                  setValue("file", null)
                  setValue("fileId", null)
                }}
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <p className="text-xs text-main">No files selected</p>
          )}
        </div>
      </div>
      <div className="mt-6 md:mt-[36px]">
        <CKEditor
          value={watch("contents")}
          onChange={value => setValue("contents", value)}
        />
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <div>
          <Input
            {...register("password")}
            className="h-8 w-[220px] rounded-3xl border-main px-4 placeholder:text-sm placeholder:text-coolgray focus:outline-none focus-visible:ring-0"
            placeholder="Password"
          />
        </div>
        <Button
          type="button"
          onClick={() => router.push("/")}
          className="h-8 w-16 rounded-2xl border border-main bg-white text-xs font-semibold text-main md:h-8"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="h-8 w-16 rounded-2xl bg-main text-xs font-semibold md:h-8"
        >
          Submit
        </Button>
      </div>

      <FileUploader ref={fileUploader} uploadedFile={uploadedFile} />
    </form>
  )
}
