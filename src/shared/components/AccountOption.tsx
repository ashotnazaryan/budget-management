import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'core/i18n';
import { Account } from 'shared/models';
import Balance from 'shared/components/Balance';

interface AccountOptionProps {
  data: Account;
}

const AccountOption: React.FC<AccountOptionProps> = ({ data }) => {
  const { name, nameKey, balance } = data;
  const { t } = useTranslation();

  return (
    <>
      <Typography>{nameKey ? t(nameKey) : name}</Typography>
      <Balance balance={balance} />
    </>
  );
};

export default AccountOption;
