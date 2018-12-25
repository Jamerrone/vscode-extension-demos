# Demo 1: Hello World

Hello everyone and welcome to my first Visual Studio Code extension demo! In this series, I will be building multiple demos and each demo will be covering different aspects of the Visual Studio Code extensions API. In this first demo, we will be taking a look at the core concepts that will help you get up and running as soon as possible. We will be covering concepts like generating a new extension, developing it, understanding the most important files and packaging your extension so you can share it with your friends.

If something is not clear or you are looking for a more in-depth guide, I suggest you to take a look at the [official guide](https://code.visualstudio.com/api/get-started/your-first-extension) which is used as a base for this demo/guide.

## Generating your extension

The first thing you will need to do is to install [Yeoman](https://yeoman.io/) and the [VS Code Extension Generator](https://www.npmjs.com/package/generator-code). Also, keep in mind that we are going to be using npm as our package manager so you will need to have [Node.js](https://nodejs.org/en/) installed on your machine.

`npm install -g yo generator-code`

Next, you will need to generate a new extension project by running:

`yo code`

The generator will ask you a few basic questions like the desired extension name, description, etc. Fill in the requested information and you will be fine, just make sure you select `-> New Extension (JavaScript)` as the extension type or `-> New Extension (TypeScript)` if you prefer TypeScript.

When the generating progress is done, you can open up the newly created project folder using `code ./{extension name}`.

## Developing your extension

Before we make any code changes I suggest you to press `F5`. A new VS Code window should appear, now press `ctrl + shift + p` and start typing `Hello World`. You can now find a new command named `Hello World`. When you select it, it should display an alert message with `Hello World` as its content. Congratulations your first extension is up and running!

There are a few things going on here. There is a new command named `Hello World` and when that command is selected a function is fired that renders an alert message. This all happens thanks to `extension.js` and `package.json`.

In the `extension.js` file you can find the following code: `vscode.window.showInformationMessage('Hello World');`. Try updating the message to something else, you can also replace `showInformationMessage` with `showWarningMessage` or `showErrorMessage`. You should be able to see your code changes working if you press `F5` again and re-run the `Hello World` command. Quite easy right?

Now, you are probably wondering: How does this work? Well, there are 3 things going on. In your `package.json` file you can find the following code:

```json
  "activationEvents": [
    "onCommand:extension.helloWorld"
  ],
  "contributes": {
    "commands": [
      {
        "command": "extension.helloWorld",
        "title": "Hello World"
      }
    ]
  },
```

- Under `activationEvents` you can find `"onCommand:extension.helloWorld"`. This piece of code is what registers or activates your extension whenever the `Hello World` command is run.
- Under `contributes` -> `commands` you can find the newly added `Hello World` command. It has two properties, a title, and a command. This piece of code is what makes the `Hello World` command available in the Command Palette. The important part here is that the `command` property must match the `onCommand` from `activationEvents`.

The last piece of the puzzle can be found in the `extension.js` file:

```javascript
function activate(context) {
  let helloWorld = vscode.commands.registerCommand(
    'extension.helloWorld',
    function() {
      vscode.window.showInformationMessage('Hello World!');
    },
  );

  context.subscriptions.push(helloWorld);
}
```

- `vscode.commands.registerCommand()` is the function that binds the command from the `package.json` file. In other words, whenever the `Hello World` command is run, this function is fired. Al that this function actually does is displaying the alert message you saw earlier.

Now, are you ready to write your own command? We will be writing a new command named `Current Time` that displays a message, just like the `Hello World` command but with the current time as its content. Inside the `activate` function under the `helloWorld` function, add the following code:

```javascript
let currentTime = vscode.commands.registerCommand('extension.currentTime', () =>
  vscode.window.showInformationMessage(new Date().toLocaleTimeString()),
);

context.subscriptions.push(currentTime);
```

I chose to use of the arrow function syntax for this example, but you can write a normal function if you prefer. All that this code does is render a new information alert with `showInformationMessage` that has the current time as its value: `new Date().toLocaleTimeString()`. Now all you need to do is to update your `package.json` file to look something like this:

```json
  "activationEvents": [
    "onCommand:extension.helloWorld",
    "onCommand:extension.currentTime"
  ],
  "contributes": {
    "commands": [
      {
        "command": "extension.helloWorld",
        "title": "Hello World"
      },
      {
        "command": "extension.currentTime",
        "title": "Current Time"
      }
    ]
  }
```

That is all there is to it! You should be able to run your new command just like you did in the `Hello World` example. Now let's package our extension so you can share it with your friends.

## Sharing your extension

If you are interested in publishing your extension to the marketplace please follow this [official guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension). If all you want to do is packaging your extension so you can share it with your friends or colleagues, keep on reading.

The first thing you will need to do is installing VSCE (Visual Studio Code Extensions). VSCE is a command line tool for packaging, publishing and managing VS Code extensions.

`npm install -g vsce`

Next, you should change your extension version from `0.0.1` to `1.0.0` in your `package.json` file. In that same file, you will need to add a publisher, in my case it looks like this: `"publisher": "james-perrone"`.

Now that we have everything ready, you can package your extension with the following command: (Just make sure you run this at the root of your project.)

`vsce package`

That's it! You should now have a new file called `{extension name}-1.0.0.vsix`. This extension can be shared with anyone you like and can be installed with `code --install-extension {extension name}-1.0.0.vsix`
