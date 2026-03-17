import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold tracking-[-0.03em] mb-4 text-gray-900">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <Link
          href="/en"
          className="inline-flex items-center gap-2 bg-[#2D5CF3] text-white px-6 py-3 rounded-full font-medium hover:bg-[#2450d9] transition-colors shadow-sm hover:shadow-md"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
