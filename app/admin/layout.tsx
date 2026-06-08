import Link from 'next/link';
import { Home, Plus, List, Settings } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link
                href="/"
                className="flex items-center px-4 border-b-2 border-purple-600 text-purple-600"
              >
                <Home className="w-5 h-5 mr-2" />
                Home
              </Link>
              <Link
                href="/admin"
                className="flex items-center px-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Card
              </Link>
              <Link
                href="/admin/cards"
                className="flex items-center px-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                <List className="w-5 h-5 mr-2" />
                All Cards
              </Link>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 text-sm">Admin Dashboard</span>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
