'use client'

import { Eraser, Sparkles } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

const BackgroundRemover = () => {

    const [input, setInput] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState('')

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

            setLoading(true)
            if (!input) {
                toast.error("Please select an image");
                return;
            }

            const formData = new FormData();
            formData.append("image", input);

            const res = await fetch('/api/ai/remove-image-background',
                {
                    method: 'POST',
                    //headers: { "Content-Type": "application/json" },
                    body: formData,
                }
            );

            const data = await res.json();

            if (data.success) {
                setContent(data.content)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Something went wrong");
            }
        }
        setLoading(false)
    }

    return (
        <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
            {/* left panel */}
            <form onSubmit={onSubmitHandler} className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200">

                <div className="flex items-center gap-3">
                    <Sparkles className="w-6 text-[#ff4938]" />
                    <h1 className="text-xl font-semibold">Background Removal</h1>
                </div>

                <p className="mt-6 text-sm font-medium">Upload image</p>

                <input
                    type="file"
                    accept="image/*"
                    className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
                    onChange={(e) => setInput(e.target.files?.[0] || null)}
                    required />

                <p className="text-xs text-gray-500 font-light mt-1">Supports JPG, PNG, and other image formats</p>

                <button disabled={loading} className="w-full flex justify-center items-center gap-2 bg-linear-to-r from-[#f6ab41]
          to-[#ff4938] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
                    {
                        loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
                            : <Eraser className="w-5" />
                    }
                    Remove background
                </button>
            </form>

            {/* Right panel */}
            <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">

                <div className="flex items-center gap-3">
                    <Eraser className="w-5 h-5 text-[#ff4938]" />
                    <h1 className="text-xl font-semibold">Processed Image </h1>
                </div>

                {
                    !content ? (
                        <div className="flex-1 flex justify-center items-center">
                            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                                <Eraser className="w-9 h-9 " />
                                <p>Upload an image and click "Remove Background" to get started</p>
                            </div>
                        </div>
                    ) : (
                        <img src={content} alt="image" className="mt-3 w-full h-full" />
                    )
                }



            </div>

        </div>
    )
}

export default BackgroundRemover