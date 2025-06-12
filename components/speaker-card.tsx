import Image from "next/image"
import Link from "next/link"
import { Facebook, Twitter, Linkedin } from "lucide-react"

interface SpeakerCardProps {
  name: string
  role: string
  image: string
}

export default function SpeakerCard({ name, role, image }: SpeakerCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2">
      <div className="aspect-square overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80"></div>

      <div className="absolute bottom-0 left-0 w-full p-6 text-white">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-white/80">{role}</p>

        <div className="mt-4 flex space-x-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Link href="#" className="rounded-full bg-white/20 p-2 hover:bg-white/40">
            <Facebook size={16} />
          </Link>
          <Link href="#" className="rounded-full bg-white/20 p-2 hover:bg-white/40">
            <Twitter size={16} />
          </Link>
          <Link href="#" className="rounded-full bg-white/20 p-2 hover:bg-white/40">
            <Linkedin size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
