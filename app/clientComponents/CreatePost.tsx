'use client'

import { useState } from "react"

const CreatePost: React.FC<{ submitPost: (post: string) => void }> = ({ submitPost: _submitPost }) => {
    const [content, setContent] = useState<string>("")

    function submitPost() {
        console.log("Submitting post: " + content)
        _submitPost(content)
        setContent("")
    }

    return (
        <div className="border-y border-slate-300 p-2 flex flex-col bg-white">
            <textarea placeholder="Create post..." className="w-full min-h-[75px] mb-2 rounded-md border-none p-2 resize-none" value={content} onChange={(e) => setContent(e.target.value)} />
            <button className="bg-violet-700 text-white rounded-md px-3 py-1 hover:bg-violet-800 self-end mr-2 mb-2" onClick={submitPost}>Post</button>
        </div>
    )
}

export default CreatePost;