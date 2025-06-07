import Image from "next/image";

export default function Home() {
  return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">SystemMedicals</h1>
        <div className="flex items-center gap-3 mb-4">
          <span className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></span>
          <span className="text-xl text-gray-700">Development in progress</span>
        </div>
        <p className="text-lg text-gray-500 mb-2">The site is currently under development.</p>
        <p className="text-base text-gray-400">Everything will be ready soon 🚀</p>
      </div>
  );
}