import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';

interface CurrencyInputProps {
  value: number; // cents
  onChange: (cents: number) => void;
  placeholder?: string;
  id?: string;
}

export function CurrencyInput({ value, onChange, placeholder = '0,00', id }: CurrencyInputProps) {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    if (value > 0) {
      setDisplay((value / 100).toFixed(2).replace('.', ','));
    } else {
      setDisplay('');
    }
  }, [value]);

  function handleChange(raw: string) {
    const digits = raw.replace(/\D/g, '');
    if (digits === '') {
      setDisplay('');
      onChange(0);
      return;
    }
    const cents = parseInt(digits, 10);
    const formatted = (cents / 100).toFixed(2).replace('.', ',');
    setDisplay(formatted);
    onChange(cents);
  }

  return (
    <div className="relative">
      <span className="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 text-sm">
        R$
      </span>
      <Input
        id={id}
        type="text"
        inputMode="numeric"
        className="pl-9"
        placeholder={placeholder}
        value={display}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
