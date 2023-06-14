import classNames from "classnames";
import React from "react";
type QuantityPickerProps = {
  min: number;
  max: number;
  quantity: number;
  setQuantity: any;
};
const QuantityPicker = ({
  min,
  max,
  quantity,
  setQuantity,
}: QuantityPickerProps) => {
  const increment = (e: any) => {
    e.stopPropagation();
    if (quantity >= max) return;
    setQuantity(quantity + 1);
  };

  const decrement = (e: any) => {
    e.stopPropagation();
    if (quantity <= min) return;
    setQuantity(quantity - 1);
  };

  const isDisabled = quantity <= min;
  const isDisabledMax = quantity >= max;

  const buttonStyle =
    "w-10 h-10 border text-2xl font-semibold rounded-full text-gray-400";

  const minButtonStyles = isDisabled
    ? "border-gray-200 text-gray-200 cursor-not-allowed"
    : "border-gray-400";
  const maxButtonStyles = isDisabledMax
    ? "border-gray-200 text-gray-200 cursor-not-allowed"
    : "border-gray-400";

  return (
    <div className="flex justify-center items-center gap-4">
      <button
        onClick={(e) => decrement(e)}
        className={`${buttonStyle} ${minButtonStyles}`}
      >
        -
      </button>
      <div className="w-4 text-center">{quantity}</div>
      <button
        onClick={(e) => increment(e)}
        className={`${buttonStyle} ${maxButtonStyles}`}
      >
        +
      </button>
    </div>
  );
};

export default QuantityPicker;
