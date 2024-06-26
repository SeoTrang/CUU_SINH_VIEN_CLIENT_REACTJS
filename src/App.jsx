import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast'
import { socket } from './sockets/socket';
import axios from 'axios';
// import io from "socket.io-client";

import './App.css'
import './output.css'
import RootRoutes from './routes/RootRoutes'
import userAPI from './services/api/userAPI';

import { io } from 'socket.io-client';

const URL = "ws://localhost:8080/"; // Đảm bảo rằng URL ở đây phù hợp với cấu hình trong server.js


// const socket = io.connect("http://localhost:5000");
function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const [fooEvents, setFooEvents] = useState([]);

  const user = useSelector((state) => state.user.user);

  useEffect(()=>{
      socket.emit('user-info',user)
  },[user])

  const [isConnectedWS, setIsConnectedWS] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(URL);

    socket.onopen = () => {
      setIsConnectedWS(true);
      // Gửi mã người dùng khi kết nối thành công
      socket.send(JSON.stringify({ type: 'user-info', data: "trang" }));
    };

    socket.onclose = () => {
      setIsConnectedWS(false);
    };

    return () => {
      socket.close();
    };
  }, []);

  // useEffect(() => {
  //   async function fetchData(){
  //     let result = null;
  //     await axios.get(' https://4602-2402-800-613e-36d3-607c-8d97-da91-c4cd.ngrok-free.app/api/all-address',{
  //       headers:{
  //         'ngrok-skip-browser-warning': 'true'
  //       }
  //     })
  //     .then(respon => {
  //       console.log(respon);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
    
  //   }

  //   fetchData();
  // },[])

  return (
    <>
      <RootRoutes/>
      <Toaster 
        toastOptions={{
            success: {
              style: {
                background: '#31B757',
                color: '#FFF',
              },
            },
            error: {
              style: {
                background: 'red',
                color: '#FFF',
              },
            },
          }}
      />
    </>
  )
}

export default App
