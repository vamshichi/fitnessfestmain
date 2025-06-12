import { put } from "@vercel/blob"

export async function uploadFile(file: File, folder = "nominations"): Promise<string> {
  try {
    const filename = `${folder}/${Date.now()}-${file.name}`
    const blob = await put(filename, file, {
      access: "public",
    })
    return blob.url
  } catch (error) {
    console.error("File upload error:", error)
    throw new Error("Failed to upload file")
  }
}

export async function uploadMultipleFiles(files: File[], folder = "nominations"): Promise<string[]> {
  try {
    const uploadPromises = files.map((file) => uploadFile(file, folder))
    return await Promise.all(uploadPromises)
  } catch (error) {
    console.error("Multiple file upload error:", error)
    throw new Error("Failed to upload files")
  }
}
