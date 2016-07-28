# Angular Blog

This project is a simple angular application which is based on [typicode.com](https://jsonplaceholder.typicode.com/) API services. [Live Demo](http://angular.mehabadi.ir/)

### Table of Contents
- [Installation](#installation)
- [Add Gulp to a Project](#add-gulp-to-a-project)
- [Install Bower](#install-bower)
- [Initialize the project](#initialize-the-project)
- [Run the project](#run-the-project)


### Installation

This project requires [Node.js](https://nodejs.org/) v4+ to run.

You need Gulp installed globally:

```sh
$ npm install -g gulp
```

### Add Gulp to a Project

From the terminal navigate to the project folder you want to use Gulp on; something like:

```sh
$ cd ~/projects/my-project
```

Now install Gulp locally:

```sh
$ npm install gulp
```

### Install Bower

Bower is a command line utility. Install it with npm.

```sh
$ npm install -g bower
```

### Initialize the project

Run following command and npm will look at the dependencies that are listed in package.json and download the latest versions satisfying server rules
for all of those.

```sh
$ npm install
```

- If you had error or missed some packages use following command.

  ```sh
  $ npm install <package-name>
  ```

Install packages with following command. Bower installs packages to bower_components/, and gulp moves assets to correct folders.

```sh
$ gulp load
```

### Run the project

Run the project with [gulp run](#).

```sh
$ gulp run
```

- Run gem install sass if you have this error. "Gem undefined is not installed."

  ```sh
  $ gem install sass
  ```
