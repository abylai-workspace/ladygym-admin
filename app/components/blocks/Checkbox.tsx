// Checkbox.tsx

import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, View, Text } from 'react-native';



const CheckMark = styled(View)`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  margin: 2px;
  background-color: aliceblue;
`;

const Container=styled.View`
    border: 1px solid #ccc;
    width: 24px;
    height: 24px;
    border-radius: 4px;
`


interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({  checked, onChange }) => {
  const handleCheckChange = () => {
    onChange(!checked);
  };

  return (
    <TouchableOpacity onPress={handleCheckChange}>
      <Container>
        {checked && (<CheckMark checked={checked} />)}   
      </Container>
    </TouchableOpacity>
  );
};

export default Checkbox;
