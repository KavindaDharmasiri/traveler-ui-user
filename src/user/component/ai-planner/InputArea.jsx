import React, { useState, useEffect, useRef } from 'react';
function InputArea({ userPrompt, setUserPrompt, handleGeneratePlan, isLoading }) {
    return (
        <div className="mt-4 flex items-center space-x-3">
            <textarea
                id="user-prompt"
                rows="3"
                className="flex-grow p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#217964] resize-none"
                placeholder="Describe your trip: destination, dates, interests, budget, etc."
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleGeneratePlan();
                    }
                }}
                disabled={isLoading}
            ></textarea>
            <button
                id="generate-plan-btn"
                className="bg-[#217964] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#1A5C4A] transition-all duration-200 hover:scale-105"
                onClick={handleGeneratePlan}
                disabled={isLoading}
            >
                <i className="fas fa-paper-plane mr-2"></i> Generate Plan
            </button>
        </div>
    );
}
