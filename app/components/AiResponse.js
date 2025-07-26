export default function AiResponse({ children }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
        AI
      </div>

      <div className="flex-1">
        <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 max-w-3xl">
          {children}
        </div>
        <span className="text-xs text-gray-500 mt-1 block">2:35 PM</span>
      </div>
    </div>
  );
}
