import './App.css';
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom"
function App() {
  const navigate = useNavigate()
  return (
    <div style={{width:"90%", margin:"auto auto",textAlign:"center"}}className="App">
     <h1>Home Page</h1>
     <Button  variant="outline-dark" style={{width:"100%"}} onClick={()=>{
      navigate("create")
     }}>Next</Button>
    </div>
  );
}

export default App;
