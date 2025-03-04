import Link from "next/link"
import { ArrowDown } from "lucide-react"

export default function Hero() {
  return (
    <section className="bg-black text-white py-16 md:py-24 px-6 md:px-12 lg:px-20">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16">
          Building Better
          <br />
          Construction Companies
        </h1>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <p className="text-xl md:text-2xl font-medium mb-6">
              Ascent Consulting is the premier provider of business, operations, management, technology, and marketing
              consulting services for construction companies in North America.
            </p>

            <div className="mt-10">
              <Link
                href="/download"
                className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-full transition-colors"
              >
                Download Our Information
                <ArrowDown className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-lg">We are committed to helping our clients Build Better Construction Companies.</p>

            <p className="text-lg">
              Unlike other business consulting firms, we <span className="font-bold">only</span> work with construction
              companies and contractors. As experienced contractors and business owners, we understand how our clients
              think and operate, which is why they choose us to help solve their most important challenges.
            </p>

            <p className="text-lg text-red-500">
              By utilizing our comprehensive industry knowledge, real-world experience and team of dedicated
              professionals, we create innovative, customized solutions to help our clients get to the next level of
              performance and success.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

