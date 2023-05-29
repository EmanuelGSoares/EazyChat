import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { FiUser, FiLock } from 'react-icons/fi';
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


export default ({ onReceive }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState('');
  
    const handleLogin = (e) => {
      e.preventDefault();

      if (email === 'user@example.com' && password === 'password') {
        setError('');
        // Redirecionar ou executar ação desejada
      } else {
        setError('Credenciais inválidas. Tente novamente.');
      }
  
      auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // O usuário foi autenticado com sucesso
          const user = userCredential.user;
          setLoggedIn(true);
          return user;
        })
        .catch((error) => {
          // Ocorreu um erro durante a autenticação
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
        
    }
    if (loggedIn) {
        onReceive(handleLogin);

};
  
return (
    <Background>
    <Login_univ>
        <img className="login-univ" src={'http://images.educamaisbrasil.com.br/content/superior/instituicao/logo/g/universidade-de-vassouras.png'} alt="avatar" />
    </Login_univ>
    <Container>
      <LoginForm onSubmit={handleLogin}>
        <InputWrapper>
          <InputIcon>
            <FiUser />
          </InputIcon>
          <Input
            type="email"
            placeholder="Email Institucional"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputWrapper>
        <InputWrapper>
          <InputIcon>
            <FiLock />
          </InputIcon>
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputWrapper>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Entrar</Button>
      </LoginForm>
    </Container>
    </Background>
  );
  }

 