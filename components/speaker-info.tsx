import type { Speaker } from "@/data/events"

interface SpeakerInfoProps {
  speaker: Speaker
}

export function SpeakerInfo({ speaker }: SpeakerInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="grid gap-6">
        <div>
          <h3 className="text-gray-700 font-medium mb-2">Date of Birth:</h3>
          <p className="text-gray-900">{speaker.dateOfBirth}</p>
        </div>

        <div>
          <h3 className="text-gray-700 font-medium mb-2">Mobile Number:</h3>
          <p className="text-gray-900">{speaker.mobileNumber}</p>
        </div>

        <div>
          <h3 className="text-gray-700 font-medium mb-2">Address :</h3>
          <p className="text-gray-900">{speaker.address?.line1}</p>
          <p className="text-gray-900">{speaker.address?.line2}</p>
        </div>

        {speaker.skills && (
          <div className="space-y-4 mt-2">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700">Creativity</span>
                <span className="text-gray-700">{speaker.skills.creativity} %</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-400 h-2 rounded-full"
                  style={{ width: `${speaker.skills.creativity}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700">Speaking</span>
                <span className="text-gray-700">{speaker.skills.speaking} %</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-400 h-2 rounded-full" style={{ width: `${speaker.skills.speaking}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700">Management</span>
                <span className="text-gray-700">{speaker.skills.management} %</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-400 h-2 rounded-full"
                  style={{ width: `${speaker.skills.management}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
