"use server"

export interface VoterInfo {
  name: string
  email: string
  phone: string
  nomineeId: string
  categoryId: string
}

export async function submitVote(
  voterInfo: VoterInfo,
  nomineeName: string,
  categoryTitle: string,
): Promise<{ success: boolean; error?: string; id?: string }> {
  try {
    console.log("=== VOTE SUBMISSION ACTION ===")
    console.log("Submitting vote via API...")

    // Validate required fields
    if (!voterInfo.name || !voterInfo.email || !voterInfo.phone || !voterInfo.nomineeId || !voterInfo.categoryId) {
      return { success: false, error: "Missing required information." }
    }

    // Call the public vote API endpoint
   const response = await fetch(`${process.env.NEXTAUTH_URL || "https://fitnessfest.vercel.app"}/api/public/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        voterInfo,
        nomineeName,
        categoryName: categoryTitle,
      }),
    })

    const result = await response.json()

    console.log("API response:", result)

    if (!result.success) {
      return { success: false, error: result.error || "Failed to submit vote" }
    }

    return { success: true, id: result.id }
  } catch (error) {
    console.error("Vote submission action error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to submit vote",
    }
  }
}
