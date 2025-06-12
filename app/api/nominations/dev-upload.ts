// This file is only for local development
// It won't be used in production

import { writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import { join } from "path"

export async function saveFileLocally(file: File, subfolder: string): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Create upload path
  const uploadDir = join(process.cwd(), "public", "uploads", subfolder)

  // Ensure directory exists
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true })
  }

  // Generate unique filename
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  const extension = file.name.split(".").pop()
  const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "")
  const filename = `${timestamp}-${randomString}-${nameWithoutExt}.${extension}`

  const filepath = join(uploadDir, filename)

  // Write file
  await writeFile(filepath, buffer)

  // Return public URL path
  return `/uploads/${subfolder}/${filename}`
}
