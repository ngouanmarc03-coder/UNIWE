import { Info } from "lucide-react";

export default function InfoBanner({ icon: Icon = Info, children, className = "" }) {
  return (
    <div
      className={`flex items-start gap-3 bg-accent/5 border-l-4 border-accent rounded-r-md px-5 py-4 text-sm text-ink/70 ${className}`}
    >
      <Icon className="text-accent shrink-0 mt-0.5" size={18} />
      <div>{children}</div>
    </div>
  );
}
