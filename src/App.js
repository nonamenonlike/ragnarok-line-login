import logo from './logo.svg';
import './App.css';
import liff from '@line/liff';
import { useEffect, useState } from 'react';
import Box from './Box';

function App() {

  const [color, setColor] = useState("black");
  const [pictureUrl, setPictureUrl] = useState(logo);
  const [idToken, setIdToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setUserId] = useState("");

  const logout = () => {
    liff.logout();
    window.location.reload();
  }

  const initLine = () => {
    liff.init({ liffId: '1657602972-2YVwAKWz' }, () => {
      if (liff.isLoggedIn()) {
        runApp();
      } else {
        liff.login();
      }
    }, err => console.error(err));
  }

  const runApp = () => {
    const idToken = liff.getIDToken();
    setIdToken(idToken);
    liff.getProfile().then(profile => {
      console.log(profile);
      setDisplayName(profile.displayName);
      setPictureUrl(profile.pictureUrl);
      setStatusMessage(profile.statusMessage);
      setUserId(profile.userId);
    }).catch(err => console.error(err));
  }

  useEffect(() => {
    initLine();
    const changeColorOnClick = () => {
    if (color === "black") {
      setColor("red");
    } else {
      setColor("black");
    }
  }
  }, []);


  return (
    <div className="App">
      <header className="App-header">
      <Box>
        <div style={{ textAlign: "center" }}>
          <h3>React With LINE Login To Website Free Picture Ragnarok</h3>
          <hr/>
          <img src={pictureUrl} width="150px" height="150px"/>
          {/*<p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>id token: </b> {idToken}</p>*/}
          <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>display name: </b> {displayName}</p>
          {/*<p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>status message: </b> {statusMessage}</p>*/}
          <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>user id: </b> {userId}</p>
          
          <button color="red" onClick={() => logout()} style={{ width: "10%", height: 30 }}>Logout</button>
          
        </div>
      </Box>
      </header>
    </div>
  );
}

export default App;
