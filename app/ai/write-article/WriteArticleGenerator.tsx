'use client'

import { Edit, Sparkles } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import Markdown from "react-markdown"


const WriteArticleGenerator = () => {

    const articleLength = [
        { length: 800, text: 'Short (500-800 words)' },
        { length: 1200, text: 'Medium (800-1200 words)' },
        { length: 1600, text: 'Long (1200+ words)' },
    ]

    const [selectedLength, setSelectedLength] = useState(articleLength[0])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState('')

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

            setLoading(true)
            const prompt = `Write an article about ${input} in ${selectedLength.text}`

            const res = await fetch('/api/ai/generate-article',
                {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt, length: selectedLength.length }),
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
                    <h1 className="text-xl font-semibold">Article Configuration</h1>
                </div>

                <p className="mt-6 text-sm font-medium">Article Topic</p>

                <input
                    type="text"
                    className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
                    placeholder="The future of artificial intelligance is..."
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    required />

                <p className="mt-4 text-sm font-medium">Article Length</p>

                <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
                    {articleLength.map((item, index) => (
                        <span
                            key={index}
                            className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedLength.text === item.text
                                ? 'bg-blue-50 text-blue-700' : 'text-gray-500 border-gray-300'}`}
                            onClick={() => setSelectedLength(item)}>
                            {item.text}
                        </span>
                    ))}
                </div>
                <br />
                <button disabled={loading} className="w-full flex justify-center items-center gap-2 bg-linear-to-r from-[#226bff]
               to-[#65adff] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
                    {
                        loading ? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
                            : <Edit className="w-5" />
                    }
                    Generate Article
                </button>
            </form>

            {/* Right panel */}
            <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 h-[500px]">

                <div className="flex items-center gap-3">
                    <Edit className="w-5 h-5 text-[#4a7aff]" />
                    <h1 className="text-xl font-semibold">Generated Article </h1>
                </div>

                {!content ? (
                    <div className="flex-1 flex justify-center items-center">
                        <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                            <Edit className="w-9 h-9 " />
                            <p>Enter a topic and click "Generate article" to get started</p>
                        </div>
                    </div>
                ) : (
                    <div className="mt-3 flex-1 overflow-y-auto text-sm text-slate-600">
                        <div className="reset-tw">
                            <Markdown>{content}</Markdown>
                        </div>
                    </div>
                )}


            </div>

        </div>
    )
}

export default WriteArticleGenerator