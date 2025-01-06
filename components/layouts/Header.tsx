"use client"

import Link from "next/link"
import React from "react"

export const Header = () => {
  return (
    <header className="mx-auto flex max-w-screen-lg justify-center px-4 py-6 md:justify-start md:py-3">
      <Link href="/">
        <h1 className="text-2xl font-bold text-main">CLAVENTO</h1>
      </Link>
    </header>
  )
}
