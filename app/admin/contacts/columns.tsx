"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown, Trash, Eye, CheckCircle, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

export type Contact = {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  type: string
  company: string | null
  website: string | null
  fitnessLevel: string | null
  competitionInterest: string | null
  experience: string | null
  sponsorshipLevel: string | null
  createdAt: Date
  updatedAt: Date
}

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: "name",
    id: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    id: "email",
    header: "Email",
  },
  {
    accessorKey: "subject",
    id: "subject",
    header: "Subject",
    cell: ({ row }) => {
      const subject = row.getValue("subject") as string
      return <div className="max-w-[200px] truncate">{subject}</div>
    },
  },
  {
    accessorKey: "type",
    id: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      let color = ""

      switch (type) {
        case "general":
          color = "bg-blue-100 text-blue-800"
          break
        case "competitor":
          color = "bg-green-100 text-green-800"
          break
        case "sponsor":
          color = "bg-purple-100 text-purple-800"
          break
        default:
          color = "bg-gray-100 text-gray-800"
      }

      return <Badge className={color}>{type}</Badge>
    },
  },
  {
    accessorKey: "createdAt",
    id: "createdAt",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      return <div>{formatDistanceToNow(date, { addSuffix: true })}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const contact = row.original
      const [showDetails, setShowDetails] = useState(false)

      // Function to handle contact deletion
      const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this contact?")) {
          try {
            const response = await fetch(`/api/admin/contacts/${contact.id}`, {
              method: "DELETE",
            })

            if (response.ok) {
              toast({
                title: "Contact deleted",
                description: "The contact has been successfully deleted.",
              })

              // Refresh the page to update the table
              window.location.reload()
            } else {
              throw new Error("Failed to delete contact")
            }
          } catch (error) {
            toast({
              title: "Error",
              description: "Failed to delete the contact. Please try again.",
              variant: "destructive",
            })
          }
        }
      }

      // Function to mark contact as resolved
      const markAsResolved = async () => {
        try {
          const response = await fetch(`/api/admin/contacts/${contact.id}/resolve`, {
            method: "PUT",
          })

          if (response.ok) {
            toast({
              title: "Contact marked as resolved",
              description: "The contact has been marked as resolved.",
            })
          } else {
            throw new Error("Failed to mark contact as resolved")
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to update the contact. Please try again.",
            variant: "destructive",
          })
        }
      }

      // Function to send email reply
      const sendEmail = () => {
        window.open(`mailto:${contact.email}?subject=Re: ${contact.subject}`, "_blank")
      }

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(contact.id)}>Copy ID</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowDetails(true)}>
                <Eye className="mr-2 h-4 w-4" />
                View details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={sendEmail}>
                <Mail className="mr-2 h-4 w-4" />
                Reply by email
              </DropdownMenuItem>
              <DropdownMenuItem onClick={markAsResolved}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as resolved
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Contact Details Dialog */}
          <Dialog open={showDetails} onOpenChange={setShowDetails}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Contact Details</DialogTitle>
                <DialogDescription>
                  Submitted {formatDistanceToNow(new Date(contact.createdAt), { addSuffix: true })}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="font-medium">Name:</div>
                  <div className="col-span-3">{contact.name}</div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="font-medium">Email:</div>
                  <div className="col-span-3">
                    <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                      {contact.email}
                    </a>
                  </div>
                </div>

                {contact.phone && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <div className="font-medium">Phone:</div>
                    <div className="col-span-3">{contact.phone}</div>
                  </div>
                )}

                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="font-medium">Type:</div>
                  <div className="col-span-3">
                    <Badge
                      className={
                        contact.type === "general"
                          ? "bg-blue-100 text-blue-800"
                          : contact.type === "competitor"
                            ? "bg-green-100 text-green-800"
                            : contact.type === "sponsor"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-gray-100 text-gray-800"
                      }
                    >
                      {contact.type}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="font-medium">Subject:</div>
                  <div className="col-span-3">{contact.subject}</div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div className="font-medium">Message:</div>
                  <div className="col-span-3 whitespace-pre-wrap">{contact.message}</div>
                </div>

                {/* Type-specific fields */}
                {contact.type === "competitor" && (
                  <>
                    {contact.fitnessLevel && (
                      <div className="grid grid-cols-4 items-center gap-4">
                        <div className="font-medium">Fitness Level:</div>
                        <div className="col-span-3">{contact.fitnessLevel}</div>
                      </div>
                    )}
                    {contact.competitionInterest && (
                      <div className="grid grid-cols-4 items-center gap-4">
                        <div className="font-medium">Competition Interest:</div>
                        <div className="col-span-3">{contact.competitionInterest}</div>
                      </div>
                    )}
                    {contact.experience && (
                      <div className="grid grid-cols-4 gap-4">
                        <div className="font-medium">Experience:</div>
                        <div className="col-span-3 whitespace-pre-wrap">{contact.experience}</div>
                      </div>
                    )}
                  </>
                )}

                {contact.type === "sponsor" && (
                  <>
                    {contact.company && (
                      <div className="grid grid-cols-4 items-center gap-4">
                        <div className="font-medium">Company:</div>
                        <div className="col-span-3">{contact.company}</div>
                      </div>
                    )}
                    {contact.website && (
                      <div className="grid grid-cols-4 items-center gap-4">
                        <div className="font-medium">Website:</div>
                        <div className="col-span-3">
                          <a
                            href={contact.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {contact.website}
                          </a>
                        </div>
                      </div>
                    )}
                    {contact.sponsorshipLevel && (
                      <div className="grid grid-cols-4 items-center gap-4">
                        <div className="font-medium">Sponsorship Level:</div>
                        <div className="col-span-3">{contact.sponsorshipLevel}</div>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={() => setShowDetails(false)}>
                  Close
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={sendEmail}>
                    <Mail className="mr-2 h-4 w-4" />
                    Reply
                  </Button>
                  <Button onClick={markAsResolved}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Resolved
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )
    },
  },
]
