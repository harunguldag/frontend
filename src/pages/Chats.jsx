import '../styles/chats2.css';
import { useState, useEffect, useRef } from "react";
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { useWebSocket } from '../components/socket';
import api from '../api';

function Chats() {

    const [sendingMessage, setsendingMessage] = useState("");
    const { user, setUser } = useContext(UserContext);
    const [letScroll, setLetScroll] = useState(true);
    const { socket } = useWebSocket();
    const messageEndRef = useRef(null);
    const active_id = user.active;
    const [activeUser, setActiveUser] = useState(user.dialogues.find((dialogue) => dialogue.id === active_id) || {});
    const [isChatboxVisible, setIsChatboxVisible] = useState(false);
    const [searchlist, setSearchlist] = useState(user.dialogues);
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        setSearch(e);
        if (e === "") {
            setSearchlist(user.dialogues);
        } else {
            setSearch(e);
        }
    };

    useEffect(() => {
        setSearchlist(
            user.dialogues.filter((dialogue) =>
                dialogue.username.toLowerCase().startsWith(search.toLowerCase())
            )
        );
        // eslint-disable-next-line
    }, [search]);

    const showChatbox = () => setIsChatboxVisible(true);
    const hideChatbox = () => { setIsChatboxVisible(false); setActiveUser({}); };

    const isoDate = (date) => {
        const dateObj = new Date(date);
        return `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}`
    }

    const scrollToBottom = () => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    function is_include() {
        try {
            if (user.messages.filter(msg => msg.sender === activeUser.id || msg.receiver === activeUser.id).length < 30) {
                return false;
            }
            let u = user.last.filter(msg => msg.sender === activeUser.id || msg.receiver === activeUser.id)[0].id;
            user.messages.filter(msg => msg.sender === activeUser.id || msg.receiver === activeUser.id).forEach(element => {
                if (element.id === u) {
                    return true;
                }
                else {
                    return false;
                }
            });
        } catch (error) {
            return true;
        }
    }

    function delete_notification() {
        setUser(prevUser => ({
            ...prevUser,
            notifications: [...prevUser.notifications.filter(element => element !== activeUser.id)]
        }));
        if (socket && (activeUser.id)) {
            sendNotification();
        }
    }

    useEffect(() => {
        if (letScroll && user.messages.length > 0 && (user.messages[user.messages.length - 1].sender === activeUser.id || user.messages[user.messages.length - 1].sender === user.id)) {
            scrollToBottom();
        }
        setLetScroll(true);
        if (activeUser.id) {
            sendNotification();
        }
        setSearchlist(
            user.dialogues.filter((dialogue) =>
                dialogue.username.toLowerCase().startsWith(search.toLowerCase())
            )
        );
        // eslint-disable-next-line
    }, [user]);

    useEffect(() => {
        user.active = activeUser.id;
        delete_notification();
        scrollToBottom();
        // eslint-disable-next-line
    }, [activeUser]);

    const sendMessage = (message, receiver) => {
        socket.send(JSON.stringify({
            field: "message",
            message: message,
            receiver: receiver
        }));
    };

    const send = () => {
        if (sendingMessage.trim() === "") {
            setsendingMessage("");
            return;
        }
        sendMessage(sendingMessage, activeUser.id);
        setsendingMessage("");
    };

    function handleActiveUser(id) {
        // onClick={(e) => { e.preventDefault(); ; }}
        showChatbox()
        let active = user.dialogues.find((user) => user.id === id);
        setUser(prevUser => ({
            ...prevUser,
            notifications: [...prevUser.notifications.filter(element => element !== activeUser.id)]
        }));
        setActiveUser(active);
    }

    function render_messages(message) {
        if (Object.keys(activeUser).length === 0) {
            return
        }
        if (message.sender === activeUser.id || (message.sender === user.id && message.receiver === activeUser.id)) {
            return (

                <li key={message.id} className={message.sender === user.id ? 'repaly' : 'sender'}>
                    <p>{message.text}</p>
                    <span className="time">{isoDate(message.date)}</span>
                </li>
            )
        }
    }

    const get_more_messages = () => {
        socket.send(JSON.stringify({
            field: "more_messages",
            other_user: activeUser.id,
            message_count: user.messages.filter(msg => msg.sender === activeUser.id || msg.receiver === activeUser.id).length
        }));
        setLetScroll(false)
    };

    //! bildirim olmasa da gönderiyor 
    const sendNotification = () => {
        // socket.send(JSON.stringify({
        //     field: "notificaiton",
        //     id: activeUser.id
        // }));
    };

    const remove_block = async () => {
        const res = await api.post('api/dialogue_spam/', { spam: false, id: activeUser.id });
        if (res.status === 200) {
            hideChatbox();
            setUser(prevUser => ({
                ...prevUser,
                dialogues: prevUser.dialogues.map(dialogue => {
                    if (dialogue.id === activeUser.id) {
                        return { ...dialogue, spam: false }
                    }
                    return dialogue;
                })
            }));
        }
    }

    const block = async () => {
        const res = await api.post('api/dialogue_spam/', { spam: true, id: activeUser.id });
        if (res.status === 200) {
            hideChatbox();
            setUser(prevUser => ({
                ...prevUser,
                dialogues: prevUser.dialogues.map(dialogue => {
                    if (dialogue.id === activeUser.id) {
                        return { ...dialogue, spam: true }
                    }
                    return dialogue;
                })
            }));
        }
    }

    return (<>
        <div className="chats">

            <section className="message-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="chat-area">

                                {/* left side */}
                                <div className="chatlist">
                                    <div className="modal-dialog-scrollable">
                                        <div className="modal-content">

                                            {/* chat header */}
                                            <div className="chat-header">

                                                {/* search user */}
                                                <div className="msg-search">
                                                    <input type="text" onChange={(e) => handleSearch(e.target.value)} className="form-control" id="inlineFormInputGroup" placeholder="Search" aria-label="search" />
                                                </div>

                                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                    <li className="nav-item" role="presentation">
                                                        <button style={{ borderRadius: "0" }} className="nav-link active" id="Open-tab" data-bs-toggle="tab" data-bs-target="#Open" type="button" role="tab" aria-controls="Open" aria-selected="true">Chats</button>
                                                    </li>
                                                    <li className="nav-item" role="presentation">
                                                        <button style={{ borderRadius: "0" }} className="nav-link" id="Closed-tab" data-bs-toggle="tab" data-bs-target="#Closed" type="button" role="tab" aria-controls="Closed" aria-selected="false">Blocked</button>
                                                    </li>
                                                </ul>
                                            </div>

                                            {/* users list */}
                                            <div className="modal-body">
                                                <div className="chat-lists">
                                                    <div className="tab-content" id="myTabContent">

                                                        {/*chats*/}
                                                        <div style={{ borderRadius: "0", backgroundColor: "white" }} className="tab-pane fade show active" id="Open" role="tabpanel" aria-labelledby="Open-tab">
                                                            <div className="chat-list">

                                                                {searchlist.map((users) => {
                                                                    if (users.spam === false) {

                                                                        return (
                                                                            // eslint-disable-next-line
                                                                            <a key={users.id} onClick={() => handleActiveUser(users.id)} className={`d-flex align-items-center  ${activeUser.id === users.id ? 'act' : ''}`}>
                                                                                <div className="flex-shrink-0">
                                                                                    <div className="col-sm-3 col-xs-3 sideBar-avatar">
                                                                                        <div className="avatar-icon">
                                                                                            <img src={users.pp} alt='as' />
                                                                                        </div>
                                                                                    </div>
                                                                                    {/* <span className="active"></span> */}
                                                                                </div>
                                                                                <div className="flex-grow-1 ms-3">
                                                                                    <h3>{users.username}</h3>
                                                                                    <p>                                                                {
                                                                                        (() => {
                                                                                            if (activeUser.id === users.id) {
                                                                                                return null;
                                                                                            }
                                                                                            let l = user.notifications.filter(element => element === users.id).length;
                                                                                            if (l > 0) {
                                                                                                return `${l} new message`;
                                                                                            } else {
                                                                                                return null;
                                                                                            }
                                                                                        })()
                                                                                    }</p>
                                                                                </div>
                                                                            </a>
                                                                        )
                                                                    }
                                                                    else {
                                                                        return null;
                                                                    }
                                                                })}
                                                            </div>
                                                        </div>

                                                        {/*blocked chats*/}
                                                        <div style={{ borderRadius: "0", backgroundColor: "white" }} className="tab-pane fade" id="Closed" role="tabpanel" aria-labelledby="Closed-tab">
                                                            <div className="chat-list">
                                                                {searchlist.map((users) => {
                                                                    if (users.spam === true) {

                                                                        return (
                                                                            // eslint-disable-next-line
                                                                            <a key={users.id} onClick={() => handleActiveUser(users.id)} className={`d-flex align-items-center  ${activeUser.id === users.id ? 'act' : ''}`}>
                                                                                <div className="flex-shrink-0">
                                                                                    <div className="col-sm-3 col-xs-3 sideBar-avatar">
                                                                                        <div className="avatar-icon">
                                                                                            <img src={users.pp} alt='as' />
                                                                                        </div>
                                                                                    </div>
                                                                                    {/* <span className="active"></span> */}
                                                                                </div>
                                                                                <div className="flex-grow-1 ms-3">
                                                                                    <h3>{users.username}</h3>
                                                                                    <p>                                                                {
                                                                                        (() => {
                                                                                            if (activeUser.id === users.id) {
                                                                                                return null;
                                                                                            }
                                                                                            let l = user.notifications.filter(element => element === users.id).length;
                                                                                            if (l > 0) {
                                                                                                return `${l} new message`;
                                                                                            } else {
                                                                                                return null;
                                                                                            }
                                                                                        })()
                                                                                    }</p>
                                                                                </div>
                                                                            </a>
                                                                        )
                                                                    } else {
                                                                        return null;
                                                                    }
                                                                })}

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                {/* right side */}
                                <div className={`chatbox ${isChatboxVisible ? 'showbox' : ''}`}>
                                    <div className="modal-dialog-scrollable">

                                        {Object.keys(activeUser).length === 0 ? <></>
                                            :
                                            <div className="modal-content">

                                                {/* messages header */}
                                                <div className="msg-head">
                                                    <div className="row">
                                                        <div className="col-8">
                                                            <div className="d-flex align-items-center">

                                                                {/* back button for phone */}
                                                                <span className="chat-icon"><img onClick={(e) => { e.preventDefault(); hideChatbox(); }} className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/arroleftt.svg" alt='blank' /></span>

                                                                {/* avatar */}
                                                                <div>
                                                                    <div className="col-sm-3 col-xs-3 sideBar-avatar">
                                                                        <div className="avatar-icon">
                                                                            <img src={activeUser.pp} alt='as' />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* username */}
                                                                <div className="flex-grow-1 ms-3">
                                                                    <a href={activeUser.username}>
                                                                        <h3>{activeUser.username}</h3>
                                                                    </a>
                                                                    {/* <p>text</p> */}
                                                                </div>

                                                                {/* spam */}
                                                                <div className="flex-grow-1 ms-3">
                                                                    {user.dialogues.find((dialogue) => dialogue.id === activeUser.id).spam === true ?
                                                                        <strong style={{ color: "green" }} onClick={remove_block}>Unblock</strong>
                                                                        :
                                                                        <strong style={{ color: "red" }} onClick={block}>Block</strong>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* messages */}
                                                <div className="modal-body">
                                                    <div className="msg-body">
                                                        <ul>
                                                            {is_include() ?
                                                                <div className="row message-previous">
                                                                    <div className="col-sm-12 previous">
                                                                        <button id="ankitjain28" name="20" onClick={get_more_messages} style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                                                                            Show Previous Message!
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <></>
                                                            }
                                                            {user.messages.map((message) => render_messages(message))}
                                                            <div ref={messageEndRef} />
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/* send message */}
                                                <div className="send-box">
                                                    {activeUser.spam === true ?
                                                        <></>
                                                        :
                                                        <form action="">
                                                            <input required type="text" onChange={(e) => setsendingMessage(e.target.value)} value={sendingMessage} className="form-control" aria-label="message…" placeholder="Write message…" />

                                                            <button onClick={send} type="button"><i className="fa fa-paper-plane " aria-hidden="true"></i> Send</button>
                                                        </form>
                                                    }
                                                </div>
                                            </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>);
}
export default Chats;