import React, { useState } from 'react';
import { auth } from '../firebase/firebase';

export default ({ onReceive }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
  
    const handleLogin = (e) => {
      e.preventDefault();
  
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
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );

};
 