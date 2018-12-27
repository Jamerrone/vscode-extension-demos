const vscode = require('vscode');

function activate(context) {
  console.log('[ACTIVATED]');

  const loremDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: '#FF1744',
    color: '#263238',
  });

  const loremSentenceDecorationType = vscode.window.createTextEditorDecorationType(
    {
      borderColor: '#FF1744',
      borderStyle: 'solid',
      borderWidth: '1px',
    },
  );

  let activeEditor = vscode.window.activeTextEditor;
  let timeout = null;

  vscode.window.onDidChangeActiveTextEditor(
    editor => {
      activeEditor = editor;
      editor && triggerUpdateDecorations();
    },
    null,
    context.subscriptions,
  );

  vscode.workspace.onDidChangeTextDocument(
    event => {
      activeEditor &&
        event.document === activeEditor.document &&
        triggerUpdateDecorations();
    },
    null,
    context.subscriptions,
  );

  const triggerUpdateDecorations = () => {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(updateDecorations, 250);
  };

  const updateDecorations = () => {
    if (!activeEditor) {
      return;
    }

    let loremMatch;
    let sentenceMatch;
    const content = activeEditor.document.getText();
    const languageId = activeEditor.document.languageId;
    const loremRegEx = /\blorem\b/gi;
    const lorems = [];
    const loremSentences = [];
    const sentenceRegEx = /(?:[a-z\d][^!?.>]*?|)\blorem\b[^!?.<]*/gim;

    if (languageId === 'html') {
      while ((loremMatch = loremRegEx.exec(content))) {
        const startPos = activeEditor.document.positionAt(loremMatch.index);
        const endPos = activeEditor.document.positionAt(
          loremMatch.index + loremMatch[0].length,
        );
        const decoration = {
          range: new vscode.Range(startPos, endPos),
        };

        lorems.push(decoration);
      }

      while ((sentenceMatch = sentenceRegEx.exec(content))) {
        const startPos = activeEditor.document.positionAt(sentenceMatch.index);
        const endPos = activeEditor.document.positionAt(
          sentenceMatch.index + sentenceMatch[0].length,
        );
        const decoration = {
          range: new vscode.Range(startPos, endPos),
          hoverMessage: 'Do **NOT** use "Lorem Ipsum"!',
        };

        loremSentences.push(decoration);
      }

      activeEditor.setDecorations(loremDecorationType, lorems);
      activeEditor.setDecorations(loremSentenceDecorationType, loremSentences);
    }
  };

  activeEditor && triggerUpdateDecorations();
}

exports.activate = activate;
