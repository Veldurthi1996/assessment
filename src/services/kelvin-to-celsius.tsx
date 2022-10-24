export const kelvinToCelsius = (kelvinValue: number = 0) => {
  return (
    <>
      {Math.round(kelvinValue - 273.15)}
      <sup>o</sup>
    </>
  );
};