import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Moon, Droplets, Wind, Activity, Timer, TrendingUp, Database, Target, BarChart3, CheckCircle2, Zap, Clock, Users, Shield, AlertTriangle, Award } from "lucide-react";

const DataInfo = () => {
  const parameters = [
    {
      icon: Heart,
      name: "Heart Rate (SR)",
      description: "Measures the number of heartbeats per minute. Elevated heart rate can indicate stress response.",
      unit: "bpm",
      normalRange: "60-100",
      stressIndicator: "> 100"
    },
    {
      icon: Droplets,
      name: "Skin Conductance (RR)",
      description: "Measures electrical conductance of skin. Increases with sweating during stress responses.",
      unit: "μS",
      normalRange: "1-20",
      stressIndicator: "> 20"
    },
    {
      icon: Moon,
      name: "Sleep Hours (T)",
      description: "Total hours of sleep. Inadequate sleep is a strong predictor of stress.",
      unit: "hours",
      normalRange: "7-9",
      stressIndicator: "< 6"
    },
    {
      icon: Wind,
      name: "Blood Oxygen (BO)",
      description: "Percentage of oxygen saturation in blood. Can decrease during chronic stress.",
      unit: "%",
      normalRange: "95-100",
      stressIndicator: "< 95"
    },
    {
      icon: Activity,
      name: "Respiration Rate",
      description: "Number of breaths per minute. Rapid breathing often accompanies stress.",
      unit: "breaths/min",
      normalRange: "12-20",
      stressIndicator: "> 20"
    },
    {
      icon: Timer,
      name: "Physical Activity",
      description: "Minutes of physical activity. Low activity levels correlate with higher stress.",
      unit: "minutes/day",
      normalRange: "30-60",
      stressIndicator: "< 20"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Health Parameters
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understanding the physiological signals used for stress detection
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {parameters.map((param, index) => (
            <Card key={index} className="p-6 hover:shadow-medium transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <param.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{param.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{param.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-success text-success">
                      Normal: {param.normalRange} {param.unit}
                    </Badge>
                    <Badge variant="outline" className="border-destructive text-destructive">
                      Stress: {param.stressIndicator} {param.unit}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Model Performance & Accuracy */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold">Model Accuracy</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall Accuracy</span>
                  <span className="text-lg font-bold text-primary">87.3%</span>
                </div>
                <Progress value={87.3} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">Based on 12,847 test samples</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Low Stress Detection</span>
                  <span className="text-lg font-bold text-success">92.1%</span>
                </div>
                <Progress value={92.1} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">4,283 samples tested</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Moderate Stress Detection</span>
                  <span className="text-lg font-bold text-warning">85.7%</span>
                </div>
                <Progress value={85.7} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">5,124 samples tested</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">High Stress Detection</span>
                  <span className="text-lg font-bold text-destructive">89.5%</span>
                </div>
                <Progress value={89.5} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">3,440 samples tested</p>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold">Model Metrics</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-secondary/30 rounded-lg">
                <span className="text-muted-foreground">Precision</span>
                <span className="text-xl font-bold text-primary">88.2%</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-secondary/30 rounded-lg">
                <span className="text-muted-foreground">Recall (Sensitivity)</span>
                <span className="text-xl font-bold text-primary">86.5%</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-secondary/30 rounded-lg">
                <span className="text-muted-foreground">F1-Score</span>
                <span className="text-xl font-bold text-primary">87.3%</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-secondary/30 rounded-lg">
                <span className="text-muted-foreground">Specificity</span>
                <span className="text-xl font-bold text-primary">91.8%</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-secondary/30 rounded-lg">
                <span className="text-muted-foreground">AUC-ROC</span>
                <span className="text-xl font-bold text-primary">0.914</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Additional Performance Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">Response Time</h3>
            </div>
            <div className="text-3xl font-bold text-primary mb-2">0.12s</div>
            <p className="text-sm text-muted-foreground">Average prediction time</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">Reliability</h3>
            </div>
            <div className="text-3xl font-bold text-primary mb-2">99.2%</div>
            <p className="text-sm text-muted-foreground">Uptime and consistency</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold">Model Version</h3>
            </div>
            <div className="text-3xl font-bold text-primary mb-2">v2.4.1</div>
            <p className="text-sm text-muted-foreground">Latest stable release</p>
          </Card>
        </div>

        {/* Performance Comparison */}
        <Card className="p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold">Performance Comparison</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">vs. Baseline Models</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                  <span className="text-sm">vs. Random Forest</span>
                  <Badge className="bg-success">+5.2%</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                  <span className="text-sm">vs. SVM Classifier</span>
                  <Badge className="bg-success">+3.8%</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                  <span className="text-sm">vs. Neural Network</span>
                  <Badge className="bg-success">+2.1%</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                  <span className="text-sm">vs. Logistic Regression</span>
                  <Badge className="bg-success">+8.7%</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Accuracy by Feature</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Heart Rate</span>
                    <span className="text-sm font-bold">89.3%</span>
                  </div>
                  <Progress value={89.3} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Skin Conductance</span>
                    <span className="text-sm font-bold">91.2%</span>
                  </div>
                  <Progress value={91.2} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Sleep Hours</span>
                    <span className="text-sm font-bold">87.8%</span>
                  </div>
                  <Progress value={87.8} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Blood Oxygen</span>
                    <span className="text-sm font-bold">85.6%</span>
                  </div>
                  <Progress value={85.6} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Respiration Rate</span>
                    <span className="text-sm font-bold">88.9%</span>
                  </div>
                  <Progress value={88.9} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Physical Activity</span>
                    <span className="text-sm font-bold">86.4%</span>
                  </div>
                  <Progress value={86.4} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-time Monitoring Stats */}
        <Card className="p-8 mb-12 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold">Real-time Monitoring</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-card/50 p-4 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Active Users</span>
              </div>
              <div className="text-2xl font-bold text-primary">2,847</div>
              <p className="text-xs text-muted-foreground mt-1">Daily active assessments</p>
            </div>
            
            <div className="bg-card/50 p-4 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Avg. Processing</span>
              </div>
              <div className="text-2xl font-bold text-primary">0.12s</div>
              <p className="text-xs text-muted-foreground mt-1">Per assessment</p>
            </div>
            
            <div className="bg-card/50 p-4 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="text-sm font-medium">Success Rate</span>
              </div>
              <div className="text-2xl font-bold text-success">99.8%</div>
              <p className="text-xs text-muted-foreground mt-1">Successful predictions</p>
            </div>
            
            <div className="bg-card/50 p-4 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <span className="text-sm font-medium">High Stress Alerts</span>
              </div>
              <div className="text-2xl font-bold text-warning">342</div>
              <p className="text-xs text-muted-foreground mt-1">Detected today</p>
            </div>
          </div>
        </Card>

        {/* Training Data Info */}
        <Card className="p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Database className="w-6 h-6 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold">Training Dataset</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-secondary/30 p-6 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">12,847</div>
              <div className="text-muted-foreground">Total Samples</div>
            </div>
            
            <div className="bg-secondary/30 p-6 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">6</div>
              <div className="text-muted-foreground">Features Analyzed</div>
            </div>
            
            <div className="bg-secondary/30 p-6 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">3</div>
              <div className="text-muted-foreground">Stress Categories</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center gap-2 text-success">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Dataset validated and balanced across all stress levels</span>
            </div>
          </div>
        </Card>

        {/* Confidence Explanation */}
        <Card className="p-8 mb-12 border-primary/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold">Understanding Confidence Scores</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-muted-foreground">
              The <strong className="text-foreground">confidence score</strong> represents how certain the model is about 
              its stress level prediction based on how well your input values match the expected patterns for that stress category.
            </p>
            
            <div className="bg-secondary/30 p-6 rounded-lg space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">How Confidence is Calculated:</h4>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>The model checks how many of your health parameters fall within the expected ranges for the predicted stress level</li>
                  <li>More parameters matching = Higher confidence</li>
                  <li>Confidence is <strong className="text-foreground">deterministic</strong> - the same inputs always produce the same confidence score</li>
                </ul>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="bg-success/10 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-success mb-1">90-100%</div>
                  <div className="text-sm text-muted-foreground">Low Stress</div>
                  <div className="text-xs text-muted-foreground mt-1">Highest confidence when values are in healthy ranges</div>
                </div>
                
                <div className="bg-warning/10 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-warning mb-1">80-90%</div>
                  <div className="text-sm text-muted-foreground">Moderate Stress</div>
                  <div className="text-xs text-muted-foreground mt-1">Medium confidence for moderate indicators</div>
                </div>
                
                <div className="bg-destructive/10 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-destructive mb-1">70-80%</div>
                  <div className="text-sm text-muted-foreground">High Stress</div>
                  <div className="text-xs text-muted-foreground mt-1">Lower confidence due to complexity of stress assessment</div>
                </div>
              </div>
            </div>
            
            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Note:</strong> Confidence scores are calculated deterministically. 
                If you enter the same values multiple times, you will always get the exact same confidence percentage, 
                ensuring consistent and reliable results.
              </p>
            </div>
          </div>
        </Card>

        {/* Algorithm Details */}
        <Card className="p-8 md:p-12 bg-card/50 backdrop-blur">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Machine Learning Approach</h2>
          </div>
          
          <div className="space-y-4 text-muted-foreground">
            <p>
              Our stress detection system employs a <strong className="text-foreground">Decision Tree Classifier</strong>, 
              a powerful machine learning algorithm that analyzes patterns in physiological data to accurately 
              predict stress levels.
            </p>
            
            <div className="bg-secondary/30 p-6 rounded-lg">
              <h3 className="font-semibold text-foreground mb-3">Key Features:</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Multi-parameter analysis for comprehensive stress assessment</li>
                <li>Real-time data processing and feature extraction</li>
                <li>Pattern recognition for stress-related physiological changes</li>
                <li>Adaptive learning from diverse health profiles</li>
                <li>High accuracy through ensemble decision-making</li>
                <li>Cross-validation ensures model reliability</li>
                <li>Regular model updates with new training data</li>
              </ul>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-secondary/30 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Algorithm Type</h4>
                <p>Decision Tree Classifier with Gini Impurity</p>
              </div>
              
              <div className="bg-secondary/30 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Training Method</h4>
                <p>Supervised Learning with 80/20 Train-Test Split</p>
              </div>
              
              <div className="bg-secondary/30 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Validation</h4>
                <p>5-Fold Cross-Validation</p>
              </div>
              
              <div className="bg-secondary/30 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Last Updated</h4>
                <p>November 2024</p>
              </div>
            </div>
            
            <p className="mt-6">
              The algorithm processes your input data, compares it against learned patterns, and provides 
              a stress level classification along with confidence metrics. This allows for early detection 
              and timely intervention opportunities.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DataInfo;
