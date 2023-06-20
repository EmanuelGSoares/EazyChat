import React, { useState, useEffect, useRef } from "react";

import Api from "../../Api";
import MessageItem from "../MessageItem/MessageItem";

import SendIcon from '@material-ui/icons/Send';

export default  ({user, data}) => {
    const inputQuestionRef = useRef(null);
    const resultRef = useRef(null);
    const [text, setText] = useState('');
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);
    const [chatResponse, setChatResponse] = useState('');

    const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY || "";

    useEffect(() => {
        setList([]);
        let unsub = Api.onChatContent(data.chatId, setList, setUsers);
        return unsub;
    }, [data.chatId]);



    const sendQuestion = () => {
        const sQuestion = inputQuestionRef.current.value;

        if (text !== '') {
            console.log(user)
            Api.sendMessage(data, user.uid, 'text', text, users);
            setText('');
        }

        fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + OPENAI_API_KEY,
        },
        resultRef: JSON.stringify({
            model: "text-davinci-003",
            prompt: sQuestion,
            max_tokens: 2048, // tamanho da resposta
            temperature: 0.5, // criatividade na resposta
        }),
        })
        .then((response) => response.json())
        .then((json) => {
            if (resultRef.current.value) resultRef.current.value += "\n";

            if (json.error?.message) {
            resultRef.current.value += `Error: ${json.error.message}`;
            } else if (json.choices?.[0].text) {
            const text = json.choices[0].text || "Sem resposta";
            resultRef.current.value += "Chat GPT: " + text;
            }

            resultRef.current.scrollTop = resultRef.current.scrollHeight;
        })
        .catch((error) => console.error("Error:", error))
        .finally(() => {
            inputQuestionRef.current.value = "";
            inputQuestionRef.current.disabled = false;
            inputQuestionRef.current.focus();
        });

        if (resultRef.current.value) resultRef.current.value += "\n\n\n";

        resultRef.current.value += `Eu: ${sQuestion}`;
        inputQuestionRef.current.value = "Carregando...";
        inputQuestionRef.current.disabled = true;

        resultRef.current.scrollTop = resultRef.current.scrollHeight;
    };

    const handleKeyPress = (e) => {
        if (inputQuestionRef.current.value && e.key === "Enter") sendQuestion();
    };

  return (
    <div className="chatWindow">
        <div className="chatWindow-header">

            <div className="chatWindow-header-info">
                <img className="chatWindow-avatar" src={data.image}></img>
                <div className="chatWindow-name">{data.title}</div>
            </div>

        </div>
        <div ref={resultRef} className="chatWindow-body">
                {list.map((item, key) => (
                    <MessageItem
                        key={key}
                        data={item}
                        user={user}
                    />
                ))}
        </div>
        <div className="chatWindow-footer">
            {/* <input
                id="inputQuestion"
                type="text"
                ref={inputQuestionRef}
                onKeyUp={handleKeyPress}
            /> */}
            <div className="chatWindow-input-area">
                <input
                    className="chatWindow-input"
                    type="text"
                    placeholder="Digite uma mensagem"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    /* onKeyUp={} */
                />
            </div>
            <div className="chatWindow-pos">
                    <div /* onClick={} */ className="chatwindow-btn">
                        <SendIcon style={{ color: '#111' }} />
                    </div>
            </div>
        </div>
    </div>
  );
};
