# Iblis Simple Crud

_**Beautiful React UI component built with Material-UI to manage (create, update and delete) a simple object list**_

[![NPM version](https://badge.fury.io/js/iblis-simple-crud.svg)](https://www.npmjs.com/package/iblis-simple-crud)

<!-- ![Example](./screenshots/example.png) -->

## Demos

- [Simple Demo](https://vdelacou.github.io/iblis-simple-crud/iframe.html?id=iblis-simple-crud-demo--page&viewMode=docs)
- [Storybook with complex example](https://vdelacou.github.io/iblis-simple-crud/)

## Why

When you develop a web app, you always need to have an UI to manage simple object. For example a list of admin email, a list of categories, ...
Mostly what you need is to edit one text field. You don't need pagination or filer, ect ...

After some search, no React component libraries has the following requirements :

- Written in pure Typescript
- Use last version of [Material-UI](https://material-ui.com/)
- Use last version of [Formik](https://jaredpalmer.com/formik/)
- Agnostic of any calling server libraries
- No state maintain by the components under the hood (if you want refresh the data, change the props of your component)
- Fully responsive
- Detailed documentation
- Easy to use and yet customizable
- Easy to change the look with Material-UI Theme

## Documentation and Basic Usage

All props and documented example can be found in the storybook

- [Basic usage](https://vdelacou.github.io/iblis-simple-crud/?path=/docs/iblis-simple-crud-props--page)

## Install

Install the library and the dependencies to your React project

`npm install iblis-simple-crud @material-ui/core @material-ui/icons @material-ui/styles formik@next`

## Test

You can see many visual implemenation of the components in the storybook

You can launch test by running `npm run test`

## Dev

To launch dev environement with storybook `npm run start` 

Then you will be able to see your components and test it on http://localhost:9010

All the documention and test are done in the `stories` folder

## Contribute

1.  [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2.  Make the necessary changes and ensure that the tests are passing
3.  Send a pull request

## Todo

- Write more tests with jest

## Known issues

- None for the moment

## Thanks

- [Material-UI](https://material-ui.com/) for the fantastic work
- [Formik](https://jaredpalmer.com/formik/) for make the form so easy to control

## License

Please, refer to LICENSE file
