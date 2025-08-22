export type BiasType = 'masculine' | 'feminine' | 'stereotype' | 'exclusionary';

export interface BiasMatch {
  word: string;
  start: number;
  end: number;
  type: BiasType;
  suggestion: string;
  severity: 'low' | 'medium' | 'high';
  explanation: string;
}

export interface BiasAnalysis {
  matches: BiasMatch[];
  score: number;
  summary: {
    masculine: number;
    feminine: number;
    stereotype: number;
    exclusionary: number;
  };
}

// Comprehensive bias lexicons
const MASCULINE_CODED_WORDS = {
  'dominant': { suggestion: 'confident', severity: 'medium' as const },
  'aggressive': { suggestion: 'assertive', severity: 'high' as const },
  'competitive': { suggestion: 'results-driven', severity: 'low' as const },
  'decisive': { suggestion: 'thoughtful', severity: 'low' as const },
  'analytical': { suggestion: 'detail-oriented', severity: 'low' as const },
  'independent': { suggestion: 'self-motivated', severity: 'low' as const },
  'objective': { suggestion: 'fair-minded', severity: 'low' as const },
  'driven': { suggestion: 'motivated', severity: 'low' as const },
  'ambitious': { suggestion: 'goal-oriented', severity: 'low' as const },
  'leader': { suggestion: 'team lead', severity: 'medium' as const },
  'rockstar': { suggestion: 'skilled professional', severity: 'high' as const },
  'ninja': { suggestion: 'expert', severity: 'medium' as const },
  'guru': { suggestion: 'specialist', severity: 'medium' as const },
  'superhero': { suggestion: 'exceptional performer', severity: 'high' as const }
};

const FEMININE_CODED_WORDS = {
  'collaborative': { suggestion: 'team-oriented', severity: 'low' as const },
  'supportive': { suggestion: 'helpful', severity: 'low' as const },
  'nurturing': { suggestion: 'mentoring', severity: 'medium' as const },
  'empathetic': { suggestion: 'understanding', severity: 'low' as const },
  'intuitive': { suggestion: 'insightful', severity: 'medium' as const },
  'sensitive': { suggestion: 'aware', severity: 'medium' as const },
  'cooperative': { suggestion: 'team-focused', severity: 'low' as const },
  'interpersonal': { suggestion: 'communication', severity: 'low' as const },
  'agreeable': { suggestion: 'diplomatic', severity: 'medium' as const },
  'patient': { suggestion: 'persistent', severity: 'low' as const },
  'caring': { suggestion: 'attentive', severity: 'medium' as const }
};

const STEREOTYPICAL_PHRASES = {
  'male nurse': { suggestion: 'nurse', severity: 'high' as const },
  'female engineer': { suggestion: 'engineer', severity: 'high' as const },
  'lady doctor': { suggestion: 'doctor', severity: 'high' as const },
  'woman driver': { suggestion: 'driver', severity: 'high' as const },
  'working mother': { suggestion: 'parent', severity: 'medium' as const },
  'career woman': { suggestion: 'professional', severity: 'medium' as const },
  'housewife': { suggestion: 'homemaker', severity: 'medium' as const }
};

const EXCLUSIONARY_LANGUAGE = {
  'guys': { suggestion: 'everyone', severity: 'medium' as const },
  'mankind': { suggestion: 'humanity', severity: 'high' as const },
  'manpower': { suggestion: 'workforce', severity: 'high' as const },
  'man-hours': { suggestion: 'person-hours', severity: 'medium' as const },
  'chairman': { suggestion: 'chairperson', severity: 'medium' as const },
  'spokesman': { suggestion: 'spokesperson', severity: 'medium' as const },
  'businessman': { suggestion: 'businessperson', severity: 'medium' as const },
  'fireman': { suggestion: 'firefighter', severity: 'medium' as const },
  'policeman': { suggestion: 'police officer', severity: 'medium' as const },
  'mailman': { suggestion: 'mail carrier', severity: 'medium' as const },
  'freshman': { suggestion: 'first-year student', severity: 'medium' as const },
  'he or she': { suggestion: 'they', severity: 'low' as const }
};

// Create explanation messages
const EXPLANATIONS = {
  masculine: 'This word may unconsciously appeal more to masculine-coded individuals',
  feminine: 'This word may unconsciously appeal more to feminine-coded individuals',
  stereotype: 'This phrase reinforces gender stereotypes',
  exclusionary: 'This language excludes or marginalizes certain groups'
};

function findMatches(text: string, lexicon: Record<string, { suggestion: string; severity: 'low' | 'medium' | 'high' }>, type: BiasType): BiasMatch[] {
  const matches: BiasMatch[] = [];
  const lowerText = text.toLowerCase();
  
  Object.entries(lexicon).forEach(([word, { suggestion, severity }]) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        word: match[0],
        start: match.index,
        end: match.index + match[0].length,
        type,
        suggestion,
        severity,
        explanation: EXPLANATIONS[type]
      });
    }
  });
  
  return matches;
}

export function analyzeText(text: string): BiasAnalysis {
  if (!text.trim()) {
    return {
      matches: [],
      score: 0,
      summary: { masculine: 0, feminine: 0, stereotype: 0, exclusionary: 0 }
    };
  }

  const allMatches: BiasMatch[] = [
    ...findMatches(text, MASCULINE_CODED_WORDS, 'masculine'),
    ...findMatches(text, FEMININE_CODED_WORDS, 'feminine'),
    ...findMatches(text, STEREOTYPICAL_PHRASES, 'stereotype'),
    ...findMatches(text, EXCLUSIONARY_LANGUAGE, 'exclusionary')
  ];

  // Sort matches by position to avoid overlapping highlights
  allMatches.sort((a, b) => a.start - b.start);

  // Calculate bias score (number of biased words per 100 words)
  const wordCount = text.split(/\s+/).length;
  const score = Math.round((allMatches.length / wordCount) * 100);

  // Create summary
  const summary = allMatches.reduce(
    (acc, match) => {
      acc[match.type]++;
      return acc;
    },
    { masculine: 0, feminine: 0, stereotype: 0, exclusionary: 0 }
  );

  return {
    matches: allMatches,
    score,
    summary
  };
}

export function getSeverityColor(severity: 'low' | 'medium' | 'high'): string {
  switch (severity) {
    case 'low':
      return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    case 'medium':
      return 'bg-warning/20 border-warning text-warning-foreground';
    case 'high':
      return 'bg-destructive/20 border-destructive text-destructive-foreground';
    default:
      return 'bg-muted border-border text-muted-foreground';
  }
}

export function getTypeColor(type: BiasType): string {
  switch (type) {
    case 'masculine':
      return 'bg-bias-masculine/20 border-bias-masculine/30';
    case 'feminine':
      return 'bg-bias-feminine/20 border-bias-feminine/30';
    case 'stereotype':
      return 'bg-destructive/20 border-destructive/30';
    case 'exclusionary':
      return 'bg-warning/20 border-warning/30';
    default:
      return 'bg-muted/20 border-border/30';
  }
}