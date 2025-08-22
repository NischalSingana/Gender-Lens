import React from 'react';
import { type BiasMatch, getTypeColor } from '@/lib/biasDetection';

interface HighlightedTextProps {
  text: string;
  matches: BiasMatch[];
  onMatchClick: (match: BiasMatch) => void;
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  matches,
  onMatchClick
}) => {
  if (matches.length === 0) {
    return (
      <div className="p-4 rounded-lg bg-muted/20 border min-h-[100px] whitespace-pre-wrap">
        {text}
      </div>
    );
  }

  // Create segments with highlighting
  const segments: Array<{ text: string; match?: BiasMatch }> = [];
  let lastIndex = 0;

  // Sort matches by start position
  const sortedMatches = [...matches].sort((a, b) => a.start - b.start);

  sortedMatches.forEach((match) => {
    // Add text before the match
    if (match.start > lastIndex) {
      segments.push({
        text: text.substring(lastIndex, match.start)
      });
    }

    // Add the highlighted match
    segments.push({
      text: text.substring(match.start, match.end),
      match
    });

    lastIndex = match.end;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    segments.push({
      text: text.substring(lastIndex)
    });
  }

  return (
    <div className="p-4 rounded-lg bg-muted/20 border min-h-[100px] leading-relaxed">
      {segments.map((segment, index) => {
        if (segment.match) {
          return (
            <span
              key={index}
              className={`
                ${getTypeColor(segment.match.type)} 
                border-2 rounded-md px-1 py-0.5 cursor-pointer
                hover:shadow-sm transition-all duration-200
                relative inline-block
              `}
              onClick={() => onMatchClick(segment.match!)}
              title={`${segment.match.type} bias - Click for suggestions`}
            >
              {segment.text}
            </span>
          );
        }
        return <span key={index}>{segment.text}</span>;
      })}
    </div>
  );
};