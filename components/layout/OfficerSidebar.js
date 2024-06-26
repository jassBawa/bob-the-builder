'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogoIcon, ProfileIcon } from '@/components/ui/icons';
import { Hourglass } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase';

function Sidebar() {
  const sideLinks = [
    {
      title: 'Home',
      icon: <LogoIcon />,
      href: '/officer',
      isAdmin: true,
    },
    {
      title: 'Requests',
      icon: <Hourglass />,
      href: '/officer/requests',
      isAdmin: true,
    },
    {
      title: 'Profile',
      icon: <ProfileIcon />,
      href: '/officer/profile',
      isAdmin: true,
    },
  ];

  const router = useRouter();

  const handleLogout = () => {
    signOut(auth);
    router.push('/login');
  };

  return (
    <div className="hidden md:flex bg-[#0E0E22] text-white py-5 flex-col pl-4 pr-6 w-full max-w-[15rem] ">
      <div className="mt-8">
        <img
          src="/logo.png"
          alt="Brand"
          className="h-16 object-cover mx-auto"
        />
      </div>
      <div className="flex flex-col gap-4 mt-12 text-md">
        {sideLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="flex items-center px-2 gap-4 transition cursor-pointer hover:active-sidelink hover:bg-gray-700 py-2 rounded font-semibold"
          >
            {link.icon}
            {link.title}
          </Link>
        ))}
      </div>
      <div className="mt-auto">
        <div
          onClick={handleLogout}
          className="flex items-center px-2 gap-4 transition cursor-pointer hover:active-sidelink hover:bg-gray-700 py-2 rounded font-semibold"
        >
          Logout
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
