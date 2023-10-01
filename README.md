# Templace CLI (tcli)

## !This is my personal branch for the project template I use!

A locally installed CLI package for starting projects the quick way.

> Currently this project only supports the use of npm, support for yarn is on the way

## Install

1. In your terminal of choice clone this repo
```
git clone https://github.com/garrett-huggins/tcli
```
2. cd to the newly created `tcli` directory
```
cd tcli
```
3. Install dependencies
```
npm install
```
4. Create a local build
```
npm run build
```
5. Install globaly to use anywhere on your machine
```
npm install -g
```

## Usage

After installing, you now have access to your local `tcli` package that can be used to jump-start any project and help you get straight to the fun part.

To start using the package, run tcli
```
tcli
```
You will then be prompted to select any of the template projects found in the packages `templates` directory

![carbon (6)](https://github.com/garrett-huggins/tcli/assets/90536997/5ade64d1-cd0f-4ca1-aeb2-75c56ffec684)

After that you will be able to give your new project a name, wait for the templates dependencies to be installed, and your new project is ready.

![carbon](https://github.com/garrett-huggins/tcli/assets/90536997/4dae1570-254c-4362-ae87-587d529a7ea9)

## Adding A New Project Template

Why not publish `tcli` as an npm package?
The key to cloning the package and installing it from your local directory is you can now easily make changes to any of the template files and have access to them everywhere with just a simple re-build.

### Adding a new template project
1. In your `tcli` directory, create a new folder under `templates` and give it the name of the template project you are creating. This is the name you will see when selecting the project template from your cli
2. Add any of the files you wish to start your new projects with
3. Use `npm run build` to add your new project template
4. Re-install your new build with `npm install -g`

You will now see your new project template as an option the next time you run `tcli`

### Package.json template name
If your new project contains a `package.json` then you may also want to run `npm run dev-package` which will change the name in each of the templates' `package.json` to instead be a template variable that is set to the project name you provide when using `tcli`
