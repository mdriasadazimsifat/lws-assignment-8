import logo from "@/public/assets/logo.svg";
import Image from "next/image";
export default function Footer() {
  return (
    <div className="p-4 border-t border-gray-700 mt-auto">
      <div className="text-center space-y-2">
        <span className="text-xs text-gray-400">Powered by</span>
        <div className="flex items-center justify-center space-x-2">
          <Image src={logo} alt="Logo" className="h-10" />
        </div>
        <p className="text-xs text-gray-500">© 2025 All rights reserved</p>
      </div>
    </div>
  );
}
