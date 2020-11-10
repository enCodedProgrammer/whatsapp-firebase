import React, {useState, useEffect} from 'react'
import "./Chat.css"
import {MoreVert, AttachFile, InsertEmoticon, Mic} from "@material-ui/icons"
import SearchOutlined from "@material-ui/icons/SearchOutlined"
import {Avatar, IconButton} from "@material-ui/core"
import {useParams} from  "react-router-dom";
import db from "./firebase"
import firebase from "firebase"
import {useStateValue} from "./StateProvider"

function Chat() {

  const [input, setInput] = useState([]);
  const [roomName, setRoomName] = useState([]);
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  const {roomId} = useParams();

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typed", input);

    db.collection("rooms").doc(roomId).collection("messages").add ({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  }

  useEffect(() => {
    if (roomId) {
      db.collection("rooms").doc(roomId).onSnapshot((snapshot) =>
        setRoomName(snapshot.data().name))
    }
  }, [roomId]);




  useEffect(() => {
    if (roomId) {
      db.collection("rooms").doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()
      ))
      );
    }
  }, [roomId]);


    return (
        <div className="chat">

          <div className="chat-header">
            <div className="chatHeader-avatar">
              <IconButton>
              <Avatar />
              </IconButton>
            </div>
            <div className="chatHeader-info">
              <h3> {roomName} </h3>
              <p> last seen{" "}
              {new Date(
                messages[messages.length - 1] ?.
                timestamp?.toDate())
                .toUTCString()
              }
               </p>
            </div>

            <div className="chatHeader-icons">
              <IconButton>
              <SearchOutlined />
              </IconButton>
              <IconButton>
              <AttachFile />
              </IconButton>
              <IconButton>
              <MoreVert />
              </IconButton>

            </div>

          </div>

          <div className="chat-body">

          {messages.map((message) => (
            <p className= {`chat-message ${message.name === user.displayName && "chat-receiver"}`}>
              <span className="chat-name"> {message.name} </span>
                {message.message}
              <span className="chat-timestamp"> {new Date(message.timestamp ?.toDate()).toUTCString()} </span>
            </p>
          ))}
          </div>

          <div className="chat-footer">
          <IconButton>
            <InsertEmoticon />
          </IconButton>

            <form>
            <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message" />
            <button type= "submit" onClick={sendMessage}> Send Message </button>
            </form>

            <IconButton>
            <Mic />
            </IconButton>
          </div>

        </div>
    )
}

export default Chat
