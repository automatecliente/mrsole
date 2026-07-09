'use client';

import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export default function QuantitySelector({ value, min = 1, max = 10, onChange }: QuantitySelectorProps) {
  return (
    <div className="flex items-center border-2 border-brand-graphite/15 rounded-lg overflow-hidden w-fit">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-12 h-12 flex items-center justify-center hover:bg-brand-sand transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Diminuir quantidade"
      >
        <Minus size={16} />
      </button>
      <span className="w-12 h-12 flex items-center justify-center font-bold text-brand-black font-body border-x-2 border-brand-graphite/15">
        {value}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-12 h-12 flex items-center justify-center hover:bg-brand-sand transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Aumentar quantidade"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
