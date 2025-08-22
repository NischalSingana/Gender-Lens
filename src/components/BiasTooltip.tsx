import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Lightbulb } from 'lucide-react';
import { type BiasMatch, getSeverityColor, getTypeColor } from '@/lib/biasDetection';

interface BiasTooltipProps {
  match: BiasMatch;
  onClose: () => void;
}

export const BiasTooltip: React.FC<BiasTooltipProps> = ({ match, onClose }) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-lg border-2">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-warning" />
                Bias Detected
              </CardTitle>
              <div className="flex gap-2">
                <Badge className={getTypeColor(match.type)} variant="outline">
                  {match.type}
                </Badge>
                <Badge className={getSeverityColor(match.severity)}>
                  {match.severity} severity
                </Badge>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Original Term</h4>
            <div className="p-2 rounded bg-muted/50 border">
              <code className="text-sm">{match.word}</code>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2 text-success">Suggested Alternative</h4>
            <div className="p-2 rounded bg-success/10 border border-success/20">
              <code className="text-sm font-medium text-success">{match.suggestion}</code>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Why This Matters</h4>
            <p className="text-sm text-muted-foreground">
              {match.explanation}
            </p>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button size="sm" onClick={onClose} className="flex-1">
              Got it
            </Button>
            <Button variant="outline" size="sm">
              Learn more
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};