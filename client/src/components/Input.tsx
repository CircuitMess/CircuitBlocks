import React from 'react';
import styled from 'styled-components';

interface InputProps {
  onChange: () => void;
  value: string | number;
  name: string;
  type: 'text' | 'email' | 'password';
  error: string | null;
}

const StyledInput = styled.input``;

const Input = (props: InputProps) => {
  return <StyledInput {...props} />;
};
