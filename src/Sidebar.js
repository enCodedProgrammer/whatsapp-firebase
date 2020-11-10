import React, {useState, useEffect} from 'react';
import "./Sidebar.css";
import DonutLargeIcons from "@material-ui/icons/DonutLarge";
import Chat from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import {Avatar, IconButton} from "@material-ui/core"
import SidebarChat from "./SidebarChat";
import db from "./firebase"
import {useStateValue} from "./StateProvider";


function Sidebar() {
  const [rooms, setRoom] = useState([])
  const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        db.collection('rooms').onSnapshot((snapshot)=> {
          setRoom(snapshot.docs.map((doc) =>
            ({
                id: doc.id,
                data: doc.data(),
          })
        ))
      })
    }, [])

    const createChat = () => {
      const roomName = prompt("Please enter name for new chat room");

    if (createChat) {
      db.collection("rooms").add({
        name: roomName,
      })
    }
  }

    return (
      <div className="sidebar">

        <div className="sidebar-header">

          <div className="sidebar-headerLeft">
              <IconButton>
              <Avatar src= {user?.photoURL} />
              </IconButton>
          </div>
          <div className="sidebar-headerRight">
          <IconButton >
          <DonutLargeIcons />
          </IconButton>
          <IconButton >
          <Chat />
          </IconButton>
          <IconButton >
          <MoreVertIcon />
          </IconButton>
          </div>

        </div>

        <div className="sidebar-search">

          <div className="sidebar-searchContainer">
            <IconButton>
            <SearchOutlined />
            </IconButton>
            <input type="text" placeholder="Search or start new chat"/>
          </div>

        </div>


        <div onClick= {createChat} className="addNewChat">
          <h2> Add New Chat </h2>
        </div>

        <div className="sidebar-chat">
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
        </div>
      </div>
    )
}

export default Sidebar
