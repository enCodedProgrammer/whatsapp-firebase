import React, {useState, useEffect} from 'react'
import {Avatar, IconButton} from "@material-ui/core"
import "./SidebarChat.css"
import {Link} from "react-router-dom"
import db from "./firebase"

const SidebarChat = ({ id, name }) => {

  const [messages, setMessages] = useState([])

  useEffect(() => {
      if (id) {
          db.collection("rooms").doc(id).collection("messages")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) =>
          doc.data()
        ))
      );
      }
  }, [id])

    return (
        <div className="sidebarChat">

        <Link to= {`/rooms/${id}`} >
          <div className="sidebarChat-info">
            <div className="sidebarChat-left">
              <IconButton>
              <Avatar />
              </IconButton>
              </div>
            <div className="sidebarChat-right">

            <h3> {name} </h3>
            <p> {messages[0]?.message} </p>
          </div>
        </div>
        </Link>
        </div>
    )
}

export default SidebarChat
