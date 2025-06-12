// types/contact.ts
export type Contact = {
    id: string
    status: "new" | "in-progress" | "completed"
    assignedTo?: string
  }
  