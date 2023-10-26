// Button.tsx

import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

interface ButtonProps {
  active?: any;
  disabled?: boolean;
}

const StyledButton = styled(TouchableOpacity)<ButtonProps>`
  background-color: ${(props:any) => (props.active ? '#FFFFFF' : props.disabled ? 'rgba(255,255,255,0.3)' : '#fff')};
  padding: 15px 25px;
  margin:10px 20px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: ${(props:any) => (props?.active ? '#007AFF' : '#3651FE')};
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 500;
`;

interface ButtonComponentProps extends ButtonProps {
  label: string;
  onPress: () => void;
}

const SecondButtons: React.FC<ButtonComponentProps> = ({ label, active, disabled, onPress }) => {
  return (
    <StyledButton active={active} disabled={disabled} onPress={onPress}>
      <ButtonText active={active}>{label}</ButtonText>
    </StyledButton>
  );
};

export default SecondButtons;
