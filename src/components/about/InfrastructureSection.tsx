import { Server } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SkillTags } from "./SkillTags";

interface InfrastructureSectionProps {
  hardware: {
    system: Array<{ label: string; value: string }>;
    storage: Array<{ label: string; value: string }>;
  };
  services: {
    fileMedia: string[];
    productivitySecurity: string[];
    operatingSystem: string;
  };
  description: string[];
}

export function InfrastructureSection({
  hardware,
  services,
  description,
}: InfrastructureSectionProps) {
  return (
    <div className="space-y-8">
      <SectionHeader
        icon={<Server />}
        title="Server Infrastructure & Self-Hosting"
      />
      <div className="grid gap-8 md:grid-cols-2">
        {/* Hardware Specs */}
        <div className="space-y-6">
          <h3 className="text-foreground text-xl font-semibold">Hardware</h3>
          <div className="space-y-4">
            <div className="border-border bg-card rounded-2xl border p-4">
              <h4 className="text-foreground mb-3 font-semibold">System</h4>
              <div className="text-muted-foreground space-y-2 text-sm">
                {hardware.system.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-border bg-card rounded-2xl border p-4">
              <h4 className="text-foreground mb-3 font-semibold">Storage</h4>
              <div className="text-muted-foreground space-y-2 text-sm">
                {hardware.storage.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Self-Hosted Services */}
        <div className="space-y-6">
          <h3 className="text-foreground text-xl font-semibold">
            Self-Hosted Services
          </h3>
          <div className="space-y-4">
            <div className="border-border bg-card rounded-2xl border p-4">
              <h4 className="text-foreground mb-3 font-semibold">
                File & Media
              </h4>
              <SkillTags skills={services.fileMedia} size="sm" />
            </div>
            <div className="border-border bg-card rounded-2xl border p-4">
              <h4 className="text-foreground mb-3 font-semibold">
                Productivity & Security
              </h4>
              <SkillTags skills={services.productivitySecurity} size="sm" />
            </div>
            <div className="border-border bg-card rounded-2xl border p-4">
              <h4 className="text-foreground mb-3 font-semibold">
                Operating System
              </h4>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-600">
                  {services.operatingSystem}
                </span>
                <span className="text-muted-foreground text-sm">
                  Declarative configuration management
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="prose prose-lg text-muted-foreground max-w-none space-y-4">
        {description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
