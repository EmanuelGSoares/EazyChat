import React, { useState } from 'react';
import './DropDown.css';
import { auth, firestore } from '../../firebase/firebase';

import MoreVertIcon from '@material-ui/icons/MoreVert';

const Dropdown = ({ handleLogoff }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={handleToggle}>
        <MoreVertIcon style={{ color: '#919191' }} />
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li onClick={handleItemClick}>Mensagens Favoritas</li>
          <li onClick={handleItemClick}>Configurações</li>
          <li onClick={handleLogoff}>Sair</li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;