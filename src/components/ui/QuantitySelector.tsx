import { useState } from "react";

interface QuantitySelectorProps {
  value: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  onChange,
  min = 1,
  max,
  className = "",
}) => {
  const handleIncrease = () => {
    const newValue = value + 1;
    if (max === undefined || newValue <= max) {
      onChange(newValue);
    }
  };

  const handleDecrease = () => {
    const newValue = value - 1;
    if (newValue >= min) {
      onChange(newValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && (max === undefined || newValue <= max)) {
      onChange(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      handleIncrease();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      handleDecrease();
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={handleDecrease}
        disabled={value <= min}
        className="flex items-center justify-center w-8 h-8 bg-[#252320] border border-[#E8C168]/50 rounded-lg text-[#E8C168] hover:bg-[#E8C168]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease quantity"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>

      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        min={min}
        max={max}
        className="w-16 px-2 py-2 bg-[#252320] text-white border border-[#E8C168]/50 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-[#E8C168] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        aria-label="Quantity"
      />

      <button
        type="button"
        onClick={handleIncrease}
        disabled={max !== undefined && value >= max}
        className="flex items-center justify-center w-8 h-8 bg-[#252320] border border-[#E8C168]/50 rounded-lg text-[#E8C168] hover:bg-[#E8C168]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Increase quantity"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default QuantitySelector;

/*
Example usage in a product page:

import QuantitySelector from "@/components/ui/QuantitySelector";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Add to cart logic with quantity
    console.log(`Adding ${quantity} items to cart`);
  };

  return (
    <div>
      <QuantitySelector
        value={quantity}
        onChange={setQuantity}
        min={1}
        max={10} // optional stock limit
      />
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-[#E8C168] text-[#1A1917] px-6 py-3 rounded-lg font-bold uppercase tracking-[0.18em]"
      >
        Add to Cart
      </button>
    </div>
  );
};
*/