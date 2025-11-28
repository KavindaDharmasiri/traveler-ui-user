function ChatHistoryDisplay({ chatHistory, chatHistoryRef }) {
    return (
        <div ref={chatHistoryRef} className="flex-grow bg-gray-50 p-4 rounded-xl border border-gray-200 overflow-y-auto custom-scrollbar text-gray-700">
            {chatHistory.map((msg, index) => (
                <ChatMessage key={index} type={msg.type} text={msg.text} />
            ))}
        </div>
    );
}
