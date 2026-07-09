'use client';

import { ColorOption } from '@/types';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ColorSelectorProps {
  colors: ColorOption[];
  selected: string;
  onChange: (color: string) => void;
}

export default function ColorSelector({ colors, selected, onChange }: ColorSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((color) => (
        <button
          key={color.name}
          onClick={() => onChange(color.name)}
          className={cn(
            'relative w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center',
            selected === color.name
              ? 'border-accent-gold scale-110 shadow-md'
              : 'border-brand-graphite/20 hover:border-brand-graphite/50'
          )}
          style={{ backgroundColor: color.hex }}
          title={color.name}
        >
          {selected === color.name && (
            <Check
              size={16}
              className={cn(
                color.hex === '#FFFFFF' || color.hex === '#F5F0E8' || color.hex === '#FAF7F2'
                  ? 'text-brand-black'
                  : 'text-brand-white'
              )}
              strokeWidth={3}
            />
          )}
        </button>
      ))}
      {selected && (
        <span className="self-center text-sm text-brand-graphite/70 font-body ml-1">{selected}</span>
      )}
    </div>
  );
}
