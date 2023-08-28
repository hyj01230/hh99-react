import './App.css';
import { useState } from 'react';

function App() {

  // 인풋(제목, 내용) 입력
  const [inputTitle, setInputTitle] = useState('');
  const [inputContents, setInpuContents] = useState('');
  // 인풋(제목)이 변경될 때
  //setinputTitle(evet.target.value : 인풋에 입력한 값이 들어옴) : set만나서 inputTitle로 들어감
  const onChangeTitleHandler = (evet) => { setInputTitle(evet.target.value); }
  // 인풋(내용)이 변경될 때
  const onChangeContentsHandler = (evet) => { setInpuContents(evet.target.value) }

  // todo 카드 정보 모음(정보 변경되면 다시 렌더링=useState로 만들기!)
  const [todocards, settodocards] = useState([
    { id: 1, title: '리액트 공부하기', contents: '리액트 기초를 공부해봅시다.', isDone: false },
    { id: 2, title: '알고리즘 공부하기', contents: '프로그래머스를 풀어봅시다.', isDone: true }
  ])

  // '추가하기' 버튼 클릭
  const clickAddButtoHandler = (evet) => {
    // 알림창 띄우고, 인풋박스 초기화
    alert('할수이써~👏👏👏')
    setInputTitle('')
    setInpuContents('')

    // 새로운 todo 카드 만들기
    // 새로운 todo 카드의 isDone의 기본값은 false임
    const newTodoCard = {
      id: todocards.length + 1,
      title: inputTitle,
      contents: inputContents,
      isDone: false
    }

    // 새로운 todo 카드를 배열(todo 카드 정보 모음)에 추가
    // settodocards에 원래 배열을 풀고, 새로운 todo 카드를 더해줌
    // 불변성 유지!
    settodocards([...todocards, newTodoCard])
  }

  // '삭제' 버튼 클릭 = id값 넘겨받음!
  const clickRemoveButton = (clickRemoveButtonID) => {
    alert('삭제 완료 ❌')

    // 삭제된 todo 카드 처리
    // 필터로 조건에 맞족하는거 빼고 다시 렌더링 해줌
    const removeCard = todocards.filter(item => item.id !== clickRemoveButtonID)
    settodocards(removeCard);
  }

  // '완료' 버튼 클릭 = id값 넘겨받음!
  const clickCompleteButton = (clickCompleteButtonId) => {
    alert('To Do 완료 🎉')

    // 완료된 todo 자리 옮기고 버튼 이름 변경하기🚨
    // 각 요소에 대한 수정이 있어야 해서 filter는 못씀!!!!!!!
    // 완료 클릭해서 id 받아온 카드의 isDone 값을 true로 변경해서 랜더링해주는데,
    // 밑에서 filter로 item이 false 인것만 추출해서 true인건 카드가 사라짐
    const updateComplete = todocards.map(item => {
      if (item.id === clickCompleteButtonId) {
        return { ...item, isDone: true };
      } else { return item };
    });
    settodocards(updateComplete);
  }

  // '취소' 버튼 클릭 = id값 넘겨받음!
  const clickCancleButton = (clickCancleButtonId) => {
    alert('다시 시작! 🔥')

    // 취소된 todo 자리 옮기고 버튼 이름 변경하기🚨
    // 각 요소에 대한 수정이 있어야 해서 filter는 못씀!!!!!!!
    // 취소 클릭해서 id 받아온 카드의 isDone 값을 false 변경해서 랜더링해주는데,
    // 밑에서 filter로 item이 true로 인것만 추출해서 false인건 카드가 사라짐
    const updateCancle = todocards.map(item => {
      if (item.id === clickCancleButtonId) {
        return { ...item, isDone: false };
      } else { return item };
    })
    settodocards(updateCancle);
  }

  return (
    <div className="box">

      <div className="gnb">
        <span>My Todo List</span>
        <span>React</span>
      </div>

      <div className='inputSpace'>
        제목 <input type="text" className='inputBox1'
          // value(set으로 들어온 값이 재할당됨), onChange(인풋에 변화가 일어날때 진행됨)
          value={inputTitle}
          onChange={onChangeTitleHandler} />

        내용 <input type="text" className='inputBox2'
          // value(set으로 들어온 값이 재할당됨), onChange(인풋에 변화가 일어날때 진행됨)
          value={inputContents}
          onChange={onChangeContentsHandler} />

        <button className='addButton'
          onClick={clickAddButtoHandler}
        >추가하기</button>
      </div>

      <div className='todoStateZone'>
        🔥Working🔥
      </div>
      <div className='todoCardZone'>
        {/* todocards 배열의 각 요소를 돌면서 카드를 생성함
        filter로 isDone이 false 인 것만 추출
        map은 배열의 각 요소마다 새로운 배열을 반환함 */}
        {todocards.filter(item => item.isDone === false).map(function (item) {
          return (
            <div key={item.id} className='todoCard'>
              <span>{item.title}</span>
              <p>{item.contents}</p>
              {/* 삭제 누르면 item.id값 넘겨받음! = map 돌때 식별 할 수 있는 값 */}
              <button className='todoCardButton1'
                onClick={() => clickRemoveButton(item.id)}
              >삭제</button>
              {/* 완료 누르면 item.id값 넘겨받음! */}
              <button className='todoCardButton2'
                onClick={() => clickCompleteButton(item.id)}
              >완료</button>
            </div>
          )
        })}
      </div>

      <div className='todoStateZone'>
        🎉Done🎉
      </div>

      <div className='todoCardZone'>
        {/* todocards 배열의 각 요소를 돌면서 카드를 생성함
        filter로 isDone이 true 인 것만 추출
        map은 배열의 각 요소마다 새로운 배열을 반환함 */}
        {todocards.filter(item => item.isDone === true).map(function (item) {
          return (
            <div key={item.id} className='todoCard'>
              <span>{item.title}</span>
              <p>{item.contents}</p>
              {/* 삭제 누르면 item.id값 넘겨받음! = map 돌때 식별 할 수 있는 값 */}
              <button className='todoCardButton1'
                onClick={() => clickRemoveButton(item.id)}
              >삭제</button>
              {/* 취소 누르면 item.id값 넘겨받음! */}
              <button className='todoCardButton2'
                onClick={() => clickCancleButton(item.id)}
              >취소</button>
            </div>
          )
        })}
      </div>

    </div >
  );
}

export default App;
