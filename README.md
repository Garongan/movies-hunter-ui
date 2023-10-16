# Recreate Movie Hunter with ui.shacdn

Movies Hunter UI is a web application that allows you to search for movies and access detailed information about them. It's built using the React library, Vite framework, Tailwind Css, Ui Shadcn, and Typescript, the website use TMDB (The Movie Database) API to fetch movie data.

# Screenshot

![Movies Hunter UI Screenshot](screenshot.png)

## Features

- Search for movies by title.
- View detailed information about a movie, including release date and rating.
- Discover now playing movie in teather, popular movies now, top-rated movies all of time, and upcoming movies.
- Responsive design for a seamless experience on desktop and mobile devices.

## Demo

You can try out Movies Hunter UI by visiting [Demo Link](https://movies-hunter-ui.vercel.app).

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
