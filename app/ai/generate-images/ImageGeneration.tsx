'use client'

import { Image ,Download, Sparkles } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

const ImageGeneration = () => {

    const imageStyle = ['Realastic', 'Ghibli style', 'Anime style', 'Cartoon style', 'Fantasy style', 'Realastic style',
        '3D style', 'Portrait style']


    const [selectedStyle, setSelectedStyle] = useState('Realastic')
    const [input, setInput] = useState('')
    const [publish, setPublish] = useState(false)
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState('')

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

            setLoading(true)
            const prompt = `Generate an image of ${input} in the style ${selectedStyle}`

            const res = await fetch('/api/ai/generate-image',
                {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt, publish }),
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

    const handleDownload = () => {
        if (!content) return;

        const link = document.createElement("a");

        link.href = content.replace(
            "/upload/",
            "/upload/fl_attachment/"
        );

        link.download = "image.png";

        link.click();
    };

    return (
        <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
            {/* left panel */}
            <form onSubmit={onSubmitHandler} className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200">

                <div className="flex items-center gap-3">
                    <Sparkles className="w-6 text-[#00ad25]" />
                    <h1 className="text-xl font-semibold">AI Image Generator</h1>
                </div>

                <p className="mt-6 text-sm font-medium">Describe Your Image</p>

                <textarea
                    rows={4}
                    className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
                    placeholder="Describe what you want to see in the image..."
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    required />

                <p className="mt-4 text-sm font-medium">Style</p>

                <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
                    {imageStyle.map((item) => (
                        <span
                            key={item}
                            className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedStyle === item
                                ? 'bg-green-50 text-green-700' : 'text-gray-500 border-gray-300'}`}
                            onClick={() => setSelectedStyle(item)}>
                            {item}
                        </span>
                    ))}
                </div>

                <div className="my-6 flex items-center gap-2">
                    <label className="relative cursor-pointer">
                        <input type="checkbox"
                            onChange={(e) => setPublish(e.target.checked)}
                            checked={publish}
                            className="sr-only peer" />
                        <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition"></div>
                        <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
                    </label>
                    <p className="text-sm">Make this image Public</p>
                </div>

                <button disabled={loading} className="w-full flex justify-center items-center gap-2 bg-linear-to-r from-[#00ad25]
               to-[#04ff50] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
                    {
                        loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
                            : <Image className="w-5" />
                    }
                    Generate Image
                </button>
            </form>

            {/* Right panel */}
            <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">

                <div className="flex items-center gap-3">
                    <Image className="w-5 h-5 text-[#00ad25]" />
                    <h1 className="text-xl font-semibold">Generated Image </h1>
                </div>

                {
                    !content ? (
                        <div className="flex-1 flex justify-center items-center">
                            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                                <Image className="w-9 h-9 " />
                                <p>Enter a topic and click "Generate image" to get started</p>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-3 h-full">
                            <img src={content} alt="image" className="w-full h-full" />
                            <button
                                onClick={handleDownload}
                                className="mt-3 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm">
                                <Download className="w-4" />
                            </button>
                        </div>
                    )
                }

            </div>

        </div>
    )
}

export default ImageGeneration