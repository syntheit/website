import { Globe, Star, MapPin, Route, TreePine, Sparkles, DollarSign, Music, Heart } from "lucide-react";
import { visitedCountries } from "@/app/metadata/countries";

const travelFacts = [
  {
    question: "Countries visited",
    answer: `${visitedCountries.length} countries across 4 continents`,
    icon: Globe,
    color: "text-blue-700 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30"
  },
  {
    question: "Most beautiful city",
    answer: "Buenos Aires, Argentina",
    icon: Star,
    color: "text-yellow-700 dark:text-yellow-400",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/30"
  },
  {
    question: "Most underrated city",
    answer: "Ciudad del Este, Paraguay",
    icon: MapPin,
    color: "text-orange-700 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/30"
  },
  {
    question: "Most overrated city",
    answer: "Chicago, Illinois",
    icon: MapPin,
    color: "text-red-700 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/30"
  },
  {
    question: "Best Chinese food",
    answer: "Ciudad del Este, Paraguay",
    icon: Star,
    color: "text-green-700 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30"
  },
  {
    question: "Best for roadtrips",
    answer: "Southern Brazil",
    icon: Route,
    color: "text-purple-700 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30"
  },
  {
    question: "Best for hiking",
    answer: "Adirondacks, NY",
    icon: TreePine,
    color: "text-emerald-700 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30"
  },
  {
    question: "Best unique natural wonder",
    answer: "Jujuy and the Salinas Grandes",
    icon: Sparkles,
    color: "text-pink-700 dark:text-pink-400",
    bgColor: "bg-pink-100 dark:bg-pink-900/30"
  },
  {
    question: "Best value",
    answer: "Brazil",
    icon: DollarSign,
    color: "text-green-700 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30"
  },
  {
    question: "Best music scene",
    answer: "Buenos Aires, Argentina",
    icon: Music,
    color: "text-indigo-700 dark:text-indigo-400",
    bgColor: "bg-indigo-100 dark:bg-indigo-900/30"
  },
  {
    question: "A place I'll definitely visit again",
    answer: "Brazil",
    icon: Heart,
    color: "text-red-700 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/30"
  }
];

export function TravelFacts() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-foreground">Travel Fast Facts</h2>
        <p className="mx-auto max-w-xl text-muted-foreground">
          Quick answers to the most common travel questions based on my adventures around the world.
        </p>
      </div>
      
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {travelFacts.map((fact, index) => {
          const IconComponent = fact.icon;
          return (
            <div 
              key={index}
              className="group relative p-4 space-y-2 rounded-xl border bg-card border-border hover:border-primary/30 transition-all duration-300 hover:shadow-md"
            >
              <div className={`flex justify-center items-center w-10 h-10 rounded-lg ${fact.bgColor} group-hover:scale-105 transition-transform duration-300`}>
                <IconComponent className={`w-5 h-5 ${fact.color}`} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {fact.question}
                </h3>
                <p className="text-base font-semibold text-foreground leading-tight">
                  {fact.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
