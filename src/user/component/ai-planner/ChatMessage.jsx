function ChatMessage({ type, text }) {
    return (
        <p className={mt-2 ${type === 'user' ? 'italic text-gray-500' : type === 'ai' ? 'text-gray-700' : 'text-red-500'}}>
            {type === 'user' ? 'You: ' : type === 'ai' ? <span className="font-semibold text-[#217964]">AI: </span> : ''}
            {text}
        </p>
    );
}
