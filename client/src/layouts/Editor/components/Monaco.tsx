import React, {RefObject} from 'react';
import { editor as monacoTypes } from 'monaco-editor';
import MonacoEditor from 'react-monaco-editor';

interface Props {
  code?: string;
  ref: React.RefObject<typeof monacoTypes>;
  theme?: string;
  editing?: boolean;
}

class Monaco extends React.Component<Props> {
  private monacoRef: RefObject<MonacoEditor>;

  constructor(props: Props){
    super(props);

    this.monacoRef = React.createRef();
  }

  editorDidMount(editor: monacoTypes.IStandaloneCodeEditor, monaco: any) {
    // console.log('editorDidMount', editor);
  }

  public getCode(){
    if(this.monacoRef.current == undefined || this.monacoRef.current.editor == null) return "";
    return this.monacoRef.current.editor.getValue();
  }

  render() {
    const { theme, editing, code } = this.props;

    const options: monacoTypes.IEditorConstructionOptions = {
      selectOnLineNumbers: true,
      readOnly: !editing,
      fontFamily: 'Source Code Pro',
      fontWeight: '400',
      fontSize: 13,
      minimap: {
        enabled: false
      },
      automaticLayout: true,
      scrollBeyondLastLine: false,
      renderIndentGuides: true
    };

    return (
      <MonacoEditor
        language="cpp"
        theme={theme ? theme : 'vs-dark'}
        height="90%"
        value={code}
        options={options}
        editorDidMount={this.editorDidMount}
        ref={this.monacoRef}
      />
    );
  }
}

export default Monaco;
