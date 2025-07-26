"use client";

import { ArrowRight, LoaderPinwheel } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({ action }) {
  const { pending } = useFormStatus();
  return (
    <button
      formAction={async (e) => {
        e.preventDefault();
        await action;
      }}
      disabled={pending}
      type="submit"
      className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors cursor-pointer"
    >
      {pending ? <LoaderPinwheel /> : <ArrowRight className="w-4 h-4" />}
    </button>
  );
}
