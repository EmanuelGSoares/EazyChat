import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { FiUser, FiLock } from 'react-icons/fi';

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
      <LoginForm onSubmit={handleSubmit}>
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

 