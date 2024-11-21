import React from "react";

const ButtonArea = ({
  nextButtonText,
  onSubmit,
  cancelButtonText,
  onCancel,
  className,
}: {
  nextButtonText: string;
  onSubmit: any;
  cancelButtonText?: string;
  onCancel?: any;
  className?: string;
}) => {
  return (
    <div className={`responsive_flex items-center gap-4 ${className}`}>
      {cancelButtonText && (
        <button
          onClick={() => {
            onCancel && onCancel();
          }}
          className="text-lg py-2 border border-gentle-light rounded-md hover:bg-gentle-light w-[120px]"
        >
          {cancelButtonText}
        </button>
      )}
      <button
        onClick={() => {
          onSubmit();
        }}
        className="text-lg py-2 rounded-md bg-primary text-white w-[200px]"
      >
        {nextButtonText}
      </button>
    </div>
  );
};

export default ButtonArea;
