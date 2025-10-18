/**
 * AI Command Panel Component
 * Phase 3: AI Canvas Agent Implementation
 * 
 * Natural language command interface for AI canvas operations
 */

import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import type { AICommandResponse } from '../types/ai.types';

interface AICommandPanelProps {
  onExecuteCommand: (userInput: string) => Promise<AICommandResponse>;
  isDisabled?: boolean;
}

interface CommandEntry {
  id: string;
  input: string;
  timestamp: number;
  status: 'pending' | 'success' | 'error';
  result?: AICommandResponse;
}

export function AICommandPanel({ onExecuteCommand, isDisabled = false }: AICommandPanelProps) {
  const [input, setInput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [history, setHistory] = useState<CommandEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    if (!isDisabled) {
      inputRef.current?.focus();
    }
  }, [isDisabled]);

  // Handle command submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isExecuting || isDisabled) {
      return;
    }

    const commandId = `cmd-${Date.now()}`;
    const entry: CommandEntry = {
      id: commandId,
      input: input.trim(),
      timestamp: Date.now(),
      status: 'pending',
    };

    // Add to history immediately
    setHistory(prev => [entry, ...prev]);
    setInput('');
    setIsExecuting(true);

    try {
      // Execute command
      const result = await onExecuteCommand(entry.input);
      
      // Update history with result
      setHistory(prev =>
        prev.map(h =>
          h.id === commandId
            ? { ...h, status: result.success ? 'success' : 'error', result }
            : h
        )
      );
    } catch (error) {
      // Handle execution error
      setHistory(prev =>
        prev.map(h =>
          h.id === commandId
            ? { ...h, status: 'error' as const, result: {
                success: false,
                result: {
                  success: false,
                  error: error instanceof Error ? error.message : 'Unknown error',
                },
                toolCalls: [],
                duration: 0,
              }}
            : h
        )
      );
    } finally {
      setIsExecuting(false);
      inputRef.current?.focus();
    }
  };

  // Example commands
  const exampleCommands = [
    'Create a blue rectangle in the center',
    'Add three red circles in a row',
    'Make a green square 200px wide',
    'Arrange all shapes in a grid',
  ];

  return (
    <div className="ai-command-panel">
      {/* Header */}
      <div className="panel-header">
        <div className="header-title">
          <Sparkles className="icon" size={20} />
          <h3>AI Canvas Agent</h3>
        </div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="history-toggle"
          title={showHistory ? 'Hide history' : 'Show history'}
        >
          <Clock size={18} />
          <span>{history.length}</span>
        </button>
      </div>

      {/* Command Input */}
      <form onSubmit={handleSubmit} className="command-form">
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want to create..."
            className="command-input"
            disabled={isDisabled || isExecuting}
          />
          <button
            type="submit"
            className="submit-button"
            disabled={!input.trim() || isDisabled || isExecuting}
            title="Execute command"
          >
            {isExecuting ? (
              <Loader2 className="icon spinning" size={18} />
            ) : (
              <Send className="icon" size={18} />
            )}
          </button>
        </div>
      </form>

      {/* Example Commands */}
      {!isDisabled && history.length === 0 && (
        <div className="examples-section">
          <p className="examples-label">Try these examples:</p>
          <div className="examples-list">
            {exampleCommands.map((cmd, idx) => (
              <button
                key={idx}
                onClick={() => setInput(cmd)}
                className="example-button"
                disabled={isExecuting}
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Command History */}
      {showHistory && history.length > 0 && (
        <div className="history-section">
          <div className="history-header">
            <h4>Command History</h4>
            <button
              onClick={() => setHistory([])}
              className="clear-button"
            >
              Clear
            </button>
          </div>
          <div className="history-list">
            {history.map((entry) => (
              <div key={entry.id} className={`history-entry ${entry.status}`}>
                <div className="entry-header">
                  <div className="entry-status">
                    {entry.status === 'pending' && (
                      <Loader2 className="icon spinning" size={16} />
                    )}
                    {entry.status === 'success' && (
                      <CheckCircle className="icon success" size={16} />
                    )}
                    {entry.status === 'error' && (
                      <XCircle className="icon error" size={16} />
                    )}
                  </div>
                  <span className="entry-time">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="entry-input">{entry.input}</p>
                {entry.result && (
                  <div className="entry-result">
                    {entry.result.success ? (
                      <div className="result-success">
                        <span>✓ {entry.result.toolCalls.length} tool(s) executed</span>
                        <span className="duration">{entry.result.duration}ms</span>
                      </div>
                    ) : (
                      <div className="result-error">
                        {entry.result.result.error || entry.result.error}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disabled State */}
      {isDisabled && (
        <div className="disabled-message">
          <p>⚠️ AI features require an OpenAI API key</p>
          <p className="hint">Add VITE_OPENAI_API_KEY to .env.local</p>
        </div>
      )}

      <style>{`
        .ai-command-panel {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .header-title h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
        }

        .header-title .icon {
          color: #8b5cf6;
        }

        .history-toggle {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: #f3f4f6;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          color: #6b7280;
          transition: background 0.2s;
        }

        .history-toggle:hover {
          background: #e5e7eb;
        }

        .command-form {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-container {
          display: flex;
          gap: 8px;
        }

        .command-input {
          flex: 1;
          padding: 10px 14px;
          border: 2px solid #e5e7eb;
          border-radius: 6px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }

        .command-input:focus {
          border-color: #8b5cf6;
        }

        .command-input:disabled {
          background: #f9fafb;
          color: #9ca3af;
          cursor: not-allowed;
        }

        .submit-button {
          padding: 10px 16px;
          background: #8b5cf6;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .submit-button:hover:not(:disabled) {
          background: #7c3aed;
        }

        .submit-button:disabled {
          background: #d1d5db;
          cursor: not-allowed;
        }

        .submit-button .icon {
          transition: transform 0.3s;
        }

        .submit-button:hover:not(:disabled) .icon {
          transform: translateX(2px);
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .examples-section {
          border-top: 1px solid #e5e7eb;
          padding-top: 12px;
        }

        .examples-label {
          font-size: 13px;
          color: #6b7280;
          margin: 0 0 8px 0;
        }

        .examples-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .example-button {
          padding: 8px 12px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          text-align: left;
          font-size: 13px;
          color: #4b5563;
          cursor: pointer;
          transition: all 0.2s;
        }

        .example-button:hover:not(:disabled) {
          background: #f3f4f6;
          border-color: #8b5cf6;
          color: #8b5cf6;
        }

        .example-button:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .history-section {
          border-top: 1px solid #e5e7eb;
          padding-top: 12px;
          max-height: 400px;
          overflow-y: auto;
        }

        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .history-header h4 {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
        }

        .clear-button {
          padding: 4px 8px;
          background: none;
          border: none;
          color: #6b7280;
          font-size: 13px;
          cursor: pointer;
          transition: color 0.2s;
        }

        .clear-button:hover {
          color: #ef4444;
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .history-entry {
          padding: 10px;
          background: #f9fafb;
          border-left: 3px solid #d1d5db;
          border-radius: 4px;
          font-size: 13px;
        }

        .history-entry.success {
          border-left-color: #10b981;
        }

        .history-entry.error {
          border-left-color: #ef4444;
        }

        .entry-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .entry-status {
          display: flex;
          align-items: center;
        }

        .entry-status .icon.success {
          color: #10b981;
        }

        .entry-status .icon.error {
          color: #ef4444;
        }

        .entry-time {
          color: #9ca3af;
          font-size: 12px;
        }

        .entry-input {
          margin: 0 0 6px 0;
          color: #1f2937;
          font-weight: 500;
        }

        .entry-result {
          font-size: 12px;
        }

        .result-success {
          display: flex;
          justify-content: space-between;
          color: #059669;
        }

        .result-error {
          color: #dc2626;
        }

        .duration {
          color: #6b7280;
        }

        .disabled-message {
          padding: 12px;
          background: #fef3c7;
          border-left: 3px solid #f59e0b;
          border-radius: 4px;
          text-align: center;
        }

        .disabled-message p {
          margin: 0;
          font-size: 13px;
          color: #92400e;
        }

        .disabled-message .hint {
          margin-top: 4px;
          font-size: 12px;
          color: #b45309;
          font-family: monospace;
        }
      `}</style>
    </div>
  );
}

