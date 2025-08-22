import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle, Eye, FileText, TrendingUp, Users } from 'lucide-react';
import { analyzeText, type BiasAnalysis, type BiasMatch, getSeverityColor, getTypeColor } from '@/lib/biasDetection';
import { HighlightedText } from './HighlightedText';
import { BiasTooltip } from './BiasTooltip';
import { BiasReport } from './BiasReport';

const SAMPLE_TEXTS = {
  jobDescription: `We are seeking a rockstar developer who is aggressive and competitive. The ideal candidate should be analytical, decisive, and dominant in technical discussions. Must be a natural leader who can take charge of projects.`,
  corporateEmail: `Hi guys, we need someone who can be collaborative and supportive while being nurturing to our team culture. Looking for an empathetic individual who is intuitive about user needs.`,
  newsArticle: `The female engineer developed innovative solutions while the male nurse provided exceptional patient care. These career women are breaking barriers in traditionally masculine fields.`
};

export const BiasAnalyzer: React.FC = () => {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState<BiasAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<BiasMatch | null>(null);
  const [showReport, setShowReport] = useState(false);

  const handleAnalyze = useCallback(async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    const result = analyzeText(text);
    setAnalysis(result);
    setIsAnalyzing(false);
  }, [text]);

  const handleSampleText = (sampleKey: keyof typeof SAMPLE_TEXTS) => {
    setText(SAMPLE_TEXTS[sampleKey]);
    setAnalysis(null);
  };

  const getBiasLevel = (score: number): { level: string; color: string; icon: React.ReactNode } => {
    if (score === 0) return { 
      level: 'No bias detected', 
      color: 'text-success', 
      icon: <CheckCircle className="w-4 h-4" /> 
    };
    if (score <= 2) return { 
      level: 'Low bias', 
      color: 'text-yellow-600', 
      icon: <Eye className="w-4 h-4" /> 
    };
    if (score <= 5) return { 
      level: 'Moderate bias', 
      color: 'text-warning', 
      icon: <AlertCircle className="w-4 h-4" /> 
    };
    return { 
      level: 'High bias', 
      color: 'text-destructive', 
      icon: <AlertCircle className="w-4 h-4" /> 
    };
  };

  const biasLevel = analysis ? getBiasLevel(analysis.score) : null;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          GenderLens
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Detect gender bias in your content and get suggestions for more inclusive language
        </p>
      </div>

      {/* Input Section */}
      <Card className="border-2 hover:border-primary/30 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Text Analysis
          </CardTitle>
          <CardDescription>
            Paste your text below or try a sample to see bias detection in action
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 mb-4 flex-wrap">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleSampleText('jobDescription')}
            >
              Job Description
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleSampleText('corporateEmail')}
            >
              Corporate Email
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleSampleText('newsArticle')}
            >
              News Article
            </Button>
          </div>
          
          <Textarea
            placeholder="Paste your text here to analyze for gender bias..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px] resize-none"
          />
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {text.length} characters
            </span>
            <Button 
              onClick={handleAnalyze}
              disabled={!text.trim() || isAnalyzing}
              className="min-w-[120px]"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {analysis && (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Analysis Results */}
          <div className="md:col-span-2 space-y-6">
            {/* Highlighted Text */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Highlighted Text
                </CardTitle>
                <CardDescription>
                  Biased terms are highlighted. Click on them for suggestions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <HighlightedText 
                  text={text} 
                  matches={analysis.matches}
                  onMatchClick={setSelectedMatch}
                />
              </CardContent>
            </Card>

            {/* Suggestions */}
            {analysis.matches.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Improvement Suggestions</CardTitle>
                  <CardDescription>
                    Consider these alternatives for more inclusive language
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {analysis.matches.map((match, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={getTypeColor(match.type)}>
                          {match.type}
                        </Badge>
                        <span className="font-medium">{match.word}</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="text-success font-medium">{match.suggestion}</span>
                      </div>
                      <Badge className={getSeverityColor(match.severity)}>
                        {match.severity}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            {/* Bias Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Bias Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold">{analysis.score}</div>
                  <div className="text-sm text-muted-foreground">
                    biased terms per 100 words
                  </div>
                  <div className={`flex items-center justify-center gap-2 ${biasLevel?.color}`}>
                    {biasLevel?.icon}
                    <span className="font-medium">{biasLevel?.level}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bias Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Bias Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(analysis.summary).map(([type, count]) => (
                  <div key={type} className="flex justify-between items-center">
                    <span className="capitalize text-sm">{type}</span>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                ))}
                
                <Separator />
                
                <div className="flex justify-between items-center font-medium">
                  <span>Total Issues</span>
                  <Badge>{analysis.matches.length}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Report Issue */}
            <Card>
              <CardHeader>
                <CardTitle>Report Bias</CardTitle>
                <CardDescription>
                  Help improve bias detection by reporting instances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowReport(true)}
                >
                  Report This Text
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Tooltips and Modals */}
      {selectedMatch && (
        <BiasTooltip match={selectedMatch} onClose={() => setSelectedMatch(null)} />
      )}
      
      {showReport && (
        <BiasReport 
          text={text}
          analysis={analysis}
          onClose={() => setShowReport(false)}
        />
      )}
    </div>
  );
};