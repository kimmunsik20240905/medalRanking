import { useState } from 'react'
import './App.css'

function MedalSubmit({ medalrecord, setMedalrecord, setSortOption }) {
    {/* 인풋 훅 설정 */ }
    const [country, setCountry] = useState("");
    const [goldMedal, setGoldMedal] = useState("");
    const [silverMedal, setSilverMedal] = useState("");
    const [bronzeMedal, setBronzeMedal] = useState("");
  
    {/* 두자리 이상 숫자 방지 */ }
    const numberChk = (value) => {
      if (value.length > 2) {
        return value.substr(0, 2);
      }
      return value;
    }
  
    {/* 빈칸 입력 방지 */ }
    const blankChkboolean = () => {
      if (country === "" || goldMedal === "" || silverMedal === "" || bronzeMedal === "") {
        return false;
      }
      return true;
    };
  
    {/* 입력된 국가 확인 */ }
    const countryChkboolean = () => {
      let countryChk = false;
      medalrecord.forEach(record => {
        if (record.country === country) {
          countryChk = true;
        }
      });
      return countryChk;
    };
  
    {/* 새로운 입력값 객체생성 */ }
    const newMedalRecord = {
      id: new Date().getTime(),
      country: country,
      goldMedal: Number(goldMedal),
      silverMedal: Number(silverMedal),
      bronzeMedal: Number(bronzeMedal),
    };
  
    {/* 추가 및 수정 후 콤보박스 초기화 */ }
    const defaultSet = () => {
      setCountry("");
      setGoldMedal("");
      setSilverMedal("");
      setBronzeMedal("");
    };
  
    const storageUpdapte = () => {
      const storedMedalList = localStorage.getItem('countryMedalList');
      let countryMedalList;
      if (!storedMedalList) {
        countryMedalList = [];
      } else {
        countryMedalList = JSON.parse(storedMedalList);
      }
      return countryMedalList;
    }
  
    {/* 추가 기능 */ }
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (!blankChkboolean()) {
        alert('국가명과 메달 수를 입력해주세요');
        return;
      }
  
      if (countryChkboolean()) {
        alert("입력하신 국가가 이미 존재합니다.");
        defaultSet();
        return;
      }
  
      const countryMedalList = storageUpdapte();
      const countryNames = countryMedalList.map(item => item.country);
      if (!countryNames.includes(country)) {
        countryMedalList.push(newMedalRecord);
        localStorage.setItem('countryMedalList', JSON.stringify(countryMedalList));
      }
      const storedMedalList = JSON.parse(localStorage.getItem('countryMedalList'));
      setMedalrecord(storedMedalList);
      setSortOption('gold');
      defaultSet();
    };
  
    {/* 수정 기능 */ }
    const handleEdit = () => {
      if (!blankChkboolean()) {
        alert('국가명과 메달 수를 입력해주세요');
        return;
      }
      if (!countryChkboolean()) {
        alert("입력하신 국가가 존재하지 않습니다.");
        defaultSet();
        return;
      }
  
      const countryMedalList = storageUpdapte();
      const countryNames = countryMedalList.map(item => item.country);
      if (countryNames.includes(country)) {
        const updatedMedalList = countryMedalList.filter(item => item.country !== country);
        updatedMedalList.push(newMedalRecord);
        localStorage.setItem('countryMedalList', JSON.stringify(updatedMedalList));
      }
      const storedMedalList = JSON.parse(localStorage.getItem('countryMedalList'));
      setMedalrecord(storedMedalList);
      setSortOption('gold');
      defaultSet();
    };
    return (
      <>
        {/* 입력영역 */}
        <form className="inputWrap" onSubmit={handleSubmit}>
          <input type='text' placeholder='국가명 입력' value={country} onChange={(e) => setCountry(e.target.value)} />
          <input type='number' placeholder='금메달 수 입력' value={goldMedal} onChange={(e) => setGoldMedal(numberChk(e.target.value))} />
          <input type='number' placeholder='은메달 수 입력' value={silverMedal} onChange={(e) => setSilverMedal(numberChk(e.target.value))} />
          <input type='number' placeholder='동메달 수 입력' value={bronzeMedal} onChange={(e) => setBronzeMedal(numberChk(e.target.value))} />
          <button type='submit'>추가</button>
          <button type='button' onClick={handleEdit}>수정</button>
        </form>
      </>
    )
  }

  export default MedalSubmit