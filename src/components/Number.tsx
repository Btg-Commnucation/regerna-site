import { useEffect, useState } from "react";

const NumberComponant = ({
  number,
  index,
}: {
  number: { [key: string]: string };
  index: number;
}) => {
  const [numberToDisplay, setNumberToDisplay] = useState<number>(0);
  const newNumber = Number(number.number);

  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      if (i < Math.floor(newNumber)) {
        i++;
        setNumberToDisplay(i);
      } else {
        clearInterval(intervalId);
        setNumberToDisplay(newNumber);
      }
    }, 500);
  }, [newNumber]);

  return (
    <>
      <li key={`number-${index}`}>
        <strong>
          {number.currency.length > 0 && (
            <span className="currency">{number.currency}</span>
          )}
          {numberToDisplay}
          {number.unit.length > 0 && (
            <span className="unit">{number.unit}</span>
          )}
        </strong>
        <p>{number.objective}</p>
      </li>
      <li className="separator"></li>
    </>
  );
};

export default NumberComponant;
