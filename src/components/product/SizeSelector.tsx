'use client';

import { cn } from '@/lib/utils';

interface SizeSelectorProps {
  sizes: string[];
  selected: string;
  onChange: (size: string) => void;
}

export default function SizeSelector({ sizes, selected, onChange }: SizeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onChange(size)}
          className={cn(
            'min-w-[48px] h-12 px-3 rounded-lg border-2 text-sm font-semibold font-body transition-all',
            selected === size
              ? 'border-accent-gold bg-accent-gold/10 text-brand-black'
              : 'border-brand-graphite/15 text-brand-graphite hover:border-brand-graphite/40'
          )}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
