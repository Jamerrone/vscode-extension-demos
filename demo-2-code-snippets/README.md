# Demo 2: Code Snippets

On this second demo, we are going to take a look at code snippets. Code snippets are easy to create but can boost your productivity to a whole new level. Code Snippets are a great place to start because they do not require any JavaScript or advanced logic. They are built in a JSON format that is easy to understand even for the non-programmers among us.

## Generating your extension

Just like in our first example we will be using [Node.js](https://nodejs.org/en/), [Yeoman](https://yeoman.io/) and the [VS Code Extension Generator](https://www.npmjs.com/package/generator-code) to build our project. If you need any help installing the required tools please revisit our first [guide/demo](../demo-1-hello-world/README.md).

In order to generate a new project run:

`yo code`

Just like before, the generator will be asking you a few basic questions. Make sure you select `-> New Code Snippets` as the extension type, do not import any existing snippets and choose a language ID of your choice. In my case, I chose `javascript` so if you want to follow along, I suggest you to do the same. Do not worry if you want to support multiple languages, we will be covering this as well. In case you do not know which language IDs are available, you can find a list of the supported IDs in the official [VS Code website](https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers).

## Developing your code snippets

Your newly generated project folder should have a very similar structure to the first demo. However, you may have noticed that we don't have a file named `extensions.js`. This is because code snippets are written in JSON files and not in JavaScript. As you can see we have a folder named `snippets` with a file named `snippets.json`, this file is where we will be writing our code snippets.

If you open up your `package.json` file you can find the following code:

```json
"contributes": {
  "snippets": [
    {
      "language": "javascript",
      "path": "./snippets/snippets.json"
    }
  ]
}
```

If you want to work in multiple files or if you want to add support for multiple languages you could do something like this:

```json
"contributes": {
  "snippets": [
    {
      "language": "javascript",
      "path": "./snippets/snippets.json"
    },
    {
      "language": "python",
      "path": "./snippets/python-snippets.json"
    }
  ]
}
```

Just keep in mind that your code snippets will only work on files of the chosen language. If you want your JavaScript snippets to work on `.html` files you will need to add a new object to the `snippets` array that has a language of `html` and the same `path` as the JavaScript one.
