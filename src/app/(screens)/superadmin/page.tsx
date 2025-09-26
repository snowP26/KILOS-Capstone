'use client';

import { Button } from '@/components/ui/button'
import { MapPin } from "lucide-react"
import { useRouter } from 'next/navigation'
import { useUserRole } from '../../actions/role';
import Link from 'next/link';

export default function SAPage() {
  const router = useRouter();
  const { role } = useUserRole();

  if (role !== "superadmin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#1D1A1A] text-center px-6">
        <h1 className="text-2xl font-semibold text-white mb-4">
          Access Denied
        </h1>
        <p className="text-gray-400 mb-6">
          You don’t have permission to view this page.
        </p>
        <Link href="/">
          <Button className="bg-[#1D1A1A] text-[#C1E8FF] border border-[#2A2727] rounded-xl shadow-sm hover:bg-[#2A2727] hover:text-white transition-all">
            Return Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute top-6 right-8 text-3xl font-extrabold tracking-wide text-[#C5EEEF] drop-shadow-lg">
        KILOS
      </div>
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-10 w-full max-w-3xl text-center border border-white/20">
        <h1 className="text-2xl font-bold text-white mb-8 tracking-wide">
          Select a Location
        </h1>

        <div className="flex flex-wrap justify-center gap-6">
          <Button
            className="cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all"
            onClick={() => router.push(`superadmin/locations/naga-city`)}
          >
            <MapPin className="h-5 w-5" />
            Naga City
          </Button>

          <Button
            className="cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all"
            onClick={() => router.push(`superadmin/locations/bula`)}
          >
            <MapPin className="h-5 w-5" />
            Bula
          </Button>

          <Button
            className="cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-4 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all"
            onClick={() => router.push(`superadmin/locations/pili`)}
          >
            <MapPin className="h-5 w-5" />
            Pili
          </Button>
        </div>
      </div>
    </div>
  )
}
