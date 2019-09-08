import React from 'react';
import { editor as monacoTypes } from 'monaco-editor';
import MonacoEditor from 'react-monaco-editor';

const CODE = `// your code goes here

void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.println("Hello world");
  delay(1000);
}

`;

class App extends React.Component<any, { code: string }> {
  constructor(props: any) {
    super(props);
    this.state = {
      code: CODE
    };
  }

  editorDidMount(editor: monacoTypes.IStandaloneCodeEditor, monaco: any) {
    console.log('editorDidMount', editor);
    editor.focus();
  }

  render() {
    const code = this.state.code;
    const options: monacoTypes.IEditorConstructionOptions = {
      selectOnLineNumbers: true,
      readOnly: true,
      fontSize: 15
    };

    return (
      <MonacoEditor
        language="cpp"
        theme="vs-dark"
        value={code}
        options={options}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}

export default App;
