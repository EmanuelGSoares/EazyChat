import React, { useState, useEffect } from "react";
import { auth, firestore } from './firebase/firebase';
import './App.css';
import Api from './Api';

import ChatList from "./components/ChatList/ChatList";
import ChatIntro from './components/ChatIntro/ChatIntro';
import ChatWindow from './components/ChatWindow/ChatWindow';
import NewChat from './components/NewChat/NewChat';
import DropDown from './components/DropDown/DropDown';
import Login from './Login/Login';

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

export default () => {
    const [chatList, setChatList] = useState([]);
    const [activeChat, setActiveChat] = useState({});
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const db = firestore;

    const [showNewChat, setShowNewChat] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);

    useEffect(() => {

        if (user !== null) {
            let unsub = Api.onChatList(user.id, setChatList);
            return unsub;
        }
    }, [user]);

    const handleNewChat = () => {
        setShowNewChat(true);
    }
    const handleDropDown = () => {
        setShowDropDown(true);
    }

    const handleLogoff = () => {
        auth.signOut().then(() => {
          // O usuário foi deslogado com sucesso
          setUser(null);
        }).catch((error) => {
          // Ocorreu um erro ao deslogar o usuário
          console.log(error);
        });
      };

    const handleLoginData = async () => {
        
        const u = auth.currentUser;
        //console.log(u.uid);
        const users = db.collection('users').doc(u.uid);

        try {
            const docSnapshot = async () => users.get();
            if (docSnapshot.exists) {
                const userData = docSnapshot.data();
                setUser(auth.currentUser);
                setUserData(userData);
            } else {
                let newUser = {
                    id: u.uid,
                    name: 'Emanuel',
                    avatar: 'https://filestore.community.support.microsoft.com/api/images/6061bd47-2818-4f2b-b04a-5a9ddb6f6467?upload=true&fud_access=wJJIheezUklbAN2ppeDns8cDNpYs3nCYjgitr%2BfFBh2dqlqMuW7np3F6Utp%2FKMltnRRYFtVjOMO5tpbpW9UyRAwvLeec5emAPixgq9ta07Dgnp2aq5eJbnfd%2FU3qhn5498QChOTHl3NpYS7xR7zASsaF20jo4ICSz2XTm%2B3GDR4XitSm7nHRR843ku7uXQ4oF6innoBxMaSe9UfrAdMi7owFKjdP9m1UP2W5KAtfQLNQqewpIgNm8TVO4GO5v9sGqgqs3xWAuztC7LdeU1uK5MlYEg4tcMW8ax1kJeEuI7GF14QRdq%2FnahToC7uRfuyqXfrNDVU7TRYmeyQhkHZT14xQvDhOtAZUQgwPgSV7MB6sMVflnWvNdZwHEoyGCL5RTFCjNBO8WpT8zO%2FezZLj5Dhv6zUWQ2NOD%2FWlC5hpi%2Bw%3D'
                };
    
                await Api.addUser(newUser);
                setUser(newUser);
                setUserData(newUser);
            }
        } catch (error) {
            console.log("Error getting document:", error);
        }
    };

    if (user === null) {
        return (<Login onReceive={handleLoginData} />);
    }
    return (
        <div className="app-window">
            <div className="sidebar">
                <NewChat
                    chatList={chatList}
                    user={user}
                    show={showNewChat}
                    setShow={setShowNewChat}
                />
                
                <header>
                    <img className="header-avatar" src={userData.avatar} alt="avatar" />
                    <span className="nome-usuario"> { userData.name } </span>
                    <div className="header-buttons">
                        <div onClick={handleNewChat} className="header-btn">
                            <ChatIcon style={{ color: '#919191' }} />
                        </div>
                        <div onClick={handleDropDown} className="header-btn">
                            <DropDown
                                 handleLogoff={handleLogoff}
                                chatList={chatList}
                                user={user}
                                show={showDropDown}
                                setShow={setShowDropDown}
                            />
                        </div>
                    </div>
                </header>
                <div className="search">
                    <div className="search-input">
                        <SearchIcon fontSize="small" style={{ color: '#919191' }} />
                        <input type="search" placeholder="Procurar ou começar uma nova conversa" />
                    </div>
                </div>
                <div className="chatlist">
                    {chatList.map((item, key) => (
                        <ChatList
                            key={key}
                            data={item}
                            active={activeChat.chatId === chatList[key].chatId}
                            onClick={() => setActiveChat(chatList[key])}
                        />
                    ))}
                </div>
            </div>
            <div className="contentarea">
                {activeChat.chatId !== undefined &&
                    <ChatWindow
                        user={user}
                        data={activeChat}
                    />}
                {activeChat.chatId === undefined && <ChatIntro />}
            </div>
        </div>
    );
}