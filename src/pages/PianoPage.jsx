import { useGetSoundPlayer } from "../hooks/useGetSoundPlayer.tsx";
// import { useGetNoteList, usePlay, useStop } from '../hooks/useChordPlayer';
import { Keyboard } from '../components/pianoContents/Keyboard.jsx'
import { ChordDisplay } from '../components/pianoContents/ChordDisplay.jsx'
import PianoControler from "../components/pianoContents/PianoControler.jsx"
import SearchModeSelector from "../components/pianoContents/SearchModeSelector.jsx"
import { useState, useEffect, createContext, useRef } from "react";
import {PlaybackSection} from "../components/PlaybackSection.jsx";

export const IsTempContext = createContext({});

//ピアノページ
export default function PianoPage(props) { //鍵盤を押すことでコードを検索できるようにする機能を実装する
  const [ isTemp, setIsTemp ] = useState(false); //false:本有効 true:仮有効
  const pianoPageStyle = { //cssを指定するためのオブジェクトを用意しておく。
    margin: "20px 50px",
  }

  const predictChordAreaStyle = {
    margin: "20px 0",
    display: "flex",
    alignItems: "center",
  }

  let headlineTextStyle = {
    fontSize: "20px",
    marginRight: "10px",
    textAlign: "center",
    width: "80px",
    // padding: "18px 0",
    backgroundColor: "#f3fbff",
    height: "172px",
    fontWeight: "bold",
  }

  const keyboardSectionStyle = {
    width: "900px",
    height: "160px",
    marginLeft: "370px"
    // overflow: "auto",
    // zIndex: "99",
    // position: "fixed",
    // top: "90px",
    // left: "200px",
  }


  const pianoControlerStyle = {
    float: "left",
    width: "350px",
    height: "160px",
    // clear: "both",
    // zIndex: "99",
    // position: "fixed",
    // top: "90px",
    // left: "1100px",
    // display: "flex"
  }

  const predictChordDisplayStyle = {
    backgroundColor: "#f3fbff",
    width: "95%",
    margin: "0 0 0 3px",
    padding: "0 0 0 30px",
  }

  const chordAreaStyle = {
    backgroundColor: "#f3fbff",
    height: "200px",
    margin: "20px 0",
  }


  if(typeof(window) === "object"){          //typeof(window) === "object"を書いてある
    document.body.style.backgroundColor = "rgb(166, 225, 255)";
  }

  const { PlayFuncs, StopFuncs } = useGetSoundPlayer();
  // const getNoteList = useGetNoteList();
  // const playChord = usePlay(PlayFuncs);
  // const stopChord = useStop(StopFuncs); //今回はコードセットではなく、単音で鳴らすため使わんかも



  return (
    <IsTempContext.Provider value={{isTemp, setIsTemp}}>
      <div id="pianoPage" style={pianoPageStyle}>

        {/*再生コード表示エリア*/}
        <PlaybackSection/>

        {/*キーボードエリア*/}
        <div id="keyboardArea">
          {/*ピアノコントローラ*/}
          <div style={pianoControlerStyle}>
            <PianoControler/>
          </div>
          {/*キーボード本体*/}
          <div id="keyboardSection" className="clearfix" style={keyboardSectionStyle}>
            <Keyboard/>
          </div>
        </div>

        {/*一致コード表示エリア*/}
        <div style={predictChordAreaStyle}>
          <div id="headlineText" style={headlineTextStyle}>
            <p>一致<br/>コード</p>
          </div>
          <div style={predictChordDisplayStyle}>
            <ChordDisplay/>
          </div>
        </div>

      </div>
    </IsTempContext.Provider>
  )
}