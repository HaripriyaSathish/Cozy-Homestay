import * as LucideIcons from "lucide-react";

// Resolves an icon name stored in Django Admin (e.g. "BedDouble") to the
// matching lucide-react component, so content editors can pick any icon
// without a frontend deploy.
export function Icon({ name, className, ...props }) {
  const Cmp = LucideIcons[name] || LucideIcons.Sparkles;
  return <Cmp className={className} {...props} />;
}
