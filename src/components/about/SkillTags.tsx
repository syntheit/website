interface SkillTagsProps {
  skills: string[];
  size?: "sm" | "md";
}

export function SkillTags({ skills, size = "md" }: SkillTagsProps) {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className={`${sizeClasses[size]} bg-primary/10 text-primary rounded-full`}
        >
          {skill}
        </span>
      ))}
    </div>
  );
}
