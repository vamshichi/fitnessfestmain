"use client"
import { Suspense } from "react"
import LoginForm from "./login-form"

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#dc5044] to-[#70adb0]">
          Loading...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
