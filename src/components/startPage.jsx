// import React from 'react';
import { useState, useRef, createContext } from "react";
import PianoPage from "./pianoPage";

export const LinedDistsContext = createContext({});
export const KeySelectedContext = createContext({});
export const KeyTempSelectedContext = createContext({});
export const SortChordArrContext = createContext({});
export const selectBoxValueContext = createContext({});
export const sortTypeContext = createContext({});

export default function StartPage(){
    /*絞り込み方法*/
    const narDownOptions = [
        { value: "simiR", label: "類似(ルート音固定)" },
        { value: "simi", label: "類似" },
    ];

    const sortOptions = [
        { value: "keyNum", label: "キー数" },
        { value: "hitNum", label: "重複数" },
        { value: "rootIndex", label: "ルート音" },
        { value: "keyNum hitNum", label: "キー数-重複数" },
        { value: "hitNum keyNum", label: "重複数-キー数" },
        { value: "rootIndex hitNum", label: "ルート音-重複数" },
        { value: "rootIndex keyNum", label: "ルート音-キー数" },
    ];

    const [ linedDistsArr, setLinedDistsArr ] = useState({}); //dist参照用連想配列
    const [sortChordArr, setSortChordArr] = useState([]); //ソート用キー配列、上に与える
    const [isSelectedArr, setIsSelectedArr] = useState([]); //本
    const [isTempSelectedArr, setIsTempSelectedArr] = useState([]); //仮
    const [selectBoxValue, setSelectBoxValue] = useState(narDownOptions[0]); //絞り込み
    const [sortType, setSortType] = useState(sortOptions[0]); //ソート
    
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); //ms: number

    const playerRef = useRef(null);
    const buttonEL = useRef<HTMLButtonElement>(null);
    const startPageEL = useRef<HTMLInputElement>(null);
    //レンダリング後(ロード後)の処理
    const endLoading = (event) => { //:PlayerEvent
        if (event === "play") {
            (async () => {
                buttonEL.current.style.display = 'none';//ボタン非表示
                // buttonEL.current!.style.display = 'none';//ボタン非表示
                await sleep(5000); //５秒表示
                const loadingIcon = document.getElementsByClassName("loading"); // as HTMLCollectionOf<HTMLElement>;
                playerRef.current.stop();
                // playerRef.current!.stop();
                loadingIcon[0].style.display = "none"; //ロードアイコン非表示
                buttonEL.current.style.display = 'inline'; //ボタン表示
                // buttonEL.current!.style.display = 'inline'; //ボタン表示
                
            })();
        }
    }
    
    //スタート背景
    const startPage = { //:{[key:string]:string}
        height: "100%",
        width: "100%",
        zIndex: "1",
        position: "fixed",
        backgroundColor: "#FFEBC1",
        opacity: "0.9"
        
    }

    //スタートボタン
    const styleButton = { //:{[key:string]:string}
        height: "50px",
        width: "100px",
        top: "50%",
        left: "50%",
        marginTop: "-25px",
        marginLeft: "-50px",
        zIndex: "2",
        position: "absolute"
    }
    
    //ロードアイコン
    const loadingStyle = { //:{[key:string]:string}
        height: "800px",
        width: "800px",
        top: "50%",
        left: "50%",
        marginTop: "-400px",
        marginLeft: "-400px",
        position: "absolute",
        zIndex: "3",
    };

    //ボタン押下
    const removeStartPage = ()=> { // : void
        buttonEL.current.style.display = 'none';
        startPageEL.current.style.display = 'none';
        // buttonEL.current!.style.display = 'none';
        // startPageEL.current!.style.display = 'none';
    }

    return( 
        <>
            <sortTypeContext.Provider value={{sortType, setSortType}}>
                <selectBoxValueContext.Provider value={{selectBoxValue, setSelectBoxValue}}>
                    <SortChordArrContext.Provider value={{sortChordArr, setSortChordArr}}>
                        <KeySelectedContext.Provider value={{isSelectedArr, setIsSelectedArr}}>
                            <KeyTempSelectedContext.Provider value={{isTempSelectedArr, setIsTempSelectedArr}}>
                                <LinedDistsContext.Provider value={{linedDistsArr, setLinedDistsArr}}>
                                    <div className="d-flex flex-row w-100" style={{zIndex: "0",position: "absolute" , width: "100%"}}>
                                        <PianoPage mode={1}/>
                                    </div>
                                </LinedDistsContext.Provider>
                            </KeyTempSelectedContext.Provider>
                        </KeySelectedContext.Provider>
                    </SortChordArrContext.Provider>
                </selectBoxValueContext.Provider>
            </sortTypeContext.Provider>
        </>
        
    )
}