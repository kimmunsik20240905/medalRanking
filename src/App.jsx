import { useState } from 'react';
import './App.css';
import MedalSubmit from './MedalSubmit.jsx';
import MedalList from './MedalList.jsx';
import logoImg from './assets/parisLogo.svg';
import goldImg from './assets/gold.png';
import silverImg from './assets/silver.png';
import bronzeImg from './assets/bronze.png';


function App() {
  {/* 로컬스토리지 가져오기 */ }
  const [medalrecord, setMedalrecord] = useState(() => {
    const storedMedalList = JSON.parse(localStorage.getItem('countryMedalList'));
    return storedMedalList && storedMedalList.length > 0 ? storedMedalList : [];
  });

  const [sortOption, setSortOption] = useState('gold')
  const updatedRecords = [...medalrecord].sort((a, b) => b.goldMedal - a.goldMedal);
  const updatedTotalRecords = [...medalrecord].sort((a, b) => (b.goldMedal + b.silverMedal + b.bronzeMedal) - (a.goldMedal + a.silverMedal + a.bronzeMedal));
  const sortUpdate = sortOption === 'gold' ? updatedRecords : updatedTotalRecords;

  return (
    <>
      {/* 로고영역 */}
      <h1>
        <img src={logoImg} alt="파리올림픽 로고" />
        <br />
        2024 Paris Olympics Ranking Input System
      </h1>
      {/* 리스트 영역 */}
      <MedalSubmit medalrecord={medalrecord} setMedalrecord={setMedalrecord} setSortOption={setSortOption} />
      <div className="tabWrap">
        <button onClick={() => setSortOption('gold')} className={sortOption === 'gold' ? 'active' : ''} >금메달순정렬</button>
        <button onClick={() => setSortOption('total')} className={sortOption === 'total' ? 'active' : ''} >총메달순정렬</button>
      </div>
      <div className="listWrap">
        <table cellPadding='0' cellSpacing='0'>
          <thead >
            <tr>
              <th>국가명</th>
              <th><img src={goldImg} alt="금메달 이미지" />금메달</th>
              <th><img src={silverImg} alt="은메달 이미지" />은메달</th>
              <th><img src={bronzeImg} alt="동메달 이미지" />동메달</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {sortUpdate.map(item => {
              return (
                <>
                  <MedalList key={item.id} medalrecord={item} setMedalrecord={setMedalrecord} />
                </>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
