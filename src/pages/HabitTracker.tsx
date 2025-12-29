import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Check, Plus, Trash2, Flame, Trophy, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Habit {
  id: string;
  name: string;
  category: string;
  completedDates: string[];
  createdAt: string;
}

const STRESS_REDUCTION_HABITS = [
  { name: "Morning Meditation (10 min)", category: "Mental Health" },
  { name: "Exercise (30 min)", category: "Physical Health" },
  { name: "8 Hours of Sleep", category: "Sleep" },
  { name: "Drink 8 Glasses of Water", category: "Hydration" },
  { name: "Deep Breathing Exercise", category: "Mental Health" },
  { name: "Healthy Meal Prep", category: "Nutrition" },
  { name: "Limit Screen Time", category: "Digital Wellness" },
  { name: "Journal Thoughts", category: "Mental Health" },
];

const HabitTracker = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabitName, setNewHabitName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const stored = localStorage.getItem("stress-habits");
    if (stored) {
      setHabits(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (habits.length > 0) {
      localStorage.setItem("stress-habits", JSON.stringify(habits));
    }
  }, [habits]);

  const addHabit = (name: string, category: string) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      category,
      completedDates: [],
      createdAt: today,
    };
    setHabits([...habits, newHabit]);
    toast({
      title: "Habit Added",
      description: `"${name}" added to your tracker`,
    });
  };

  const toggleHabit = (habitId: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const isCompleted = habit.completedDates.includes(today);
        return {
          ...habit,
          completedDates: isCompleted
            ? habit.completedDates.filter(d => d !== today)
            : [...habit.completedDates, today]
        };
      }
      return habit;
    }));
  };

  const deleteHabit = (habitId: string) => {
    setHabits(habits.filter(h => h.id !== habitId));
    toast({
      title: "Habit Removed",
      description: "Habit deleted from tracker",
    });
  };

  const calculateStreak = (completedDates: string[]) => {
    if (completedDates.length === 0) return 0;
    
    const sorted = [...completedDates].sort().reverse();
    let streak = 0;
    let checkDate = new Date();
    
    for (let i = 0; i < sorted.length; i++) {
      const dateStr = checkDate.toISOString().split('T')[0];
      if (sorted[i] === dateStr) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getTodayCompletion = () => {
    if (habits.length === 0) return 0;
    const completed = habits.filter(h => h.completedDates.includes(today)).length;
    return Math.round((completed / habits.length) * 100);
  };

  const getTotalCompletions = () => {
    return habits.reduce((sum, habit) => sum + habit.completedDates.length, 0);
  };

  const getLongestStreak = () => {
    return Math.max(0, ...habits.map(h => calculateStreak(h.completedDates)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Smart Habit Tracker
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Build healthy habits to reduce stress and improve well-being
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-primary/20 hover-scale">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Today's Progress</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">
                {getTodayCompletion()}%
              </div>
              <Progress value={getTodayCompletion()} className="h-2" />
            </CardContent>
          </Card>

          <Card className="border-accent/20 hover-scale">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-accent" />
                <CardTitle className="text-lg">Current Streak</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent mb-2">
                {getLongestStreak()} days
              </div>
              <p className="text-sm text-muted-foreground">Keep it going!</p>
            </CardContent>
          </Card>

          <Card className="border-success/20 hover-scale">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-success" />
                <CardTitle className="text-lg">Total Completions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success mb-2">
                {getTotalCompletions()}
              </div>
              <p className="text-sm text-muted-foreground">All time</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Add Suggestions */}
        {habits.length === 0 && (
          <Card className="mb-8 border-primary/20">
            <CardHeader>
              <CardTitle>Suggested Stress-Reduction Habits</CardTitle>
              <CardDescription>Click to add to your tracker</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-3">
                {STRESS_REDUCTION_HABITS.map((habit, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="justify-start h-auto py-3"
                    onClick={() => addHabit(habit.name, habit.category)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    <div className="text-left">
                      <div className="font-medium">{habit.name}</div>
                      <div className="text-xs text-muted-foreground">{habit.category}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Active Habits */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Habits</h2>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Custom Habit
          </Button>
        </div>

        {/* Add Custom Habit Form */}
        {showAddForm && (
          <Card className="mb-6 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter habit name..."
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newHabitName.trim()) {
                      addHabit(newHabitName, "Custom");
                      setNewHabitName("");
                      setShowAddForm(false);
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    if (newHabitName.trim()) {
                      addHabit(newHabitName, "Custom");
                      setNewHabitName("");
                      setShowAddForm(false);
                    }
                  }}
                >
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Habit List */}
        <div className="grid gap-4">
          {habits.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No habits yet. Start building healthy routines!</p>
                <Button onClick={() => setShowAddForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Habit
                </Button>
              </CardContent>
            </Card>
          ) : (
            habits.map((habit) => {
              const isCompletedToday = habit.completedDates.includes(today);
              const streak = calculateStreak(habit.completedDates);
              const totalCompletions = habit.completedDates.length;

              return (
                <Card
                  key={habit.id}
                  className={`border-2 transition-all ${
                    isCompletedToday ? 'border-success bg-success/5' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Button
                        variant={isCompletedToday ? "default" : "outline"}
                        size="icon"
                        className={`h-12 w-12 rounded-full ${
                          isCompletedToday ? 'bg-success hover:bg-success/90' : ''
                        }`}
                        onClick={() => toggleHabit(habit.id)}
                      >
                        <Check className={`h-6 w-6 ${isCompletedToday ? 'text-white' : ''}`} />
                      </Button>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{habit.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {habit.category}
                          </Badge>
                        </div>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Flame className="h-4 w-4 text-accent" />
                            {streak} day streak
                          </span>
                          <span className="flex items-center gap-1">
                            <Trophy className="h-4 w-4 text-success" />
                            {totalCompletions} completions
                          </span>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteHabit(habit.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;
