import Image from "next/image"
import Link from "next/link"

export default function GallerySection() {
  const galleries = [
    { id: 1, year: "2018", month: "Aug", image: "/placeholder.svg?height=300&width=400" },
    { id: 2, year: "2019", month: "Jun", image: "/placeholder.svg?height=300&width=400" },
    { id: 3, year: "2020", month: "Sep", image: "/placeholder.svg?height=300&width=400" },
    { id: 4, year: "2021", month: "May", image: "/placeholder.svg?height=300&width=400" },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {galleries.map((gallery) => (
        <Link key={gallery.id} href="/gallery" className="group relative overflow-hidden rounded-lg">
          <Image
            src={gallery.image || "/placeholder.svg"}
            alt={`Gallery ${gallery.year}`}
            width={400}
            height={300}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-center text-white">
              <span className="block text-xl">{gallery.month}</span>
              <h5 className="text-3xl font-bold">{gallery.year}</h5>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
