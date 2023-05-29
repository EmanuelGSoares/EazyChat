import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { FiUser, FiLock } from 'react-icons/fi';
import { styles } from '../styles/style';


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
    <styles.Background>
    <styles.Login_univ>
        <img className="login-univ" src={'http://images.educamaisbrasil.com.br/content/superior/instituicao/logo/g/universidade-de-vassouras.png'} alt="avatar" />
    </styles.Login_univ>
    <styles.Container>
      <styles.LoginForm onSubmit={handleLogin}>
        <styles.InputWrapper>
          <styles.InputIcon>
            <FiUser />
          </styles.InputIcon>
          <styles.Input
            type="email"
            placeholder="Email Institucional"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </styles.InputWrapper>
        <styles.InputWrapper>
          <styles.InputIcon>
            <FiLock />
          </styles.InputIcon>
          <styles.Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </styles.InputWrapper>
        <styles.Button type="submit">Entrar</styles.Button>
      </styles.LoginForm>
    </styles.Container>
    </styles.Background>
  );
  }

 