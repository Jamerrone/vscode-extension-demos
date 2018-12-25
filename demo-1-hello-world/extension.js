// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "demo-1-hello-world" is now active!',
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let helloVSCode = vscode.commands.registerCommand(
    'extension.helloVSCode',
    function() {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage('Hello VS Code!');
    },
  );

  let currentTime = vscode.commands.registerCommand(
    'extension.currentTime',
    () => vscode.window.showInformationMessage(new Date().toLocaleTimeString()),
  );

  context.subscriptions.push(helloVSCode);
  context.subscriptions.push(currentTime);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
