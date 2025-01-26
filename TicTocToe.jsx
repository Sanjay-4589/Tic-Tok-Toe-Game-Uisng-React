  import { useRef, useState } from 'react';

import './TicTokToe.css';
import circle_icon from './assets/circle.png';
import cross_icon from './assets/cross.png';

export default function TicTokToe() {
    const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    let titleRef=useRef(null);
    let box1=useRef(null);
    let box2=useRef(null);
    let box3=useRef(null);
    let box4=useRef(null);
    let box5=useRef(null);
    let box6=useRef(null);
    let box7=useRef(null);
    let box8=useRef(null);
    let box9=useRef(null);
    let box_array=[box1,box2,box3,box4,box5,box6,box7,box8,box9];

    const toggle = (e, num) => {
        if (lock || data[num]) {
            return;
        }
        const newData = [...data]; // Copy the data array to avoid mutating state directly
        if (count % 2 === 0) {
            e.target.innerHTML = `<img src="${cross_icon}" alt="X"/>`;
            newData[num] = 'x';
        } else {
            e.target.innerHTML = `<img src="${circle_icon}" alt="O"/>`;
            newData[num] = 'o';
        }
        setData(newData); // Update the state with the new data array
        setCount(count + 1);
        checkwin(newData); // Pass the updated data to the checkwin function

    };

    const checkwin = (newData) => {
        if (
            (newData[0] === newData[1] && newData[1] === newData[2] && newData[2] !== "") ||
            (newData[3] === newData[4] && newData[4] === newData[5] && newData[5] !== "") ||
            (newData[6] === newData[7] && newData[7] === newData[8] && newData[8] !== "") ||
            (newData[0] === newData[3] && newData[3] === newData[6] && newData[6] !== "") ||
            (newData[1] === newData[4] && newData[4] === newData[7] && newData[7] !== "") ||
            (newData[2] === newData[5] && newData[5] === newData[8] && newData[8] !== "") ||
            (newData[0] === newData[4] && newData[4] === newData[8] && newData[8] !== "") ||
            (newData[2] === newData[4] && newData[4] === newData[6] && newData[6] !== "")
        ) {
            const winner = count % 2 === 0 ? 'x' : 'o';
            won(winner);
        }
    };

    const won = (winner) => {
        setLock(true); // Lock the board to prevent further moves
        if(winner=='x'){
            titleRef.current.innerHTML=`congratulation <img src="${cross_icon}"> wins`
        }else{
            titleRef.current.innerHTML=`congratulation :<img src="${circle_icon}"> wins`
        }
    };
    const reset=()=>{
        setLock(false);
        setData(["", "", "", "", "", "", "", "", ""]);
        titleRef.current.innerHTML=`Tic Tok Toe Game In <span>React<span>`
        box_array.map((e)=>{
            e.current.innerHTML="";
        })
    }
    return (
        <>
            <div className="container">
                <h1 className="title" ref={titleRef}>Tic Tok Toe Game In <span>React</span></h1>
                <div className="board">
                    <div className="row1">
                        <div className="boxes"  ref={box1} onClick={(e) => { toggle(e, 0) }}></div>
                        <div className="boxes" ref={box2} onClick={(e) => { toggle(e, 1) }}></div>
                        <div className="boxes" ref={box3} onClick={(e) => { toggle(e, 2) }}></div>
                    </div>
                    <div className="row2">
                        <div className="boxes" ref={box4} onClick={(e) => { toggle(e, 3) }}></div>
                        <div className="boxes" ref={box5} onClick={(e) => { toggle(e, 4) }}></div>
                        <div className="boxes" ref={box6} onClick={(e) => { toggle(e, 5) }}></div>
                    </div>
                    <div className="row3">
                        <div className="boxes" ref={box7} onClick={(e) => { toggle(e, 6) }}></div>
                        <div className="boxes" ref={box8} onClick={(e) => { toggle(e, 7) }}></div>
                        <div className="boxes" ref={box9} onClick={(e) => { toggle(e, 8) }}></div>
                    </div>
                </div>
                <button className="reset" onClick={()=>{reset()}}>Reset</button>
            </div>
        </>
    );
}
