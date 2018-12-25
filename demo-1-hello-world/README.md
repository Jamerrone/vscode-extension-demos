# Demo 1: Hello World

Hello everyone and welcome to my first Visual Studio Code extension demo! I will be building different demo's and each demo will be covering different aspects of the extensions API. In this first demo, we will be taking a look at the basics that will get you up and running. We will be covering stuff like generating a new extension, editing it, understanding the most important files and packaging your extension so you can share it with your friends.

If something is not clear or you are looking for a more in-depth guide I suggest you to take a look at the [official guide](https://code.visualstudio.com/api/get-started/your-first-extension) which is used as a base for this demo.

## Generating your extension

The first thing you will need to do is to install [Yeoman](https://yeoman.io/) and the [VS Code Extension Generator](https://www.npmjs.com/package/generator-code). Also, keep in mind that we are going to be using npm as our package manager so you will need to have [Node.js](https://nodejs.org/en/) installed on your machine.

`npm install -g yo generator-code`

Next, you will need to generate a new extension project by running:

`yo code`

The generator will ask you a few basic questions like the desired extension name, description, etc. Fill in the requested information and you will be fine, just make sure you select `New Extension (JavaScript)` as the extension type or `New Extension (TypeScript)` if you prefer TypeScript.

When the generating progress is done, you can open up the newly created project folder using `code ./{extension name}`.

## Developing your extension

## Sharing your extension

If you are interested in publishing your extension to the marketplace please follow this [official guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension). If all you want to do is packaging your extension so you can share it with your friends or colleagues, keep on reading.

The first thing you will need to do is installing VSCE (Visual Studio Code Extensions). VSCE is a command line tool for packaging, publishing and managing VS Code extensions.

`npm install -g vsce`

Next, you should change your extension version from `0.0.1` to `1.0.0` in your `package.json` file. In that same file, you will need to add a publisher, in my case it looks like this: `"publisher": "james-perrone"`.

Now that we have everything ready, you can package your extension with the following command: (Just make sure you run this at the root of your project.)

`vsce package`

That is it! You should now have a new file called `{extension name}-1.0.0.vsix`. This file can be shared with anyone you like and can be installed with `code --install-extension {extension name}-1.0.0.vsix`
