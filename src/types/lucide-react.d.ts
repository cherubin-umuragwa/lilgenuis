// Local type declarations for lucide-react@1.68.0
// Needed because the installed package is missing its dist/lucide-react.d.ts file.
declare module "lucide-react" {
  import type { FC, SVGProps } from "react";

  export type LucideProps = SVGProps<SVGSVGElement> & {
    size?: number | string;
    absoluteStrokeWidth?: boolean;
  };

  export type LucideIcon = FC<LucideProps>;

  // Icon exports used in this project
  export const AlertCircle: LucideIcon;
  export const BookOpen: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const ChevronUp: LucideIcon;
  export const Check: LucideIcon;
  export const Globe: LucideIcon;
  export const Home: LucideIcon;
  export const Info: LucideIcon;
  export const Menu: LucideIcon;
  export const Star: LucideIcon;
  export const Trophy: LucideIcon;
  export const User: LucideIcon;
  export const X: LucideIcon;
  export const Zap: LucideIcon;
  export const Award: LucideIcon;
  export const Flame: LucideIcon;
  export const Lock: LucideIcon;
  export const Play: LucideIcon;
  export const RefreshCw: LucideIcon;
  export const Search: LucideIcon;
  export const Settings: LucideIcon;
  export const Shield: LucideIcon;
  export const Sparkles: LucideIcon;
  export const Target: LucideIcon;
  export const Clock: LucideIcon;
  export const BookMarked: LucideIcon;
  export const Microscope: LucideIcon;
  export const Calculator: LucideIcon;
  export const Globe2: LucideIcon;
  export const Code: LucideIcon;
  export const Brain: LucideIcon;
  export const Lightbulb: LucideIcon;
  export const MapPin: LucideIcon;
  export const Scroll: LucideIcon;
  export const Languages: LucideIcon;
  export const FlaskConical: LucideIcon;
}
