import React from 'react';
import { editor as monacoTypes } from 'monaco-editor';
import MonacoEditor from 'react-monaco-editor';

interface Props {
  code?: string;
  ref: React.RefObject<typeof monacoTypes>;
  theme?: string;
}

class Monaco extends React.Component<Props, any> {
  editorDidMount(editor: monacoTypes.IStandaloneCodeEditor, monaco: any) {
    // console.log('editorDidMount', editor);
  }

  render() {
    const { code, theme } = this.props;

    const options: monacoTypes.IEditorConstructionOptions = {
      selectOnLineNumbers: true,
      readOnly: true,
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
      />
    );
  }
}

export default Monaco;
