import { FileBarChart } from 'lucide-react';
import { Inter } from 'next/font/google';
import '../globals.css';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};
const inter = Inter({ subsets: ['latin'] });

export default function GettingStartedLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-full">
          <div className="hidden md:flex bg-[#0E0E22] text-white py-5 flex-col pl-4 pr-6 w-full max-w-[15rem] ">
            <div className="mt-8">
              <img
                src="/logo.png"
                alt="Brand"
                className="h-16 object-cover mx-auto"
              />
            </div>
            <div className="flex flex-col gap-4 mt-12 text-md">
              <div className="flex bg-white text-black items-center px-2 gap-4 transition cursor-pointer py-2 rounded font-semibold">
                <FileBarChart />
                Application Form
              </div>
            </div>
          </div>

          {/* Sidebar end */}
          <main className="flex-1 h-full overflow-scroll bg-[#EBEDF6]">
            <nav className="bg-white py-4 px-8">
              <div className="hamburger">=</div>
            </nav>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
