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
  export const ArrowLeft: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const Heart: LucideIcon;
  export const BookCheck: LucideIcon;
  export const CheckCircle: LucideIcon;
  export const BarChart2: LucideIcon;
  export const Gamepad2: LucideIcon;
  export const PlayCircle: LucideIcon;
  export const FileText: LucideIcon;
  export const Users: LucideIcon;
  export const MessageSquare: LucideIcon;
  export const GraduationCap: LucideIcon;
  export const PenLine: LucideIcon;
  export const HelpCircle: LucideIcon;
  export const XCircle: LucideIcon;
  export const BookOpenCheck: LucideIcon;
  export const BookOpenText: LucideIcon;
  export const Bell: LucideIcon;
  export const BellRing: LucideIcon;
  export const Palette: LucideIcon;
  export const LogIn: LucideIcon;
  export const UserPlus: LucideIcon;
  export const Map: LucideIcon;
  export const Compass: LucideIcon;
  export const Puzzle: LucideIcon;
}
