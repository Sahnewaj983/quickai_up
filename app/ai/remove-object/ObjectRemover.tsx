'use client'

import { Scissors, Sparkles } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

const ObjectRemover = () => {

    const [input, setInput] = useState<File | null>(null)
    const [object, setObject] = useState('')
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState('')

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {


            if (!input) {
                toast.error("Please select an image");
                return;
            }

            if (object.split(" ").length > 1) {
                return toast.error(
                    "Please enter only one object name"
                );
            }

            setLoading(true)


            const formData = new FormData();

            formData.append("image", input);
            formData.append("object", object);

            const res = await fetch('/api/ai/remove-image-object',
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
                    <Sparkles className="w-6 text-[#4a7aff]" />
                    <h1 className="text-xl font-semibold">Object Removal</h1>
                </div>

                <p className="mt-6 text-sm font-medium">Upload image</p>

                <input
                    type="file"
                    accept="image/*"
                    className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
                    onChange={(e) => setInput(e.target.files?.[0] || null)}
                    required />

                <p className="mt-6 text-sm font-medium">Describe object name to Remove</p>

                <textarea
                    rows={4}
                    className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
                    placeholder="e.g., watch or spoon, only single object name"
                    onChange={(e) => setObject(e.target.value)}
                    value={object}
                    required />

                <button disabled={loading} className="w-full flex justify-center items-center gap-2 bg-linear-to-r from-[#417df6]
          to-[#8e37eb] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
                    {
                        loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
                            : <Scissors className="w-5" />
                    }
                    Remove object
                </button>
            </form>

            {/* Right panel */}
            <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">

                <div className="flex items-center gap-3">
                    <Scissors className="w-5 h-5 text-[#4a7aff]" />
                    <h1 className="text-xl font-semibold">Processed Image </h1>
                </div>

                {
                    !content ? (
                        <div className="flex-1 flex justify-center items-center">
                            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                                <Scissors className="w-9 h-9 " />
                                <p>Upload an image and click "Remove object" to get started</p>
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

export default ObjectRemover