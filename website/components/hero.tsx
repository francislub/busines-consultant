import Link from "next/link";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section 
      className="relative bg-cover bg-center bg-no-repeat text-black py-16 md:py-24 px-6 md:px-12 lg:px-20"
      style={{ backgroundImage: "url('/images/three.jpg')" }} // Ensure correct path
    >
      {/* Overlay to improve readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="container mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-16">
          Building Better
          <br />
          Mancha Development Company
        </h1>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto text-white">
          <div>
            <p className="text-xl md:text-2xl font-medium mb-6">
            Mancha Development Company is a business consulting firm specializing in entrepreneurial skills, business management, monitoring and evaluation, and trainer development.
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
          <p className="text-lg">
            We are dedicated to empowering businesses with strategic consulting solutions for sustainable growth and success.
          </p>

          <p className="text-lg">
            Unlike general consulting firms, we <span className="font-bold">specialize</span> in business development, 
            entrepreneurship, and operational excellence. With our deep industry expertise, we help businesses navigate 
            challenges, optimize performance, and achieve their long-term goals.
          </p>
          </div>
        </div>
      </div>
    </section>
  );
}
