import styled from "styled-components";

export const AuthWrapper = styled.div`
  padding: 128px 0;
  background: #010519;
  min-height: 892px;
  height: 100%;
  max-width: 435px;
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 32px;
  text-align: center;
  bnack
`;

export const InputWrapper = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  border-radius: 4px;
  background: #ffffff0a;
  border: 1px solid #ffffff08;
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.64);
  min-height: 40px;
  outline: none;
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  &:disabled {
    color: rgba(255, 255, 255, 0.2);
    border-color: transparent;
  }
`;
