
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Eye, Sparkles, FileText } from 'lucide-react';
import { NoteDetailDialog } from '@/components/NoteDetailDialog';

interface Note {
  id: number;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  content: string;
  aiGenerated: boolean;
}

interface NoteCardProps {
  note: Note;
}

export const NoteCard = ({ note }: NoteCardProps) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow duration-200 bg-white">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{note.date}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {note.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mt-2">{note.title}</h3>
        </CardHeader>
        
        <CardContent className="pt-0">
          {note.aiGenerated && (
            <div className="flex items-center space-x-2 mb-4 p-3 bg-blue-50 rounded-lg">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">AI SUMMARY</span>
            </div>
          )}
          
          <p className="text-gray-600 mb-4 leading-relaxed">{note.summary}</p>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsDetailOpen(true)}
            className="w-full"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Full Note
          </Button>
        </CardContent>
      </Card>

      <NoteDetailDialog
        note={note}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </>
  );
};
