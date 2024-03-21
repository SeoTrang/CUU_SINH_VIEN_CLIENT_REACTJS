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

// const socket = io.connect("http://localhost:5000");
function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  const user = useSelector((state) => state.user.user);

  useEffect(()=>{
      socket.emit('user-info',user)
  },[user])

  // useEffect(()=>{
  //    async function fetchApi(){
  //       const friend = await userAPI.getFriendRequestToYou();
  //    }
  //    fetchApi();
  // },[]);

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
