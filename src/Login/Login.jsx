import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Background = styled.div`
    background-color: #6d1d20;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: #f2f2f2;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const InputIcon = styled.span`
  margin-right: 10px;
`;

const Input = styled.input`
  padding: 10px;
  width: 250px;
  border: none;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #73272a;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;


const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 10px;
`;

const Login_univ = styled.div`
    width: 400px;
    height: 250px;
    border-width: 20px;
`;