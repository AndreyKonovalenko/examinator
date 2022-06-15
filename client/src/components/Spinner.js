import { SpinnerDiamond } from 'spinners-react';
import { SpinnerStyled } from './styles/Spinner.styled';
import theme from '../theme/index';

export default function Spinner() {
  return (
    <SpinnerStyled>
      <SpinnerDiamond
        color={theme.colors.primary.main}
        secondaryColor={theme.colors.primary.light}
        size={35}
      />
    </SpinnerStyled>
  );
}
