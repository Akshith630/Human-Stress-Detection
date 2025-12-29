import { NavLink } from "./NavLink";
import { Activity } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <Activity className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">Stress Detection</span>
          </NavLink>
          
          <div className="flex gap-6">
            <NavLink
              to="/"
              className="text-foreground/70 hover:text-foreground transition-colors"
              activeClassName="text-primary font-semibold"
            >
              Home
            </NavLink>
            <NavLink
              to="/data-info"
              className="text-foreground/70 hover:text-foreground transition-colors"
              activeClassName="text-primary font-semibold"
            >
              Data Info
            </NavLink>
            <NavLink
              to="/detection"
              className="text-foreground/70 hover:text-foreground transition-colors"
              activeClassName="text-primary font-semibold"
            >
              Detection
            </NavLink>
            <NavLink
              to="/habit-tracker"
              className="text-foreground/70 hover:text-foreground transition-colors"
              activeClassName="text-primary font-semibold"
            >
              Habit Tracker
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
