"use client"

import React, { useState } from "react"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { MajorType } from "@/types"
import { Button } from "../ui/button"
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react"
import { Transition } from "@headlessui/react"

const artistSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  contents: z.string().min(1, { message: "Contents is required" }),
  major: z.nativeEnum(MajorType),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .max(10, { message: "Password must be less than 10 characters" }),
  fileId: z.number().positive({ message: "File is required" }),
})

type ArtistFormData = z.infer<typeof artistSchema>

export const ArtistForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ArtistFormData>({
    resolver: zodResolver(artistSchema),
  })
  const [isOpen, setIsOpen] = useState(false)

  const onSubmit = (data: ArtistFormData) => {
    console.log(data)
  }

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <form className="mt-12" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          {...register("name")}
          className="rounded-3xl px-4 placeholder:text-sm placeholder:text-coolgray"
          placeholder="Name or Organization"
        />
        <div
          className={`relative block w-[154px] border border-main p-2 duration-200 md:hidden ${
            isOpen ? "border-b-none rounded-t-3xl" : "rounded-3xl"
          }`}
        >
          <button
            className="flex w-full cursor-pointer justify-between rounded-3xl bg-main px-2 py-1 text-xs font-semibold text-white"
            onClick={handleOpen}
          >
            <p>{watch("major") || "All"}</p>

            {isOpen ? (
              <ChevronDownIcon className="h-4 w-4 transform transition-transform duration-200 ease-in-out" />
            ) : (
              <ChevronRightIcon className="h-4 w-4 transform transition-transform duration-200 ease-in-out" />
            )}
          </button>
          <Transition
            show={isOpen}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div className="absolute left-[-1px] top-[100%] z-40 flex w-[154px] flex-col gap-3 rounded-b-3xl border-b border-l border-r border-main bg-white p-2 shadow-md">
              <button
                onClick={() => setValue("major", null)}
                className="px-2 text-left text-xs font-semibold"
              >
                All
              </button>
              {Object.keys(MajorType).map(key => (
                <button
                  key={key}
                  onClick={() => setValue("major", key as MajorType)}
                  className="px-2 text-left text-xs font-semibold"
                >
                  {key}
                </button>
              ))}
            </div>
          </Transition>
        </div>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  )
}
