import { speakers, type Speaker } from "@/data/events"

// Function to get speaker by ID
export function getSpeakerById(id: string) {
    return speakers.find((speaker) => speaker.id === id)
  }
  
  

// Function to get speaker by name
export function getSpeakerByName(name: string): Speaker | undefined {
    return speakers.find((speaker) => speaker.name.toLowerCase() === name.toLowerCase());
  }
  