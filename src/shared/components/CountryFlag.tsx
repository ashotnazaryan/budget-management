import * as React from 'react';
import ReactCountryFlag, { ReactCountryFlagProps } from 'react-country-flag';
import { CountryCode } from 'shared/models';

export type CountryFlagProps = { code: CountryCode } & Omit<ReactCountryFlagProps, 'countryCode'>;

const CountryFlag: React.FC<CountryFlagProps> = ({ code, ...props }) => {
  return (
    <ReactCountryFlag
      {...props}
      svg
      countryCode={code}
      style={{
        fontSize: 24,
        lineHeight: 24,
      }}
    />
  );
};

export default CountryFlag;
