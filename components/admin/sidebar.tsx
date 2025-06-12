import type { ReactNode } from "react"
import Link from "next/link"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          <ul>
            <li>
              <Link
                href="/admin/dashboard"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/nominations"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800"
              >
                Nominations
              </Link>
            </li>
            <li>
              <Link href="/admin/users" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">
                Users
              </Link>
            </li>
            <li>
              <Link
                href="/admin/settings"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800"
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                href="/admin/contacts"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800"
              >
                Contacts
              </Link>
            </li>
            <li>
              <Link
                href="/admin/registrations"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800"
              >
                Registrations
              </Link>
            </li>
            <li>
              <Link href="/admin/votes" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">
                Votes
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-xl text-gray-800">Admin Panel</h2>
              <div>
                <Link
                  href="/api/auth/logout"
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
