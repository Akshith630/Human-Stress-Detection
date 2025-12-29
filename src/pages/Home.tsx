import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Activity, Brain, Heart, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Heart,
      title: "Heart Rate Monitoring",
      description: "Track cardiovascular responses to stress in real-time"
    },
    {
      icon: Brain,
      title: "ML-Powered Analysis",
      description: "Advanced Decision Tree algorithms for accurate predictions"
    },
    {
      icon: TrendingUp,
      title: "Multi-Parameter Detection",
      description: "Analyze skin conductance, sleep, blood oxygen, and more"
    },
    {
      icon: Activity,
      title: "Real-Time Assessment",
      description: "Instant stress level evaluation and recommendations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Activity className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Health Monitoring</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Human Stress Detection
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Utilizing advanced machine learning techniques to accurately detect and analyze stress levels 
            through multiple physiological parameters, providing valuable insights for timely intervention.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/detection")}
              className="bg-gradient-primary hover:opacity-90 shadow-medium"
            >
              Start Detection
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/data-info")}
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-medium transition-all duration-300 border-border/50">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <Card className="p-8 md:p-12 bg-card/50 backdrop-blur">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary">
                1
              </div>
              <h3 className="font-semibold mb-2">Data Collection</h3>
              <p className="text-sm text-muted-foreground">
                Input physiological parameters including heart rate, skin conductance, and sleep data
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary">
                2
              </div>
              <h3 className="font-semibold mb-2">Preprocessing</h3>
              <p className="text-sm text-muted-foreground">
                Data is cleaned and relevant features are extracted for analysis
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary">
                3
              </div>
              <h3 className="font-semibold mb-2">ML Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Decision Tree Classifier identifies stress patterns
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary">
                4
              </div>
              <h3 className="font-semibold mb-2">Results</h3>
              <p className="text-sm text-muted-foreground">
                Receive detailed stress assessment with personalized recommendations
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
