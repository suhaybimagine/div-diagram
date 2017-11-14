# DIV-Diagram
Sample project to demonstrate the possibility of building diagrams using only DOM elements.

Use it as a starter project for simple diagraming applications.

### Running Locally (Development Mode)

Run the following commands on terminal:

```sh
git clone https://github.com/suhaybimagine/imagination.git
npm install
npm run dev
```

When you running on development mode, make sure to comment the "link" tag that includes extracted styles. <b>Don't</b> forget to <b>remove that comment</b> when you're up to build the app for production.

```html
        ...
        <link href="css/common.css" rel="stylesheet" />
        <!-- <link href="release/styles.css" rel="stylesheet" /> -->
</head>
...
```

### Production

Use the following command to bundle the application:

```sh
npm run build
```

### Need Help?

If you are one of [Imagine Technologies](http://www.imagine.com.jo) developers please reach to [Suhayb Al-Absi](mailto:suhayb@imagine.com.jo). Otherwise, post an issue. ;)
