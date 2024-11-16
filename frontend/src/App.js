import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Login} from "./component/Login";
import {Home} from "./component/Home";
import {Navigation} from './component/Navigation';
import {Logout} from './component/Logout';
import {Exam} from './component/Exam';
function App() {
    return <BrowserRouter>
    <Navigation></Navigation>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/exam" element={<Exam/>}/>
        </Routes>
    </BrowserRouter>;
}

export default App;