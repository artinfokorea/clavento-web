import React from "react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

type LinkButtonProps = {
  text: string
  href: string
}

export const LinkButton = ({ text, href }: LinkButtonProps) => {
  const router = useRouter()

  return (
    <Button
      className="h-6 w-16 rounded-2xl bg-main text-xs font-semibold hover:bg-main/80 md:h-8"
      onClick={() => router.push(href)}
    >
      {text}
    </Button>
  )
}
