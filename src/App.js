
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import RecordList from './components/recordList/RecordList';
import './App.css';

function App() {
  return (

    <BrowserRouter>

    <div className='container'>
      <Routes>
        <Route exact path='/' element={<RecordList />} />
      </Routes>

    </div>
    </BrowserRouter>

  );
}

export default App;
