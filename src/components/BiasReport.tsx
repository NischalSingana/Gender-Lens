import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Flag, AlertTriangle } from 'lucide-react';
import { type BiasAnalysis } from '@/lib/biasDetection';
import { useToast } from '@/hooks/use-toast';

interface BiasReportProps {
  text: string;
  analysis: BiasAnalysis | null;
  onClose: () => void;
}

export const BiasReport: React.FC<BiasReportProps> = ({ text, analysis, onClose }) => {
  const [reportText, setReportText] = useState(text);
  const [context, setContext] = useState('');
  const [biasType, setBiasType] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reportText.trim() || !context || !biasType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Here you would typically send the report to your backend
    console.log('Report submitted:', {
      text: reportText,
      context,
      biasType,
      sourceUrl,
      isAnonymous,
      detectedBias: analysis?.matches || []
    });
    
    toast({
      title: "Report Submitted",
      description: "Thank you for helping improve bias detection!",
    });
    
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg border-2">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Flag className="w-5 h-5 text-destructive" />
                Report Bias Instance
              </CardTitle>
              <CardDescription>
                Help us improve bias detection by reporting this content
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {analysis && analysis.matches.length > 0 && (
            <div className="mt-4 p-3 rounded-lg bg-muted/50 border">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                <span className="text-sm font-medium">
                  We detected {analysis.matches.length} potential bias issues
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {analysis.matches.slice(0, 5).map((match, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {match.word}
                  </Badge>
                ))}
                {analysis.matches.length > 5 && (
                  <Badge variant="outline" className="text-xs">
                    +{analysis.matches.length - 5} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="reportText">Text Content *</Label>
              <Textarea
                id="reportText"
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                placeholder="Paste the biased text here..."
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="context">Context *</Label>
                <Select value={context} onValueChange={setContext} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select context" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="job-description">Job Description</SelectItem>
                    <SelectItem value="corporate-communication">Corporate Communication</SelectItem>
                    <SelectItem value="news-article">News Article</SelectItem>
                    <SelectItem value="social-media">Social Media Post</SelectItem>
                    <SelectItem value="academic-content">Academic Content</SelectItem>
                    <SelectItem value="marketing-material">Marketing Material</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="biasType">Bias Type *</Label>
                <Select value={biasType} onValueChange={setBiasType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bias type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculine">Masculine-coded Language</SelectItem>
                    <SelectItem value="feminine">Feminine-coded Language</SelectItem>
                    <SelectItem value="stereotype">Gender Stereotypes</SelectItem>
                    <SelectItem value="exclusionary">Exclusionary Language</SelectItem>
                    <SelectItem value="other">Other Bias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sourceUrl">Source URL (optional)</Label>
              <Input
                id="sourceUrl"
                type="url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://example.com/article"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="anonymous" className="text-sm">
                Submit anonymously
              </Label>
            </div>

            <div className="text-xs text-muted-foreground">
              By submitting this report, you help improve our bias detection algorithms and contribute to creating more inclusive communication tools.
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};