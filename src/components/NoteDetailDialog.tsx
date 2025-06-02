
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, Sparkles, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Note {
  id: number;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  content: string;
  aiGenerated: boolean;
}

interface NoteDetailDialogProps {
  note: Note;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NoteDetailDialog = ({ note, open, onOpenChange }: NoteDetailDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">{note.date}</span>
              {note.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <DialogTitle className="text-2xl font-bold text-left">{note.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {note.aiGenerated && (
            <div className="border rounded-lg p-4 bg-blue-50">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-700">AI Generated Summary</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{note.summary}</p>
            </div>
          )}

          <div className="border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <FileText className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-700">Full Content</h3>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{note.content}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
