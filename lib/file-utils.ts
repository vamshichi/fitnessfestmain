import { unlink } from "fs/promises"
import { existsSync } from "fs"
import { join } from "path"

// Helper function to delete uploaded files
export async function deleteUploadedFiles(filePaths: string[]): Promise<void> {
  for (const filePath of filePaths) {
    try {
      const fullPath = join(process.cwd(), "public", filePath)
      if (existsSync(fullPath)) {
        await unlink(fullPath)
        console.log(`Deleted file: ${filePath}`)
      }
    } catch (error) {
      console.error(`Error deleting file ${filePath}:`, error)
    }
  }
}

// Helper function to get file size
export function getFileSize(filePath: string): number {
  try {
    const fullPath = join(process.cwd(), "public", filePath)
    if (existsSync(fullPath)) {
      const fs = require("fs")
      const stats = fs.statSync(fullPath)
      return stats.size
    }
  } catch (error) {
    console.error(`Error getting file size for ${filePath}:`, error)
  }
  return 0
}

// Helper function to validate file type
export function isValidFileType(filename: string, allowedTypes: string[]): boolean {
  const extension = filename.split(".").pop()?.toLowerCase()
  return extension ? allowedTypes.includes(extension) : false
}

// File type configurations
export const FILE_TYPE_CONFIG = {
  images: ["jpg", "jpeg", "png", "gif", "webp"],
  documents: ["pdf", "doc", "docx", "txt"],
  videos: ["mp4", "avi", "mov", "wmv", "flv"],
  all: ["jpg", "jpeg", "png", "gif", "webp", "pdf", "doc", "docx", "txt", "mp4", "avi", "mov", "wmv", "flv"],
}

// Maximum file size (5MB)
export const MAX_FILE_SIZE = 5 * 1024 * 1024
