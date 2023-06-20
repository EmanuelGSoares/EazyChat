import React, { useState, useEffect, useRef } from "react";
import Api from "../../Api";
import MessageItem from "../MessageItem/MessageItem";
import SendIcon from '@material-ui/icons/Send';

export default ({ user, data }) => {
  const inputQuestionRef = useRef(null);
  const resultRef = useRef(null);
  const [result, setResult] = useState("");
  const [text, setText] = useState('');
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const [inputQuestion, setInputQuestion] = useState("");
  const [chatResponse, setChatResponse] = useState('');
  const [inputQuestionDisabled, setInputQuestionDisabled] = useState(false);

  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY || "";

  useEffect(() => {
    setList([]);
    let unsub = Api.onChatContent(data.chatId, setList, setUsers);
    return unsub;
  }, [data.chatId]);

  const sendQuestion = () => {
    const sQuestion = inputQuestionRef.current.value;
    
    if (text !== '') {
      //console.log(user);
      Api.sendMessageChatGPT(data, user.uid, 'text', text, users);
      setText('');
    }

    fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + OPENAI_API_KEY,
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: sQuestion,
          max_tokens: 2048,
          temperature: 0.5,
        }),
      })
        .then((response) => response.json())
        .then((json) => { 
          if (result) {
              setResult(result + "\n");
            }
            
            if (json.error?.message) {
            setResult(result + `Error: ${json.error.message}`);
        } else if (json.choices?.[0].text) {
            const text = json.choices[0].text || "Sem resposta";
            //setResult(result + "Chat GPT: " + text);

            var userbkp = users[0]
            users[0] = users[1]
            users[1] = userbkp

            if (text !== '') {
                //console.log(user);
                Api.sendMessageChatGPT(data, 'chatgpt', 'text', text, users);
                setText('');
              }
            
            //console.log("Texto do ChatGPT:", text);
          }
          
          resultRef.current.scrollTop = resultRef.current.scrollHeight;
        })
        .catch((error) => console.error("Error:", error))
        .finally(() => {
          setInputQuestion("");
          setInputQuestionDisabled(false);
          inputQuestionRef.current.focus();
        });
  
      if (result) {
        setResult(result + "\n\n\n");
      }
  
      setResult(result + `Eu: ${sQuestion}`);
      setInputQuestion("Carregando...");
      setInputQuestionDisabled(true);
  
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
  };

  const handleKeyPress = (e) => {
    if (inputQuestionRef.current.value && e.key === "Enter") sendQuestion();
  };

  return (
    <div className="chatWindow">
      <div className="chatWindow-header">
        <div className="chatWindow-header-info">
          <img className="chatWindow-avatar" src={data.image} alt="User Avatar" />
          <div className="chatWindow-name">{data.title}</div>
        </div>
      </div>
      <div ref={resultRef} className="chatWindow-body">
        {list.map((item, key) => (
          <MessageItem key={key} data={item} user={user} />
        ))}
       {/*  <textarea
            id="result"
            value={result}
            ref={resultRef}
            readOnly
        /> */}
      </div>
      <div className="chatWindow-footer">
        <div className="chatWindow-input-area">
          <input
            className="chatWindow-input"
            type="text"
            placeholder="Digite uma mensagem"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyUp={handleKeyPress}
            ref={inputQuestionRef}
            disabled={inputQuestionDisabled}
          />
        </div>
        <div className="chatWindow-pos">
          <div className="chatwindow-btn" onClick={sendQuestion}>
            <SendIcon style={{ color: "#111" }} />
          </div>
        </div>
      </div>
    </div>
  );
};
