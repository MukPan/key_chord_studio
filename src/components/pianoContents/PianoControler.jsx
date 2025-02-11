import { useContext, useEffect } from "react";
import { KeySelectedContext } from "../../pages/StartPage.jsx"
import { KeyTempSelectedContext } from "../../pages/StartPage.jsx"
import { IsTempContext } from "../../pages/PianoPage.jsx"

export default function PianoControler() {
    const { isSelectedArr, setIsSelectedArr } = useContext(KeySelectedContext);
    const { isTempSelectedArr, setIsTempSelectedArr} = useContext(KeyTempSelectedContext); //仮
    const {isTemp, setIsTemp} = useContext(IsTempContext); //false:本有効 true:仮有効

/* キー選択解除 */
    const resetKeys = () => {
        setIsSelectedArr(() => []);
    }

    /* 右へ平行移動 */
    const RightParaMove = () => {
        if (isSelectedArr.some(dist => dist >= 60)) return 0; //最高音は弾く
        setIsSelectedArr(prev => [...prev.map(dist => dist + 1)]);
    }

    /* 左へ平行移動 */
    const LeftParaMove = () => {
        if (isSelectedArr.some(dist => dist <= 24)) return 0; //最低音は弾く
        setIsSelectedArr(prev => [...prev.map(dist => dist - 1)]);
    }

    /* 右へ転回 */
    const RightTurn = () => {
        if (isSelectedArr[0] > 48) return 0; //最高音は弾く
        setIsSelectedArr(prev => {
            prev[0] += 12;
            return [...prev];
        });
    }

    /* 左へ転回 */
    const LeftTurn = () => {
        if (isSelectedArr[isSelectedArr.length - 1] < 36) return 0; //最低音は弾く
        setIsSelectedArr(prev => {
            prev[prev.length - 1] -= 12;
            return [...prev];
        });
    }

    /* 右へオクターブ平行移動 */
    const RightParaMoveOctave = () => {
        if (isSelectedArr.some(dist => dist > 48)) return 0; //最高音は弾く
        setIsSelectedArr(prev => [...prev.map(dist => dist + 12)]);
    }

    /* 左へオクターブ平行移動 */
    const LeftParaMoveOctave = () => {
        if (isSelectedArr.some(dist => dist < 36)) return 0; //最低音は弾く
        setIsSelectedArr(prev => [...prev.map(dist => dist - 12)]);
    }


    // const moveButtonStyle = {
    //     width: "125px",
    //     height: "160px"
    // }

    const moveLeftButtonStyle = {
        width: "127px",
        height: "70px",
        position: "relative",
        gridArea: "1 / 1 / 2 / 2",
    }

    const moveRightButtonStyle = {
        width: "127px",
        height: "70px",
        position: "relative",
        gridArea: "1 / 2 / 2 / 3"
    }

    const moveOctaveLeftButtonStyle = {
        width: "127px",
        height: "50px",
        fontSize: "15px",
        position: "relative",
        gridArea: "2 / 1 / 3 / 2"
    }

    const moveOctaveRightButtonStyle = {
        width: "127px",
        height: "50px",
        fontSize: "15px",
        position: "relative",
        gridArea: "2 / 2 / 3 / 3"
    }

    const turnRightButtonStyle = {
        width: "127px",
        height: "50px",
        fontSize: "15px",
        gridArea: "3 / 1 / 4 / 2"
    }

    const turnLeftButtonStyle = {
        width: "127px",
        height: "50px",
        fontSize: "15px",
        gridArea: "3 / 2 / 4 / 3"
    }

    const clearButtonStyle = {
        width: "100px",
        height: "162px",
        fontSize: "15px",
        gridArea: "1 / 3 / 4 / 4"
    }

    const parentStyle =  {
        display: "grid",
        gridTemplateColumns: "repeat(2, 125px) 100px",
        gridTemplateRows: "64px repeat(2, 48px)",
        gridColumnGap: "0px",
        gridRowGap: "0px"
    }


    return(
        <>
            <div style={parentStyle}>
                <button style={moveLeftButtonStyle} onClick={() => LeftParaMove()}>◀︎</button>
                <button style={moveRightButtonStyle} onClick={() => RightParaMove()}>▶︎</button>
                <button style={moveOctaveLeftButtonStyle} onClick={() => LeftParaMoveOctave()}>octave up<br />◀︎</button>
                <button style={moveOctaveRightButtonStyle} onClick={() => RightParaMoveOctave()}>octave down<br />▶︎</button>
                <button style={clearButtonStyle} onClick={() => resetKeys()}>キー選択<br/>解除</button>
                <button style={turnRightButtonStyle} onClick={() => LeftTurn()}>turn left<br />◀︎</button>
                <button style={turnLeftButtonStyle} onClick={() => RightTurn()}>turn right<br />▶︎</button>
            </div>
        </>
    )
}