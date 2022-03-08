
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './features/home-screen/HomeScreen';
import LikedImages from './features/liked-images/LikedImages';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomeScreen />} />
      <Route path='/liked-images' element={<LikedImages />} />
    </Routes>
  );
}

export default App;
