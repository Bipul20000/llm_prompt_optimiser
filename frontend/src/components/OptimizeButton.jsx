import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import '../styles/index.css';

const OptimizeButton = ({ onOptimize }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        await onOptimize();
        setIsLoading(false);
    };

    return (
        <button
            onClick={handleClick}
            disabled={isLoading}
            className="prompt-optimizer-btn"
        >
            {isLoading ? (
                <Loader2 className="prompt-optimizer-icon prompt-optimizer-spin" />
            ) : (
                <Sparkles className="prompt-optimizer-icon" />
            )}
            <span>{isLoading ? 'Optimizing...' : 'Optimize Prompt'}</span>
        </button>
    );
};

export default OptimizeButton;
