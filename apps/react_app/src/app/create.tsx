
import React from 'react';
import { collaboStorage } from '../commons/local.storage';

const webSocket = new WebSocket('ws://localhost:3021');
let count = 2;

export const CreateArticle: React.FC<{ username: string; }> = ({ username }) => {

  const [textInput, setTextInput] = React.useState<string>('');

  // See - https://en.wikipedia.org/wiki/Lamport_timestamp
  const [nounce, setNounce] = React.useState<number>(0);


  // TODO - fix the use of any
  // `any` was use because data does not exit in `event.nativeEvent.data`
  const handleInput = React.useCallback((event: any) => {
    // --

    const count = nounce + 1;

    setNounce(count);

    const char = event.nativeEvent.data;

    // The position of the cursor was changes was made
    const position = [0, 0];

    // save to index db and send to sever
    const edit = { user: username, type: 'insert', position, timeStamp: count, data: '' };


    console.log(event, '<< event');
    const inputType = event.nativeEvent.inputType;

    if (inputType === 'deleteContentBackward') {
      const t = textInput.split('');

      edit.type = 'remove';
      edit.data = t.pop() ?? '';

      setTextInput(t.join(''));
    } else if (inputType === 'insertLineBreak') {
      edit.data = '<CR>';
      setTextInput(`${textInput}\n`);

    } else {

      edit.data = char;
      setTextInput(`${textInput}${char}`);
    }

    console.log({ char, textInput });

    collaboStorage.setItem('doc', edit);

    webSocket.send(JSON.stringify(edit));

  }, [setTextInput, textInput, setNounce, nounce, webSocket]);

  React.useMemo(function() {


    webSocket.addEventListener('open', function() {
      count++;
      webSocket.send(JSON.stringify({ t: count, m: 'Client can send message, can it?' }));
    });
  }, [webSocket]);

  return (
    <React.Fragment>

      <div>
        <h3>{username}</h3>
        <textarea id="editor" name="editor" autoFocus={true} rows={20} cols={100} value={textInput} onInput={handleInput} />
      </div>
    </React.Fragment>
  );
};

