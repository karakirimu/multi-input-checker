import { useEffect, useState } from 'react';
import './App.css'
import './keyboard.css'

function App() {
  const [lastPressed, setLastPressed] = useState<KeyboardEvent>();
  const [lastReleased, setLastReleased] = useState<KeyboardEvent>();
  const [lastMouseMove, setLastMouseMove] = useState<MouseEvent>();
  const [lastMouseDown, setLastMouseDown] = useState<MouseEvent>();
  const [lastMouseUp, setLastMouseUp] = useState<MouseEvent>();

  const syncScroll = (source: HTMLTextAreaElement, target: HTMLTextAreaElement) => {
    target.scrollTop = source.scrollTop;
    target.scrollLeft = source.scrollLeft;
  }

  const getLastLineCount = (textarea: HTMLTextAreaElement) : number => {
    const value = textarea.value;
    const newlineCount = (value.match(/\n/g) || []).length;
    return newlineCount;
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    setLastPressed(event);
    event.preventDefault();
    console.log('keydown:', event.code);
    const log_line  = document.getElementById('input-line') as HTMLTextAreaElement;
    const log  = document.getElementById('input-log') as HTMLTextAreaElement;
    if(log){
      log.innerHTML += `Down: ${event.key} ${event.code}\n`;
      log.scrollTop = log.scrollHeight;
      if(log_line){
        log_line.innerHTML += `${getLastLineCount(log)}\n`;
        log_line.scrollTop = log.scrollHeight;
      }
    }

    const key = document.getElementById(`key-${event.code}`);
    if (key) {
      key.classList.remove('released');
      key.classList.add('pressed');

      if(event.code === "Enter") {
        const enter = document.getElementById("key-Enter2");
        enter?.classList.remove('released');
        enter?.classList.add('pressed');
      }

      return;
    }

    const rshift = document.getElementById("key-ShiftRight");
    if(rshift && event.shiftKey && event.code === "") {
      rshift.classList.remove('released');
      rshift.classList.add('pressed');
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    setLastReleased(event);
    event.preventDefault();
    const log_line  = document.getElementById('input-line') as HTMLTextAreaElement;
    const log  = document.getElementById('input-log') as HTMLTextAreaElement;
    if(log){
      log.innerHTML += `Up: ${event.key} ${event.code}\n`;
      log.scrollTop = log.scrollHeight;
      if(log_line){
        log_line.innerHTML += `${getLastLineCount(log)}\n`;
        log_line.scrollTop = log.scrollHeight;
      }
    }
    const key = document.getElementById(`key-${event.code}`);
    if (key) {
      key.classList.remove('pressed');
      key.classList.add('released');

      if(event.code === "Enter") {
        const enter = document.getElementById("key-Enter2");
        enter?.classList.remove('pressed');
        enter?.classList.add('released');
      }

      return;
    }

    const rshift = document.getElementById("key-ShiftRight");
    if(rshift && event.key === "Shift" && event.code === "") {
      rshift.classList.remove('pressed');
      rshift.classList.add('released');
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    setLastMouseMove(event);
  }

  const handleMouseDown = (event: MouseEvent) => {
    setLastMouseDown(event);
  }

  const handleMouseUp = (event: MouseEvent) => {
    setLastMouseUp(event);
  }

  const KeyCard = (props : {label: string, text? : string, bool?: boolean, number?: number}) => {
    const Selection = () => {
      
      if(props.text !== undefined) {
        return <div className="key-detail-value" id="key-code">{props.text}</div>
      }
      if(props.bool !== undefined) {
        return <div className="key-detail-value" id="key-code">{props.bool ? "true" : "false"}</div>
      }
      if(props.number !== undefined) {
        return <div className="key-detail-value" id="key-code">{props.number}</div>
      }

      return <div className="key-detail-value" id="key-code">None</div>
    }

    return (
      <div className="key-detail-row">
        <div className="key-detail-label">{props.label}</div>
        {Selection()}
      </div>
    )
  }

  const KeyboardEventProperties = (props :{ keyDetailLabel: string, keyboardEvent? : KeyboardEvent }) => (
    <div className="key-detail">
        <p className="key-detail-label">{props.keyDetailLabel}</p>
        <KeyCard label="key" text={props.keyboardEvent?.key}/>
          <KeyCard label="code" text={props.keyboardEvent?.code}/>
          <KeyCard label="metaKey" bool={props.keyboardEvent?.metaKey}/>
          <KeyCard label="altKey" bool={props.keyboardEvent?.altKey}/>
          <KeyCard label="ctrlKey" bool={props.keyboardEvent?.ctrlKey}/>
          <KeyCard label="shiftKey" bool={props.keyboardEvent?.shiftKey}/>
          <KeyCard label="repeat" bool={props.keyboardEvent?.repeat}/>
          <KeyCard label="location" number={props.keyboardEvent?.location}/>
          <KeyCard label="which" number={props.keyboardEvent?.which}/>
          <KeyCard label="keyCode" number={props.keyboardEvent?.keyCode}/>
          <KeyCard label="charCode" number={props.keyboardEvent?.charCode}/>
    </div>
  )

  const MouseEventProperties = (props :{ keyDetailLabel: string, mouseEvent? : MouseEvent }) => (
    <div className="key-detail">
        <p className="key-detail-label">{props.keyDetailLabel}</p>
        <KeyCard label="altKey" bool={props.mouseEvent?.altKey} />
        <KeyCard label="bubbles" bool={props.mouseEvent?.bubbles} />
        <KeyCard label="button" text={props.mouseEvent?.button !== undefined ? props.mouseEvent.button.toString() : undefined} />
        <KeyCard label="buttons" text={props.mouseEvent?.buttons !== undefined ? props.mouseEvent.buttons.toString() : undefined} />
        <KeyCard label="cancelable" bool={props.mouseEvent?.cancelable} />
        <KeyCard label="client (X,Y)" text={
            props.mouseEvent?.clientX !== undefined ? `(${props.mouseEvent.clientX},${props.mouseEvent.clientY})` : "(0,0)"
        } />
        <KeyCard label="composed" bool={props.mouseEvent?.composed} />
        <KeyCard label="ctrlKey" bool={props.mouseEvent?.ctrlKey} />
        <KeyCard label="defaultPrevented" bool={props.mouseEvent?.defaultPrevented} />
        <KeyCard label="detail" text={props.mouseEvent?.detail !== undefined ? props.mouseEvent.detail.toString() : undefined} />
        <KeyCard label="eventPhase" text={props.mouseEvent?.eventPhase !== undefined ? props.mouseEvent.eventPhase.toString() : undefined} />
        <KeyCard label="isTrusted" bool={props.mouseEvent?.isTrusted} />
        <KeyCard label="metaKey" bool={props.mouseEvent?.metaKey} />
        <KeyCard label="movement (X,Y)" text={
            props.mouseEvent?.movementX !== undefined ? `(${props.mouseEvent.movementX},${props.mouseEvent.movementY})` : "(0,0)"
        } />
        <KeyCard label="offset (X,Y)" text={
            props.mouseEvent?.offsetX !== undefined ? `(${props.mouseEvent.offsetX},${props.mouseEvent.offsetY})` : "(0,0)"
        } />
        <KeyCard label="page (X,Y)" text={
            props.mouseEvent?.pageX !== undefined ? `(${props.mouseEvent.pageX},${props.mouseEvent.pageY})` : "(0,0)"
        } />
        <KeyCard label="screen (X,Y)" text={
            props.mouseEvent?.screenX !== undefined ? `(${props.mouseEvent.screenX},${props.mouseEvent.screenY})` : "(0,0)"
        } />
        <KeyCard label="shiftKey" bool={props.mouseEvent?.shiftKey} />
        <KeyCard label="timeStamp" text={props.mouseEvent?.timeStamp !== undefined ? props.mouseEvent.timeStamp.toString() : undefined} />
        <KeyCard label="type" text={props.mouseEvent?.type !== undefined ? props.mouseEvent.type.toString() : undefined} />
        <KeyCard label="which" text={props.mouseEvent?.which !== undefined ? props.mouseEvent.which.toString() : undefined} />
    </div>
);

  useEffect(() => {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
          document.removeEventListener('keydown', handleKeyDown);
          document.removeEventListener('keyup', handleKeyUp);
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mousedown', handleMouseDown);
          document.removeEventListener('mouseup', handleMouseUp);
      };
  });
  
  return (
    <>
      <div className="layout">
        <div className="keyboard">
          <div className="row">
            <div className="key" id="key-Escape">Esc</div>
            <div className="row space-31px"/>
            <div className="key" id="key-F1">F1</div>
            <div className="key" id="key-F2">F2</div>
            <div className="key" id="key-F3">F3</div>
            <div className="key" id="key-F4">F4</div>
            <div className="row space-31px"/>
            <div className="key" id="key-F5">F5</div>
            <div className="key" id="key-F6">F6</div>
            <div className="key" id="key-F7">F7</div>
            <div className="key" id="key-F8">F8</div>
            <div className="row space-31px"/>
            <div className="key" id="key-F9">F9</div>
            <div className="key" id="key-F10">F10</div>
            <div className="key" id="key-F11">F11</div>
            <div className="key" id="key-F12">F12</div>
          </div>
          <div className="row">
            <div className="key" id="key-Backquote">半角/全角</div>
            <div className="key" id="key-Digit1">1</div>
            <div className="key" id="key-Digit2">2</div>
            <div className="key" id="key-Digit3">3</div>
            <div className="key" id="key-Digit4">4</div>
            <div className="key" id="key-Digit5">5</div>
            <div className="key" id="key-Digit6">6</div>
            <div className="key" id="key-Digit7">7</div>
            <div className="key" id="key-Digit8">8</div>
            <div className="key" id="key-Digit9">9</div>
            <div className="key" id="key-Digit0">0</div>
            <div className="key" id="key-Minus">-</div>
            <div className="key" id="key-Equal">^</div>
            <div className="key" id="key-IntlYen">\</div>
            <div className="key" id="key-Backspace">⌫</div>
          </div>
          <div className="row">
            <div className="key width-70px" id="key-Tab">Tab</div>
            <div className="key" id="key-KeyQ">Q</div>
            <div className="key" id="key-KeyW">W</div>
            <div className="key" id="key-KeyE">E</div>
            <div className="key" id="key-KeyR">R</div>
            <div className="key" id="key-KeyT">T</div>
            <div className="key" id="key-KeyY">Y</div>
            <div className="key" id="key-KeyU">U</div>
            <div className="key" id="key-KeyI">I</div>
            <div className="key" id="key-KeyO">O</div>
            <div className="key" id="key-KeyP">P</div>
            <div className="key" id="key-BracketLeft">@</div>
            <div className="key" id="key-BracketRight">[</div>
            <div>
              <div className="key enter" id="key-Enter">Enter</div>
              <div className="key enter2" id="key-Enter2"/>
            </div>
          </div>
          <div className="row">
            <div className="key width-90px" id="key-CapsLock">Caps</div>
            <div className="key" id="key-KeyA">A</div>
            <div className="key" id="key-KeyS">S</div>
            <div className="key" id="key-KeyD">D</div>
            <div className="key" id="key-KeyF">F</div>
            <div className="key" id="key-KeyG">G</div>
            <div className="key" id="key-KeyH">H</div>
            <div className="key" id="key-KeyJ">J</div>
            <div className="key" id="key-KeyK">K</div>
            <div className="key" id="key-KeyL">L</div>
            <div className="key" id="key-Semicolon">;</div>
            <div className="key" id="key-Quote">:</div>
            <div className="key" id="key-Backslash">]</div>
          </div>
          <div className="row">
            <div className="key width-116px" id="key-ShiftLeft">Shift</div>
            <div className="key" id="key-KeyZ">Z</div>
            <div className="key" id="key-KeyX">X</div>
            <div className="key" id="key-KeyC">C</div>
            <div className="key" id="key-KeyV">V</div>
            <div className="key" id="key-KeyB">B</div>
            <div className="key" id="key-KeyN">N</div>
            <div className="key" id="key-KeyM">M</div>
            <div className="key" id="key-Comma">,</div>
            <div className="key" id="key-Period">.</div>
            <div className="key" id="key-Slash">/</div>
            <div className="key" id="key-IntlRo">\</div>
            <div className="key width-90px" id="key-ShiftRight">Shift</div>
          </div>
          <div className="row">
            <div className="key width-70px" id="key-ControlLeft">Ctrl</div>
            <div className="key width-60px disabled" id="key-WinLeft">Win</div>
            <div className="key width-60px" id="key-AltLeft">Alt</div>
            <div className="key" id="key-NonConvert">無変換</div>
            <div className="key width-150px" id="key-Space">Space</div>
            <div className="key" id="key-Convert">変換</div>
            <div className="key width-60px" id="key-KanaMode">カナ/かな</div>
            <div className="key width-60px" id="key-AltRight">Alt</div>
            <div className="key width-60px disabled" id="key-WinRight">Win</div>
            <div className="key width-60px" id="key-ContextMenu">Menu</div>
            <div className="key width-70px" id="key-ControlRight">Ctrl</div>
          </div>
        </div>
        <div className="keyboard">
          <div className="row">
            <div className="key disabled" id="key-PrintScreen">PrtSc</div>
            <div className="key" id="key-ScrollLock">ScrLk</div>
            <div className="key" id="key-Pause">Pause</div>
          </div>
          <div className="row">
            <div className="key" id="key-Insert">Insert</div>
            <div className="key" id="key-Home">Home</div>
            <div className="key" id="key-PageUp">PgUp</div>
          </div>
          <div className="row">
            <div className="key" id="key-Delete">Del</div>
            <div className="key" id="key-End">End</div>
            <div className="key" id="key-PageDown">PgDn</div>
          </div>
          <div className="row"/>
          <div className="row">
            <div className="row space-48px"/>
            <div className="key" id="key-ArrowUp">↑</div>
            <div className="row space-48px"/>
          </div>
          <div className="row">
            <div className="key" id="key-ArrowLeft">←</div>
            <div className="key" id="key-ArrowDown">↓</div>
            <div className="key" id="key-ArrowRight">→</div>
          </div>
        </div>
        <div className="keyboard">
          <div className="row"/>
          <div className="row">
            <div className="key" id="key-NumLock">NumLk</div>
            <div className="key" id="key-NumpadDivide">/</div>
            <div className="key" id="key-NumpadMultiply">*</div>
            <div className="key" id="key-NumpadSubtract">-</div>
          </div>
          <div className="row">
            <div className="key" id="key-Numpad7">7</div>
            <div className="key" id="key-Numpad8">8</div>
            <div className="key" id="key-Numpad9">9</div>
            <div className="key height-101px" id="key-NumpadAdd">+</div>
          </div>
          <div className="row">
            <div className="key" id="key-Numpad4">4</div>
            <div className="key" id="key-Numpad5">5</div>
            <div className="key" id="key-Numpad6">6</div>
          </div>
          <div className="row">
            <div className="key" id="key-Numpad1">1</div>
            <div className="key" id="key-Numpad2">2</div>
            <div className="key" id="key-Numpad3">3</div>
            <div className="key height-101px" id="key-NumpadEnter">Enter</div>
          </div>
          <div className="row">
            <div className="key width-104px" id="key-Numpad0">0</div>
            <div className="key" id="key-NumpadDecimal">.</div>
          </div>
        </div>
      </div>
      <div className="key-detail-layout">
        <MouseEventProperties keyDetailLabel="MouseMove Properties" mouseEvent={lastMouseMove} />
        <MouseEventProperties keyDetailLabel="MouseDown Properties" mouseEvent={lastMouseDown} />
        <MouseEventProperties keyDetailLabel="MouseUp Properties" mouseEvent={lastMouseUp} />
        <KeyboardEventProperties keyDetailLabel="Last KeyDown Properties" keyboardEvent={lastPressed}/>
        <KeyboardEventProperties keyDetailLabel="Last KeyUp Properties" keyboardEvent={lastReleased}/>
        <div className="key-detail">
          <p className="key-detail-label">Input Log</p>
          <div className="log row">
            <textarea className='log line' id="input-line" onScroll={() => syncScroll(document.getElementById('input-line') as HTMLTextAreaElement, document.getElementById('input-log') as HTMLTextAreaElement)} readOnly></textarea>
            <textarea className='log data' id="input-log"  onScroll={() => syncScroll(document.getElementById('input-log') as HTMLTextAreaElement, document.getElementById('input-line') as HTMLTextAreaElement)} readOnly></textarea>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
