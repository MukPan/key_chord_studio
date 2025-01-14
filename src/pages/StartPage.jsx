// import React from 'react';
import { useState, useRef, createContext } from "react";
import PianoPage from "./PianoPage.jsx";
import Header from "../components/Header.jsx";

export const LinedDistsContext = createContext({});
export const KeySelectedContext = createContext({});
export const KeyTempSelectedContext = createContext({});
export const SortChordArrContext = createContext({});
export const selectBoxValueContext = createContext({});
export const sortTypeContext = createContext({});

//Contextを読み込むところ
export default function StartPage(){
  document.oncontextmenu = () => false; //右クリック禁止
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

  const playerRef = useRef(null);
  const buttonEL = useRef<HTMLButtonElement>(null);
  const startPageEL = useRef<HTMLInputElement>(null);

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
                  <PianoPage/>
                </LinedDistsContext.Provider>
              </KeyTempSelectedContext.Provider>
            </KeySelectedContext.Provider>
          </SortChordArrContext.Provider>
        </selectBoxValueContext.Provider>
      </sortTypeContext.Provider>
    </>

  )
}