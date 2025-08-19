interface StatsCardProps {
  value: string | number;
  label: string;
}

export function StatsCard({ value, label }: StatsCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 text-center space-y-2">
      <div className="text-3xl font-bold text-primary">{value}</div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
}
