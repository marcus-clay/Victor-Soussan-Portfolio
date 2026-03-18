import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-sm font-medium text-[#2D5CF3] mb-4 tracking-wide uppercase">Page not found</p>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-[-0.04em] mb-6 text-gray-900">404</h1>
        <p className="text-base text-gray-500 leading-relaxed mb-10">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/en"
            className="inline-flex items-center gap-2 bg-[#2D5CF3] text-white px-6 py-3 rounded-full font-medium hover:bg-[#2450d9] transition-colors shadow-sm hover:shadow-md"
          >
            Back to portfolio
          </Link>
          <Link
            href="/en/work"
            className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-full font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            View projects
          </Link>
        </div>
      </div>
    </div>
  )
}
