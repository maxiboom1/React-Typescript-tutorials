# React-Typescript-tutorials

## What is this page about

My main goal is to summarize the coding techniques we used to learn in React with Typescript, and provide simple example to each one. This is not about theory. I hope that this cheat sheet will help students not to drown at the start in interfaces, models, classes, react hooks itc... This specific material are based on React course in John Bryce, 2023.  

## Installations

> React init.
```
1. NodeJs install.
2. npm i -g create-react-app  => React global install on PC.
3. create-react-app my-project-name --template typescript  => Create React project.
4. npm start  => run React project.
5. npm i  =>  auto-download all packeges in "dependencies" (while you run prject on new workspace).
```

## Interpolation

> Wrapping the variables inline.
```
const percent = 10;
<span>Only today - {percent}% off on all store shoes!</span>
```

## Conditional rendering

> Show the content on specific condition.

Interpolation with ternary operator: 
```
{isWeakend() ? <span>Pizza 🍕 </span> : <span>Cake🎂</span>}
```


