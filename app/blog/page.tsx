import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock } from "lucide-react"

// Blog post data
const blogPosts = [
  {
    id: 1,
    title: "10 Tech Trends That Will Shape 2024",
    excerpt:
      "From AI advancements to sustainable tech, discover the innovations that will define the technology landscape in 2024.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/placeholder.svg?height=600&width=1200",
    author: "Mike Fermalin",
    authorRole: "Career Expert",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "May 15, 2024",
    readTime: "5 min read",
    category: "trends",
    featured: true,
  },
  {
    id: 2,
    title: "How to Prepare for a Tech Conference",
    excerpt:
      "Make the most of your conference experience with these essential tips for networking, learning, and professional growth.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/placeholder.svg?height=600&width=1200",
    author: "Anna Blair",
    authorRole: "Founder",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "May 10, 2024",
    readTime: "4 min read",
    category: "tips",
    featured: true,
  },
  {
    id: 3,
    title: "The Rise of AI in Software Development",
    excerpt:
      "Explore how artificial intelligence is transforming the way we build software and what it means for developers.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/placeholder.svg?height=600&width=1200",
    author: "Marcus Chen",
    authorRole: "AI Researcher",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "May 5, 2024",
    readTime: "6 min read",
    category: "ai",
    featured: false,
  },
  {
    id: 4,
    title: "Building a Career in Tech: Advice from Industry Leaders",
    excerpt:
      "Top professionals share their insights on navigating a successful career in the ever-evolving technology industry.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/placeholder.svg?height=600&width=1200",
    author: "Trevor J. Bell",
    authorRole: "Lead Trainer",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "April 28, 2024",
    readTime: "7 min read",
    category: "career",
    featured: false,
  },
  {
    id: 5,
    title: "The Future of Remote Work in Tech Companies",
    excerpt:
      "How technology companies are adapting to remote and hybrid work models and what it means for the industry.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/placeholder.svg?height=600&width=1200",
    author: "Jon P. Monroe",
    authorRole: "Traveller & Tech Nomad",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "April 20, 2024",
    readTime: "5 min read",
    category: "remote-work",
    featured: false,
  },
  {
    id: 6,
    title: "Cybersecurity Challenges in 2024",
    excerpt: "An overview of the most pressing cybersecurity threats and how organizations can protect themselves.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/placeholder.svg?height=600&width=1200",
    author: "James Wilson",
    authorRole: "Security Expert",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "April 15, 2024",
    readTime: "6 min read",
    category: "security",
    featured: false,
  },
  {
    id: 7,
    title: "Designing User-Friendly Interfaces for Complex Applications",
    excerpt: "Strategies for creating intuitive UX designs that simplify complex technical products for end users.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/placeholder.svg?height=600&width=1200",
    author: "Priya Sharma",
    authorRole: "UX Director",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "April 8, 2024",
    readTime: "4 min read",
    category: "design",
    featured: false,
  },
  {
    id: 8,
    title: "Highlights from Last Year's DevCon",
    excerpt: "A recap of the most memorable moments, talks, and innovations from DevCon 2023.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/placeholder.svg?height=600&width=1200",
    author: "David B. Perez",
    authorRole: "Founder",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "April 1, 2024",
    readTime: "5 min read",
    category: "events",
    featured: false,
  },
]

// Featured post card component
function FeaturedPostCard({ post }: { post: (typeof blogPosts)[0] }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
      <div className="md:flex">
        <div className="md:w-1/2 relative h-64 md:h-auto">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover h-full w-full" />
        </div>
        <div className="md:w-1/2 p-6 md:p-8">
          <div className="flex items-center mb-4">
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
              {post.category.charAt(0).toUpperCase() + post.category.slice(1).replace("-", " ")}
            </Badge>
            <span className="text-gray-500 text-sm ml-3 flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {post.readTime}
            </span>
          </div>

          <Link href={`/blog/${post.id}`}>
            <h3 className="text-2xl font-bold mb-3 hover:text-purple-600 transition-colors">{post.title}</h3>
          </Link>

          <p className="text-gray-600 mb-4">{post.excerpt}</p>

          <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
            <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
              <Image src={post.authorImage || "/placeholder.svg"} alt={post.author} fill className="object-cover" />
            </div>
            <div className="mr-4">
              <p className="font-medium text-sm">{post.author}</p>
              <p className="text-gray-500 text-xs">{post.authorRole}</p>
            </div>
            <div className="text-gray-500 text-sm">
              <Calendar className="w-4 h-4 inline mr-1" />
              {post.date}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Blog post card component
function BlogPostCard({ post }: { post: (typeof blogPosts)[0] }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center mb-3">
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
            {post.category.charAt(0).toUpperCase() + post.category.slice(1).replace("-", " ")}
          </Badge>
          <span className="text-gray-500 text-sm ml-3 flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {post.readTime}
          </span>
        </div>

        <Link href={`/blog/${post.id}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-purple-600 transition-colors">{post.title}</h3>
        </Link>

        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

        <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
          <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
            <Image src={post.authorImage || "/placeholder.svg"} alt={post.author} fill className="object-cover" />
          </div>
          <div className="mr-3">
            <p className="font-medium text-sm">{post.author}</p>
          </div>
          <div className="text-gray-500 text-sm ml-auto">
            <Calendar className="w-4 h-4 inline mr-1" />
            {post.date}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured)
  const allPosts = blogPosts

  // Get unique categories
  const categories = Array.from(new Set(blogPosts.map((post) => post.category)))

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog & News</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Stay updated with the latest insights, trends, and news from the tech industry
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Featured Articles</h2>
          <div className="grid gap-8">
            {featuredPosts.map((post) => (
              <FeaturedPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* All Blog Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold mb-4 md:mb-0">Latest Articles</h2>
            <div className="w-full md:w-64">
              <Input placeholder="Search articles..." className="w-full" />
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-12">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            </TabsContent>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allPosts
                    .filter((post) => post.category === category)
                    .map((post) => (
                      <BlogPostCard key={post.id} post={post} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-8">
              Get the latest articles, event updates, and exclusive content delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="flex-grow" />
              <Button className="bg-purple-600 hover:bg-purple-700 whitespace-nowrap">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Us at DevCon 2024</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Experience the latest tech trends and insights in person at our upcoming conference.
          </p>
          <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
            <Link href="/tickets">Get Your Ticket Now</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
