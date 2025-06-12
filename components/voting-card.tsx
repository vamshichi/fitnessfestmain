"use client"

import { useState } from "react"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp, faCheck } from "@fortawesome/free-solid-svg-icons"
import { Button } from "@/components/ui/button"
import VoterFormModal from "./voter-form-modal"

interface Nominee {
  id: string
  name: string
  description: string
  votes: number
  image: string
}

interface VotingCardProps {
  nominee: Nominee
  categoryId: string
  color: string
  onVote: (voterInfo: VoterInfo) => Promise<{ success: boolean; id?: string; error?: string } | void>
  hasVoted: boolean
  isSubmitting?: boolean
}

export interface VoterInfo {
  name: string
  email: string
  phone: string
  nomineeId: string
  categoryId: string
}

export default function VotingCard({
  nominee,
  categoryId,
  color,
  onVote,
  hasVoted,
  isSubmitting = false,
}: VotingCardProps) {
  const [isVoting, setIsVoting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [localVotes, setLocalVotes] = useState(nominee.votes)
  const [showVoterForm, setShowVoterForm] = useState(false)

  // Calculate a percentage for the progress bar (assuming max votes is around 500)
  const votePercentage = Math.min(Math.round((localVotes / 500) * 100), 100)

  const getHeaderColor = () => {
    switch (color) {
      case "red":
        return "bg-[#dc5044] text-white"
      case "teal":
        return "bg-[#70adb0] text-white"
      case "yellow":
        return "bg-[#f3c532] text-black"
      default:
        return `bg-[${color}] text-white`
    }
  }

  const getProgressColor = () => {
    switch (color) {
      case "red":
        return "bg-[#dc5044]"
      case "teal":
        return "bg-[#70adb0]"
      case "yellow":
        return "bg-[#f3c532]"
      default:
        return `bg-[${color}]`
    }
  }

  const handleVoteClick = () => {
    if (hasVoted || isSubmitting) return
    setShowVoterForm(true)
  }

  const handleVoterFormSubmit = async (voterInfo: VoterInfo) => {
    setShowVoterForm(false)
    setIsVoting(true)

    try {
      // Call the onVote function which will handle the API call
      const result = await onVote(voterInfo)

      if (result && result.success) {
        // Update local state on success
        setLocalVotes((prev) => prev + 1)
        setShowConfirmation(true)
        console.log("Vote submitted successfully with ID:", result.id)

        // Hide confirmation after 3 seconds
        setTimeout(() => {
          setShowConfirmation(false)
        }, 3000)
      } else {
        console.error("Vote submission failed:", result?.error)
      }
    } catch (error) {
      console.error("Error submitting vote:", error)
    } finally {
      setIsVoting(false)
    }
  }

  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative z-10">
        <div className={`p-6 relative ${getHeaderColor()}`}>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2720%27%20height%3D%2720%27%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cg%20fill%3D%27%23ffffff%27%20fill-opacity%3D%270.1%27%20fill-rule%3D%27evenodd%27%3E%3Ccircle%20cx%3D%273%27%20cy%3D%273%27%20r%3D%273%27%2F%3E%3Ccircle%20cx%3D%2713%27%20cy%3D%2713%27%20r%3D%273%27%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
              <Image
                src={nominee.image || "/placeholder.svg"}
                alt={nominee.name}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-xl font-bold">{nominee.name}</h3>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-6">{nominee.description}</p>

          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Current Votes</span>
              <span className="text-sm font-medium text-gray-700">{localVotes}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className={`h-2.5 rounded-full ${getProgressColor()}`} style={{ width: `${votePercentage}%` }}></div>
            </div>
          </div>

          {showConfirmation ? (
            <div className="bg-green-100 text-green-800 p-3 rounded-lg flex items-center justify-center gap-2 animate-pulse">
              <FontAwesomeIcon icon={faCheck} />
              <span>Vote recorded!</span>
            </div>
          ) : (
            <Button
              onClick={handleVoteClick}
              disabled={isVoting || hasVoted || isSubmitting}
              className={`w-full py-3 ${
                hasVoted || isSubmitting
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : `bg-[#dc5044] hover:bg-[#c03c32] text-white`
              }`}
            >
              {isVoting || isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : hasVoted ? (
                <span className="flex items-center justify-center gap-2">
                  <FontAwesomeIcon icon={faCheck} />
                  Already Voted
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FontAwesomeIcon icon={faThumbsUp} />
                  Vote for {nominee.name}
                </span>
              )}
            </Button>
          )}
        </div>
      </div>

      {showVoterForm && (
        <VoterFormModal
          nominee={nominee}
          categoryId={categoryId}
          onClose={() => setShowVoterForm(false)}
          onSubmit={handleVoterFormSubmit}
        />
      )}
    </>
  )
}
