export default function HumanMessage({ children }) {
  return (
    <div className="flex items-start justify-end space-x-3">
      <div className="">
        <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-3xl">
          <p className="text-gray-800">{children}</p>
        </div>
        <span className="text-xs text-gray-500 mt-1 block">2:34 PM</span>
      </div>
      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
        H
      </div>
    </div>
  );
}
