import React, { useState, useRef, useEffect } from 'react';

const PinInput = ({ onComplete, onCancel }) => {
  const [pins, setPins] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onCancel(); // Auto-close when expired
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [onCancel]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newPins = [...pins];
    newPins[index] = value.slice(-1);
    setPins(newPins);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newPins.every(pin => pin !== '') && newPins.join('').length === 6) {
      onComplete(newPins.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !pins[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newPins = [...pins];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newPins[i] = pastedData[i];
    }
    
    setPins(newPins);
    
    if (pastedData.length === 6) {
      onComplete(pastedData);
    } else if (pastedData.length > 0) {
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Enter Verification Code</h3>
          <p className="text-gray-600">We sent a 6-digit code to your WhatsApp</p>
          <p className={`text-sm mt-2 ${timeLeft <= 60 ? 'text-red-500' : 'text-gray-500'}`}>
            Code expires in: {formatTime(timeLeft)}
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-6">
          {pins.map((pin, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              value={pin}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none transition-colors"
              maxLength="1"
            />
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onComplete(pins.join(''))}
            disabled={pins.some(pin => pin === '')}
            className="flex-1 py-3 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default PinInput;