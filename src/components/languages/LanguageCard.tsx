import { Clock, Target } from "lucide-react";

interface Language {
  name: string;
  nativeName: string;
  level:
    | "Native"
    | "Fluent"
    | "Advanced"
    | "Intermediate"
    | "Beginner"
    | "Learning";
  delfLevel?: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  years: number;
  description: string;
  flag: string;
  proficiency: number;
  goals: string[];
}

interface LanguageCardProps {
  language: Language;
}

export function LanguageCard({ language }: LanguageCardProps) {
  const getLevelColor = (level: Language["level"]) => {
    switch (level) {
      case "Native":
        return "text-green-600 bg-green-500/10";
      case "Fluent":
        return "text-blue-600 bg-blue-500/10";
      case "Advanced":
        return "text-purple-600 bg-purple-500/10";
      case "Intermediate":
        return "text-yellow-600 bg-yellow-500/10";
      case "Beginner":
        return "text-orange-600 bg-orange-500/10";
      case "Learning":
        return "text-red-600 bg-red-500/10";
    }
  };

  const getLevelDisplay = (language: Language) => {
    if (language.level === "Native") {
      return "Native";
    }
    return language.delfLevel ?? language.level;
  };

  const formatDuration = (years: number) => {
    if (years < 1) {
      const months = Math.round(years * 12);
      return `${months} ${months === 1 ? "month" : "months"}`;
    }
    return `${years} ${years === 1 ? "year" : "years"}`;
  };

  return (
    <div className="bg-card border-border space-y-4 rounded-2xl border p-6 transition-all hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{language.flag}</span>
          <div>
            <h3 className="text-foreground font-bold">{language.name}</h3>
            <p className="text-muted-foreground text-sm">
              {language.nativeName}
            </p>
          </div>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${getLevelColor(language.level)}`}
        >
          {getLevelDisplay(language)}
        </span>
      </div>

      <p className="text-muted-foreground text-sm">{language.description}</p>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Proficiency</span>
          <span className="font-medium">{language.proficiency}%</span>
        </div>
        <div className="bg-muted h-2 w-full rounded-full">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${language.proficiency}%` }}
          />
        </div>
      </div>

      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <Clock className="h-4 w-4" />
        <span>{formatDuration(language.years)}</span>
      </div>

      {language.goals.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-foreground text-sm font-semibold">
            Current Goals
          </h4>
          <div className="space-y-1">
            {language.goals.slice(0, 2).map((goal, index) => (
              <div
                key={index}
                className="text-muted-foreground flex items-center gap-2 text-sm"
              >
                <Target className="text-primary h-3 w-3" />
                <span>{goal}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
