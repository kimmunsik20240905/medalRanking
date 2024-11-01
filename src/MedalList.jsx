import './App.css'

function MedalList({ medalrecord, setMedalrecord }) {
    {/* 삭제 기능 */ }
    const handleDelete = () => {
      const storedMedalList = JSON.parse(localStorage.getItem('countryMedalList'));
      const updatedMedalList = storedMedalList.filter(item => item.country !== medalrecord.country);
      localStorage.setItem('countryMedalList', JSON.stringify(updatedMedalList));
      setMedalrecord(updatedMedalList);
    };
  
    return (
      <>
        <tr>
          <td>{medalrecord.country}</td>
          <td>{medalrecord.goldMedal}</td>
          <td>{medalrecord.silverMedal}</td>
          <td>{medalrecord.bronzeMedal}</td>
          <td>
            <button onClick={handleDelete}>삭제</button>
          </td>
        </tr>
      </>
    )
  }

  export default MedalList