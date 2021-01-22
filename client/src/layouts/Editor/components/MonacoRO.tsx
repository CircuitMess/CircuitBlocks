import React, {RefObject} from 'react';
import { editor as monacoTypes } from 'monaco-editor';
import MonacoEditor from 'react-monaco-editor';

interface Props {
  code: string;
  theme: string;
}

class MonacoRO extends React.Component<Props> {
  constructor(props: Props){
    super(props);
  }

  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<{}>, nextContext: any): boolean {
    return this.props.code != nextProps.code || this.props.theme != nextProps.theme;
  }

  render() {
    const { theme, code } = this.props;

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

    console.log("Monaco rendering");

    return (
      <MonacoEditor
        language="cpp"
        theme={theme ? theme : 'vs-dark'}
        height="90%"
        value={code}
        options={options}
      />
    );
  }
}

export default MonacoRO;
