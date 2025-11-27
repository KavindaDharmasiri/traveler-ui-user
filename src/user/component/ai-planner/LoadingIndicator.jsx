function LoadingIndicator({ isLoading }) {
    if (!isLoading) return null;
    return (
        <div className="flex items-center justify-center p-2 text-[#217964]">
            <i className="fas fa-spinner fa-spin mr-2"></i> Generating plan...
        </div>
    );
}

