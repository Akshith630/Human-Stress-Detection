import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Activity, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

interface StressResult {
  level: "low" | "moderate" | "high";
  score: number;
  confidence: number;
  recommendations: string[];
  probabilities: {
    low: number;
    moderate: number;
    high: number;
  };
}

// Preset scenarios for different stress levels
const STRESS_SCENARIOS = {
  low: [
    {
      heartRate: "68",
      skinConductance: "7",
      sleepHours: "8.5",
      bloodOxygen: "98",
      respirationRate: "13",
      physicalActivity: "50"
    },
    {
      heartRate: "72",
      skinConductance: "8",
      sleepHours: "8.0",
      bloodOxygen: "97",
      respirationRate: "14",
      physicalActivity: "45"
    },
    {
      heartRate: "75",
      skinConductance: "9",
      sleepHours: "7.5",
      bloodOxygen: "98",
      respirationRate: "15",
      physicalActivity: "40"
    }
  ],
  moderate: [
    {
      heartRate: "85",
      skinConductance: "14",
      sleepHours: "6.5",
      bloodOxygen: "96",
      respirationRate: "17",
      physicalActivity: "28"
    },
    {
      heartRate: "88",
      skinConductance: "15",
      sleepHours: "6.0",
      bloodOxygen: "95",
      respirationRate: "18",
      physicalActivity: "25"
    },
    {
      heartRate: "92",
      skinConductance: "16",
      sleepHours: "6.5",
      bloodOxygen: "96",
      respirationRate: "19",
      physicalActivity: "22"
    }
  ],
  high: [
    {
      heartRate: "105",
      skinConductance: "20",
      sleepHours: "5.5",
      bloodOxygen: "94",
      respirationRate: "21",
      physicalActivity: "18"
    },
    {
      heartRate: "110",
      skinConductance: "21",
      sleepHours: "5.0",
      bloodOxygen: "93",
      respirationRate: "22",
      physicalActivity: "15"
    },
    {
      heartRate: "115",
      skinConductance: "23",
      sleepHours: "4.5",
      bloodOxygen: "92",
      respirationRate: "24",
      physicalActivity: "12"
    }
  ]
};

// Get truly random stress scenario - randomly selects from all stress types
const getRandomScenario = () => {
  const levels: Array<keyof typeof STRESS_SCENARIOS> = ["low", "moderate", "high"];
  
  // Truly random selection - equal probability for each stress level
  const randomLevelIndex = Math.floor(Math.random() * levels.length);
  const levelToUse = levels[randomLevelIndex];
  
  // Within the selected level, randomly pick one of the scenarios
  const scenariosForLevel = STRESS_SCENARIOS[levelToUse];
  const randomScenarioIndex = Math.floor(Math.random() * scenariosForLevel.length);
  const selectedScenario = scenariosForLevel[randomScenarioIndex];
  
  return { data: selectedScenario, level: levelToUse };
};

const Detection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    heartRate: "",
    skinConductance: "",
    sleepHours: "",
    bloodOxygen: "",
    respirationRate: "",
    physicalActivity: ""
  });
  
  const [result, setResult] = useState<StressResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateStressLevel = (data: typeof formData): StressResult => {
    // Simulated ML algorithm - in production, this would call an API
    const hr = parseFloat(data.heartRate);
    const sc = parseFloat(data.skinConductance);
    const sleep = parseFloat(data.sleepHours);
    const bo = parseFloat(data.bloodOxygen);
    const rr = parseFloat(data.respirationRate);
    const pa = parseFloat(data.physicalActivity);

    let stressScore = 0;
    
    // Heart rate scoring
    if (hr > 100) stressScore += 20;
    else if (hr > 90) stressScore += 10;
    
    // Skin conductance
    if (sc > 20) stressScore += 20;
    else if (sc > 15) stressScore += 10;
    
    // Sleep hours
    if (sleep < 6) stressScore += 25;
    else if (sleep < 7) stressScore += 15;
    
    // Blood oxygen
    if (bo < 95) stressScore += 15;
    
    // Respiration rate
    if (rr > 20) stressScore += 10;
    
    // Physical activity
    if (pa < 20) stressScore += 10;

    const level: "low" | "moderate" | "high" = 
      stressScore < 25 ? "low" : 
      stressScore < 50 ? "moderate" : "high";

    // Calculate probabilities for all three stress levels
    // Based on how close the stress score is to each category
    let lowProb = 0;
    let moderateProb = 0;
    let highProb = 0;

    if (stressScore < 25) {
      // Low stress range (0-24)
      lowProb = 100 - (stressScore / 25) * 20; // 80-100%
      moderateProb = (stressScore / 25) * 15; // 0-15%
      highProb = 0;
    } else if (stressScore < 50) {
      // Moderate stress range (25-49)
      const position = (stressScore - 25) / 24; // 0 to 1
      lowProb = (1 - position) * 20; // 20% to 0%
      moderateProb = 60 + position * 25; // 60% to 85%
      highProb = position * 15; // 0% to 15%
    } else {
      // High stress range (50-100)
      const position = Math.min((stressScore - 50) / 50, 1); // 0 to 1
      lowProb = 0;
      moderateProb = (1 - position) * 30; // 30% to 0%
      highProb = 70 + position * 30; // 70% to 100%
    }

    // Normalize to ensure they sum to 100%
    const total = lowProb + moderateProb + highProb;
    lowProb = (lowProb / total) * 100;
    moderateProb = (moderateProb / total) * 100;
    highProb = (highProb / total) * 100;

    const recommendations = getRecommendations(level, data);
    
    // Calculate deterministic confidence based on how well values match the stress level
    // This ensures same inputs always produce EXACT same confidence
    const calculateConfidence = (
      level: "low" | "moderate" | "high",
      hr: number,
      sc: number,
      sleep: number,
      bo: number,
      rr: number,
      pa: number
    ): number => {
      let matchScore = 0;
      const totalParams = 6;
      
      if (level === "low") {
        // For low stress, check if values are in healthy ranges
        if (hr >= 60 && hr <= 100) matchScore += 1;
        if (sc >= 1 && sc <= 20) matchScore += 1;
        if (sleep >= 7 && sleep <= 9) matchScore += 1;
        if (bo >= 95 && bo <= 100) matchScore += 1;
        if (rr >= 12 && rr <= 20) matchScore += 1;
        if (pa >= 30 && pa <= 60) matchScore += 1;
        
        // Low stress should have highest confidence (90-100%)
        // Base: 90%, +1.67% per match (max 6 matches = +10% = 100%)
        const confidence = 90 + (matchScore / totalParams) * 10;
        return Math.round(confidence * 10) / 10;
      } else if (level === "moderate") {
        // For moderate stress, check if values are in moderate ranges
        if (hr >= 80 && hr <= 95) matchScore += 1;
        if (sc >= 12 && sc <= 18) matchScore += 1;
        if (sleep >= 6 && sleep < 7) matchScore += 1;
        if (bo >= 94 && bo < 96) matchScore += 1;
        if (rr >= 16 && rr <= 20) matchScore += 1;
        if (pa >= 20 && pa < 30) matchScore += 1;
        
        // Moderate stress should have medium confidence (80-90%)
        // Base: 80%, +1.67% per match (max 6 matches = +10% = 90%)
        const confidence = 80 + (matchScore / totalParams) * 10;
        return Math.round(confidence * 10) / 10;
      } else {
        // For high stress, check if values indicate high stress
        if (hr > 100) matchScore += 1;
        if (sc > 20) matchScore += 1;
        if (sleep < 6) matchScore += 1;
        if (bo < 95) matchScore += 1;
        if (rr > 20) matchScore += 1;
        if (pa < 20) matchScore += 1;
        
        // High stress should have lower confidence (70-80%)
        // Base: 70%, +1.67% per match (max 6 matches = +10% = 80%)
        const confidence = 70 + (matchScore / totalParams) * 10;
        return Math.round(confidence * 10) / 10;
      }
    };
    
    const confidence = calculateConfidence(level, hr, sc, sleep, bo, rr, pa);

    return { 
      level, 
      score: stressScore, 
      confidence, 
      recommendations,
      probabilities: {
        low: Math.round(lowProb * 10) / 10,
        moderate: Math.round(moderateProb * 10) / 10,
        high: Math.round(highProb * 10) / 10
      }
    };
  };

  const getRecommendations = (level: string, data: typeof formData): string[] => {
    const recs: string[] = [];
    
    if (parseFloat(data.sleepHours) < 7) {
      recs.push("Prioritize getting 7-9 hours of sleep per night");
    }
    
    if (parseFloat(data.physicalActivity) < 30) {
      recs.push("Increase daily physical activity to at least 30 minutes");
    }
    
    if (parseFloat(data.heartRate) > 90) {
      recs.push("Practice relaxation techniques like deep breathing or meditation");
    }
    
    if (level === "high") {
      recs.push("Consider consulting with a healthcare professional");
      recs.push("Take regular breaks throughout the day");
    }
    
    if (recs.length === 0) {
      recs.push("Maintain your current healthy lifestyle habits");
    }
    
    return recs;
  };

  const runAnalysis = (data: typeof formData, message?: string) => {
    setIsAnalyzing(true);

    setTimeout(() => {
      const stressResult = calculateStressLevel(data);
      setResult(stressResult);
      setIsAnalyzing(false);

      toast({
        title: "Analysis Complete",
        description: message ?? "Your stress level has been assessed",
      });
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const values = Object.values(formData);
    if (values.some(v => !v || isNaN(parseFloat(v)))) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all fields with valid numbers",
        variant: "destructive"
      });
      return;
    }

    runAnalysis(formData);
  };

  const handleSingleClickRun = () => {
    if (isAnalyzing) return;
    const { data, level } = getRandomScenario();
    setFormData(data);
    const levelNames = { low: "Low Stress", moderate: "Moderate Stress", high: "High Stress" };
    runAnalysis(data, `Random ${levelNames[level]} scenario analyzed with preset health data`);
  };

  const getResultColor = (level: string) => {
    switch (level) {
      case "low": return "success";
      case "moderate": return "warning";
      case "high": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Stress Detection
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Enter your health parameters for AI-powered stress level analysis
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <p className="text-sm uppercase tracking-wide text-muted-foreground">Input Parameters</p>
                <p className="text-muted-foreground text-sm">Enter your data manually or try the preset run.</p>
              </div>
              <Button 
                type="button"
                variant="outline"
                className="gap-2"
                onClick={handleSingleClickRun}
                disabled={isAnalyzing}
              >
                <Zap className="w-4 h-4" />
                Single-Click Run
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                <Input
                  id="heartRate"
                  type="number"
                  placeholder="e.g., 75"
                  value={formData.heartRate}
                  onChange={(e) => handleInputChange("heartRate", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="skinConductance">Skin Conductance (μS)</Label>
                <Input
                  id="skinConductance"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 12.5"
                  value={formData.skinConductance}
                  onChange={(e) => handleInputChange("skinConductance", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="sleepHours">Sleep Hours</Label>
                <Input
                  id="sleepHours"
                  type="number"
                  step="0.5"
                  placeholder="e.g., 7.5"
                  value={formData.sleepHours}
                  onChange={(e) => handleInputChange("sleepHours", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="bloodOxygen">Blood Oxygen (%)</Label>
                <Input
                  id="bloodOxygen"
                  type="number"
                  placeholder="e.g., 98"
                  value={formData.bloodOxygen}
                  onChange={(e) => handleInputChange("bloodOxygen", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="respirationRate">Respiration Rate (breaths/min)</Label>
                <Input
                  id="respirationRate"
                  type="number"
                  placeholder="e.g., 16"
                  value={formData.respirationRate}
                  onChange={(e) => handleInputChange("respirationRate", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="physicalActivity">Physical Activity (min/day)</Label>
                <Input
                  id="physicalActivity"
                  type="number"
                  placeholder="e.g., 45"
                  value={formData.physicalActivity}
                  onChange={(e) => handleInputChange("physicalActivity", e.target.value)}
                  className="mt-2"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:opacity-90"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Activity className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Stress Level"
                )}
              </Button>
            </form>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {result ? (
              <>
                <Card className="p-8">
                  <div className="text-center">
                    <div className="mb-6">
                      {result.level === "low" ? (
                        <CheckCircle2 className="w-16 h-16 mx-auto text-success" />
                      ) : (
                        <AlertCircle className="w-16 h-16 mx-auto text-destructive" />
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4">Stress Assessment</h3>
                    
                    <Badge 
                      className={`text-lg px-4 py-2 mb-4 ${
                        result.level === "low" ? "bg-success" :
                        result.level === "moderate" ? "bg-warning" : "bg-destructive"
                      }`}
                    >
                      {result.level.toUpperCase()} STRESS
                    </Badge>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-secondary/30 p-4 rounded-lg">
                        <div className="text-3xl font-bold text-primary">
                          {result.score}
                        </div>
                        <div className="text-sm text-muted-foreground">Stress Score</div>
                      </div>
                      
                      <div className="bg-secondary/30 p-4 rounded-lg">
                        <div className="text-3xl font-bold text-primary">
                          {result.confidence.toFixed(0)}%
                        </div>
                        <div className="text-sm text-muted-foreground">Confidence</div>
                      </div>
                    </div>

                    {/* Stress Level Probabilities */}
                    <div className="mt-6 space-y-4">
                      <h4 className="font-semibold text-lg mb-3">Stress Level Probabilities</h4>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-success">Low Stress</span>
                            <span className="text-lg font-bold text-success">{result.probabilities.low.toFixed(1)}%</span>
                          </div>
                          <Progress value={result.probabilities.low} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-warning">Moderate Stress</span>
                            <span className="text-lg font-bold text-warning">{result.probabilities.moderate.toFixed(1)}%</span>
                          </div>
                          <Progress value={result.probabilities.moderate} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-destructive">High Stress</span>
                            <span className="text-lg font-bold text-destructive">{result.probabilities.high.toFixed(1)}%</span>
                          </div>
                          <Progress value={result.probabilities.high} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-8">
                  <h4 className="font-semibold text-lg mb-4">Recommendations</h4>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </>
            ) : (
              <Card className="p-8 h-full flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Activity className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p>Fill in your health parameters and click "Analyze" to see results</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detection;
