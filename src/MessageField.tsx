import {ChatContent} from "./ChatView.tsx";

const MessageField = (chatContent:ChatContent) => {
    return (
        <div className="bg-gray-800 text-white max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5 hover:shadow-2xl hover:bg-black transition-all duration-500 ease-in-out">
            <div className="md:flex">
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{chatContent.sender}</div>
                    <p className="mt-2 text-gray-400">{chatContent.content}</p>
                </div>
            </div>
        </div>
    );
}
export default MessageField;
