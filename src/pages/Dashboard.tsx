
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, SortAsc, Brain, Calendar, Eye, Sparkles } from 'lucide-react';
import { NoteCard } from '@/components/NoteCard';
import { CreateNoteDialog } from '@/components/CreateNoteDialog';

// Mock data for notes
const mockNotes = [
  {
    id: 1,
    title: "Machine Learning Fundamentals",
    date: "2024-01-15",
    tags: ["AI", "Technology", "Learning"],
    summary: "Machine learning enables computers to learn from data without explicit programming. It includes supervised, unsupervised, and reinforcement learning approaches.",
    content: "Machine learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed. It involves algorithms that can identify patterns in data and make predictions or decisions based on those patterns. There are three main types of machine learning: supervised learning, unsupervised learning, and reinforcement learning. Supervised learning uses labeled data to train models, unsupervised learning finds patterns in unlabeled data, and reinforcement learning learns through trial and error with rewards and penalties.",
    aiGenerated: true
  },
  {
    id: 2,
    title: "React Best Practices",
    date: "2024-01-12",
    tags: ["React", "Frontend", "Development"],
    summary: "Essential patterns and practices for building scalable React applications with proper component structure and state management.",
    content: "React development requires following certain best practices to ensure maintainable and scalable applications. Key practices include proper component composition, effective state management, and performance optimization techniques.",
    aiGenerated: false
  },
  {
    id: 3,
    title: "Data Structures Overview",
    date: "2024-01-10",
    tags: ["Computer Science", "Algorithms", "Programming"],
    summary: "Comprehensive overview of fundamental data structures including arrays, linked lists, trees, and graphs with their use cases.",
    content: "Data structures are fundamental building blocks in computer science that organize and store data efficiently. Understanding different data structures and their trade-offs is crucial for writing efficient algorithms.",
    aiGenerated: true
  }
];

const Dashboard = () => {
  const [notes, setNotes] = useState(mockNotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateNote = (noteData: { title: string; content: string; tags: string[] }) => {
    const newNote = {
      id: Date.now(),
      title: noteData.title,
      date: new Date().toISOString().split('T')[0],
      tags: noteData.tags,
      summary: noteData.content.substring(0, 150) + "...",
      content: noteData.content,
      aiGenerated: false
    };
    setNotes([newNote, ...notes]);
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">NoteGenius</h1>
              <p className="text-sm text-gray-600">Intelligent note summarization</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-700 font-medium">AI Ready</span>
            </div>
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-black hover:bg-gray-800 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Note
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="flex items-center justify-between mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search notes, summaries, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <SortAsc className="w-4 h-4 mr-2" />
              Sort
            </Button>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid gap-6">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-12">
              <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? 'Try adjusting your search terms' : 'Create your first note to get started'}
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Note
              </Button>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))
          )}
        </div>
      </main>

      <CreateNoteDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateNote}
      />
    </div>
  );
};

export default Dashboard;
