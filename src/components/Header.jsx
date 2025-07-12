import { Lock, Bell, Search, Settings, User } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 bg-white ring-1 ring-gray-200 shadow-sm w-full">
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold">Kanban</div>
      <div className="flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-4 relative">
        <input
          type="text"
          placeholder="Try searching tasks"
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-100 outline-none text-sm sm:text-base"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 text-xs sm:text-sm cursor-pointer hover:bg-blue-700 transition">
          <Lock className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </button>
        <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
        <Settings className="w-5 h-5 text-gray-600 cursor-pointer"/>
        <User className="w-5 h-5 text-gray-600 cursor-pointer"/>
      </div>
    </header>
  );
}
