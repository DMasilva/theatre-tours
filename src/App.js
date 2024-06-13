import Homepage from './components/Homepage';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="">
      <Routes>
      <Route path='/' element={<Homepage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
