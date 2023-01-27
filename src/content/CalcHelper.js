
import './CalcHelper.css';
import { propList } from "./utils/props";
import { anemosMobList } from "./utils/anemosMob";
import React, { useState } from 'react';


function CalcHelper() {
    // 파티 인원수
    let [isSoloParty, setIsSoloParty] = useState(true);
    const checkPartyNum = (e) => {
        let dataType = e.target.dataset.type;
        setIsSoloParty((dataType === 'one') ? true : false);
    }

    // 엘리멘탈 레벨 
    let [pLevel, setPLevel] = useState({firstNum : 0, secondNum : 0});
    const minChange = (e) => {
        let targetNum = e.target.value;
        targetNum = targetNum < 0 ? 1 : targetNum;
        targetNum = targetNum > 60 ? 60 : targetNum;

        setPLevel({firstNum : targetNum, secondNum : pLevel.secondNum});
    };
    const maxChange = (e) => {
        let targetNum = e.target.value;
        targetNum = targetNum < 0 ? 1 : targetNum;
        targetNum = targetNum > 60 ? 60 : targetNum;

        setPLevel({firstNum : pLevel.firstNum, secondNum : targetNum});
    };

    // 속성 선택시 
    const [checkedState, setCheckedState] = useState(
        new Array(propList.length).fill(true)
    );
    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    };

    //검색 버튼 클릭
    const [filteredList, setFilteredList] = useState(anemosMobList);
    const searchHuntNote = (e) => {
        console.log('---- 검색 ----');
        console.log('파티 종류 : ', (isSoloParty ? '솔팟' : '공팟'));

        if(pLevel.firstNum > pLevel.secondNum && !isSoloParty){
            let maxNum = pLevel.firstNum;
            setPLevel({firstNum : pLevel.secondNum, secondNum : maxNum});
        }
        console.log('최소 레벨 : ', pLevel.firstNum , ', 최대 레벨 : ', pLevel.secondNum);

        let userPropList = [];
        propList.forEach((el, index) => {
            if(checkedState[index] === true) userPropList.push(el.value);
        });       
        console.log('선택한 속성 값 : ', userPropList);

        // ================== 필터 시작 ===================
        let filterList = anemosMobList;
        // const result = filterList.filter(word => userPropList.some(el => word.prop.toLowerCase().includes(el.toLowerCase())));
        // const result = filterList.filter(word => userPropList.some(el => word.sortType.includes(el)));
        const result = filterList.filter((word) => {
            return userPropList.some(el => word.sortType.includes(el));
          });
        console.log('result : ', result);
        setFilteredList(result);
    }


    
    return (
        <div className="wrapper">  
            {/* <p>CalcHelper 영역입니다.</p> */}

        <div className="filter-wrap">
            {/* 파티원 */}
                <div className="filter-con">
                    <p className="title">* 인원수</p>
                    <div className='p-wrap'>
                        <button onClick={checkPartyNum} data-type='one' is-active={isSoloParty ? 'true' : 'false'}>1명</button>
                        <button onClick={checkPartyNum} data-type='overTwo' is-active={!isSoloParty ? 'true' : 'false'}>2명이상</button>
                    </div>
                </div>

            {/* 엘리멘탈 레빌 입력칸 */}
                <div className="filter-con">
                    <p className="title">* 엘리멘탈 레벨</p>
                    <div className='el-wrap'>
                        <input type="number" value={pLevel.firstNum} onChange={minChange} />
                        <div hidden={isSoloParty}> ~ </div>
                        <input type="number" value={pLevel.secondNum} onChange={maxChange} disabled={isSoloParty} hidden={isSoloParty}/>
                    </div>
                </div>

            {/* 속성 입력값 */}
                <div className="filter-con">
                    <p className="title">* 속성</p>
                    <ul className="prop-wrap">
                        {propList.map(({ name, checked }, index) => {
                        return (
                            <li key={index}>
                                <div className="toppings-list-item">
                                    <div className="left-section">
                                    <input
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        name={name}
                                        value={name}
                                        checked={checkedState[index]}
                                        onChange={() => handleOnChange(index)}
                                    />
                                    <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                    </div>
                                </div>
                            </li>
                        );
                        })}
                    </ul>
                </div>
                <div className="filter-con">
                    <button onClick={searchHuntNote}>검색</button>
                </div>
            </div>
            <div>
                <p>=============== 구분선 ===============</p>
                <div>
                    {filteredList.map(({ id, prop, lv, name }, index) => {
                        return (
                            <p key={id}>{prop}-{lv}-{name}</p>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default CalcHelper;
