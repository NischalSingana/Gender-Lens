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
  'superhero': { suggestion: 'exceptional performer', severity: 'high' as const },
  'active': { suggestion: 'proactive', severity: 'low' as const },
  'adventurous': { suggestion: 'curious', severity: 'low' as const },
  'assertive': { suggestion: 'confident communicator', severity: 'medium' as const },
  'autonomous': { suggestion: 'self-directed', severity: 'low' as const },
  'battle-tested': { suggestion: 'well-tested', severity: 'medium' as const },
  'champion': { suggestion: 'advocate', severity: 'medium' as const },
  'confident': { suggestion: 'self-assured', severity: 'low' as const },
  'courageous': { suggestion: 'comfortable with challenge', severity: 'low' as const },
  'decisive decision-maker': { suggestion: 'sound decision-maker', severity: 'medium' as const },
  'determined': { suggestion: 'persistent', severity: 'low' as const },
  'dominance': { suggestion: 'ownership mindset', severity: 'medium' as const },
  'fearless': { suggestion: 'comfortable with ambiguity', severity: 'medium' as const },
  'forceful': { suggestion: 'persuasive', severity: 'high' as const },
  'headstrong': { suggestion: 'resolute', severity: 'medium' as const },
  'hierarchical': { suggestion: 'structured', severity: 'low' as const },
  'hostile': { suggestion: 'firm', severity: 'high' as const },
  'individualistic': { suggestion: 'self-motivated', severity: 'low' as const },
  'intellectual': { suggestion: 'analytical thinker', severity: 'low' as const },
  'logical': { suggestion: 'structured thinker', severity: 'low' as const },
  'outspoken': { suggestion: 'direct communicator', severity: 'medium' as const },
  'principled': { suggestion: 'values-driven', severity: 'low' as const },
  'relentless': { suggestion: 'tenacious', severity: 'medium' as const },
  'self-confident': { suggestion: 'self-assured', severity: 'low' as const },
  'self-reliant': { suggestion: 'resourceful', severity: 'low' as const },
  'self-sufficient': { suggestion: 'independent worker', severity: 'low' as const },
  'stubborn': { suggestion: 'determined', severity: 'medium' as const },
  'superior': { suggestion: 'high-quality', severity: 'medium' as const },
  'take-charge': { suggestion: 'ownership mindset', severity: 'medium' as const },
  'tough': { suggestion: 'resilient', severity: 'medium' as const },
  'unreasonable': { suggestion: 'high standards', severity: 'high' as const },
  'fearless leader': { suggestion: 'experienced team lead', severity: 'high' as const },
  'commanding': { suggestion: 'influential', severity: 'medium' as const },
  'dominate': { suggestion: 'excel', severity: 'high' as const },
  'warrior': { suggestion: 'problem-solver', severity: 'high' as const },
  'killer instinct': { suggestion: 'competitive spirit', severity: 'high' as const },
  'crush it': { suggestion: 'deliver strong results', severity: 'medium' as const }
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
  'caring': { suggestion: 'attentive', severity: 'medium' as const },
  'affectionate': { suggestion: 'supportive', severity: 'low' as const },
  'cheerful': { suggestion: 'positive', severity: 'low' as const },
  'communal': { suggestion: 'team-based', severity: 'low' as const },
  'compassionate': { suggestion: 'people-centered', severity: 'low' as const },
  'considerate': { suggestion: 'respectful', severity: 'low' as const },
  'dependable': { suggestion: 'reliable', severity: 'low' as const },
  'emotional': { suggestion: 'emotionally intelligent', severity: 'medium' as const },
  'gentle': { suggestion: 'respectful', severity: 'low' as const },
  'honest': { suggestion: 'transparent', severity: 'low' as const },
  'inclusive': { suggestion: 'welcoming', severity: 'low' as const },
  'kind': { suggestion: 'respectful', severity: 'low' as const },
  'loyal': { suggestion: 'committed', severity: 'low' as const },
  'modest': { suggestion: 'humble', severity: 'low' as const },
  'pleasant': { suggestion: 'approachable', severity: 'low' as const },
  'polite': { suggestion: 'professional', severity: 'low' as const },
  'quiet': { suggestion: 'focused', severity: 'medium' as const },
  'responsive': { suggestion: 'timely', severity: 'low' as const },
  'submissive': { suggestion: 'collaborative', severity: 'high' as const },
  'support': { suggestion: 'enable', severity: 'low' as const },
  'sympathetic': { suggestion: 'empathetic', severity: 'low' as const },
  'tender': { suggestion: 'considerate', severity: 'medium' as const },
  'togetherness': { suggestion: 'team cohesion', severity: 'low' as const },
  'trusting': { suggestion: 'trust-based', severity: 'low' as const },
  'understanding': { suggestion: 'insightful', severity: 'low' as const },
  'warm': { suggestion: 'welcoming', severity: 'low' as const },
  'enthusiastic': { suggestion: 'motivated', severity: 'low' as const },
  'yielding': { suggestion: 'flexible', severity: 'medium' as const },
  'sharing': { suggestion: 'knowledge-sharing', severity: 'low' as const },
  'friendly': { suggestion: 'approachable', severity: 'low' as const },
  'tactful': { suggestion: 'diplomatic', severity: 'low' as const }
};

const STEREOTYPICAL_PHRASES = {
  'male nurse': { suggestion: 'nurse', severity: 'high' as const },
  'female engineer': { suggestion: 'engineer', severity: 'high' as const },
  'lady doctor': { suggestion: 'doctor', severity: 'high' as const },
  'woman driver': { suggestion: 'driver', severity: 'high' as const },
  'working mother': { suggestion: 'parent', severity: 'medium' as const },
  'career woman': { suggestion: 'professional', severity: 'medium' as const },
  'housewife': { suggestion: 'homemaker', severity: 'medium' as const },
  'female ceo': { suggestion: 'ceo', severity: 'high' as const },
  'male ceo': { suggestion: 'ceo', severity: 'high' as const },
  'female founder': { suggestion: 'founder', severity: 'high' as const },
  'male founder': { suggestion: 'founder', severity: 'high' as const },
  'female boss': { suggestion: 'manager', severity: 'high' as const },
  'boss lady': { suggestion: 'manager/leader', severity: 'high' as const },
  'female pilot': { suggestion: 'pilot', severity: 'high' as const },
  'male teacher': { suggestion: 'teacher', severity: 'high' as const },
  'male secretary': { suggestion: 'secretary', severity: 'high' as const },
  'female coder': { suggestion: 'developer', severity: 'high' as const },
  'male coder': { suggestion: 'developer', severity: 'high' as const },
  'single mother': { suggestion: 'single parent', severity: 'medium' as const },
  'single father': { suggestion: 'single parent', severity: 'medium' as const },
  'man up': { suggestion: 'be resilient', severity: 'high' as const },
  'act like a lady': { suggestion: 'act professionally', severity: 'high' as const },
  'like a man': { suggestion: 'with confidence', severity: 'high' as const },
  'girls team': { suggestion: 'team', severity: 'high' as const },
  'boys team': { suggestion: 'team', severity: 'high' as const }
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
  'he or she': { suggestion: 'they', severity: 'low' as const },
  'salesman': { suggestion: 'salesperson', severity: 'medium' as const },
  'saleswoman': { suggestion: 'salesperson', severity: 'medium' as const },
  'chairwoman': { suggestion: 'chair', severity: 'medium' as const },
  'congressman': { suggestion: 'legislator', severity: 'medium' as const },
  'forefathers': { suggestion: 'ancestors', severity: 'medium' as const },
  'middleman': { suggestion: 'intermediary', severity: 'medium' as const },
  'ombudsman': { suggestion: 'ombuds', severity: 'medium' as const },
  'fisherman': { suggestion: 'fisher', severity: 'medium' as const },
  'weatherman': { suggestion: 'meteorologist', severity: 'medium' as const },
  'stewardess': { suggestion: 'flight attendant', severity: 'medium' as const },
  'waitress': { suggestion: 'server', severity: 'medium' as const },
  'waiter': { suggestion: 'server', severity: 'low' as const },
  'hostess': { suggestion: 'host', severity: 'medium' as const },
  'craftsman': { suggestion: 'craftsperson', severity: 'medium' as const },
  'workman': { suggestion: 'worker', severity: 'medium' as const },
  'repairman': { suggestion: 'repair technician', severity: 'medium' as const },
  'handyman': { suggestion: 'maintenance worker', severity: 'medium' as const },
  'deliveryman': { suggestion: 'courier', severity: 'medium' as const },
  'anchorman': { suggestion: 'news anchor', severity: 'medium' as const },
  'foreman': { suggestion: 'supervisor', severity: 'medium' as const },
  'man-made': { suggestion: 'human-made', severity: 'medium' as const },
  'man the booth': { suggestion: 'staff the booth', severity: 'medium' as const },
  'ladies and gentlemen': { suggestion: 'everyone', severity: 'medium' as const },
  'sir/madam': { suggestion: 'hello', severity: 'low' as const },
  'he/she': { suggestion: 'they', severity: 'low' as const },
  's/he': { suggestion: 'they', severity: 'low' as const },
  'maiden name': { suggestion: 'previous name', severity: 'medium' as const },
  'cleaning lady': { suggestion: 'cleaner', severity: 'medium' as const },
  'brotherhood': { suggestion: 'community', severity: 'low' as const },
  'countrymen': { suggestion: 'citizens', severity: 'low' as const }
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