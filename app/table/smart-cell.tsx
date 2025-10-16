import { useEffect, useRef, useState } from "react";
import { Payment } from "./columns";

export const SmartCell = ({
  row,
  valueToGenerate,
  currentValue,
  onValueGenerated,
}: {
  row: Payment;
  valueToGenerate: string | null;
  currentValue: string | null;
  onValueGenerated: (rowId: string, columnId: string, value: string) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  // Track if generation has been initiated to prevent duplicate calls
  const hasStartedGenerating = useRef(false);

  // Generate value only when currentValue is null and we haven't started generating yet
  useEffect(() => {
    const generateValue = async () => {
      hasStartedGenerating.current = true;
      setIsLoading(true);

      await fetch("/api/completion", {
        method: "POST",
        body: JSON.stringify({
          prompt: `the current row data for this entry is:
          
          <row>${JSON.stringify(row)}</row>
          
          <column>${valueToGenerate}</column>
          
          generate a new value for this cell.`,
        }),
      })
        .then((response) => {
          response.json().then((json) => {
            // Update the parent component with the generated value
            onValueGenerated(row.id, valueToGenerate || "", json.value);
            setIsLoading(false);
          });
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
          hasStartedGenerating.current = false; // Reset on error to allow retry
        });
    };

    if (currentValue === null && !hasStartedGenerating.current) {
      generateValue();
    }
  }, [currentValue, row, valueToGenerate, onValueGenerated]);

  if (currentValue === null && !isLoading) {
    return <div>-</div>;
  }

  if (isLoading) {
    return (
      <div className="absolute inset-0 animate-pulse bg-gray-100  duration-300" />
    );
  }

  return <div>{currentValue}</div>;
};
