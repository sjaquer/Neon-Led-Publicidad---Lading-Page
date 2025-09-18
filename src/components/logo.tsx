import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]"
      >
        <path
          d="M7 20V4L17 20V4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="flex flex-col leading-none">
        <span className="font-headline text-sm font-bold text-white">
          NEON LED
        </span>
        <span className="font-headline text-xs font-bold text-primary">
          PUBLICIDAD
        </span>
      </div>
    </div>
  );
}
