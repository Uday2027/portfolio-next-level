
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-[#262626] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Zubayer Hossain Uday. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link
              href="https://www.linkedin.com/in/zubayerhossainuday"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              LinkedIn
            </Link>
            <Link
              href="mailto:zubayerhossain1009@gmail.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Email
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
