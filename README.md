# React-Typescript-tutorials

## What is this page about

My main goal is to summarize the coding techniques we used to learn in React with Typescript, and provide simple example to each one. This is not about theory. I hope that this cheat sheet will help students not to drown at the start in interfaces, models, classes, react hooks itc... This specific material are based on React course in John Bryce, 2023.  

## Installations

> React install, project install (ts template), run.
```
1. NodeJs install.
2. npm i -g create-react-app  => React global install on PC.
3. create-react-app my-project-name --template typescript  => Create React project.
4. npm start  => run React project.
5. npm i  =>  auto-download all packeges in "dependencies" (while you run prject on new workspace).
```
> Tools.
```
1. npm i -g react-cli-snippets  => tool to create react components, by Assaf Finkelshtein.
```

## Interpolation

> Wrapping the variables inline.
```
const percent = 10;
<span>Only today - {percent}% off on all store shoes!</span>
```

## Conditional rendering

> Show the content on condition. There is 3 main tequniques: 

1. Interpolation with ternary operator: 
```
{ isWeakend() ? <span>Pizza 🍕 </span> : <span>Cake🎂</span> }
```
2. Short Cuit - condition, then logic && or ||, then HTML to render:

```
{ isWeakend() && <span>Pizza 🍕 </span> }
```
3. Condition with other 'return' that return HTML.


```
if isWeakend() return <span>Today is weekend</span>;

return (
    <span>Today is regular day</span>
);
```

## Displaying lists

> Popular method to renders lists is map method: 
```
import "./Desserts.css";

function Desserts(): JSX.Element {

    const items = [ // Demo for getting the desserts from backend.
        { id: 1, name: "Apple Pie"},
        { id: 2, name: "Ice Cream"},
        { id: 3, name: "Pavlova"},
        { id: 4, name: "Eclair"}
    ];

    return (
        <div className="Desserts">
		    {items.map(item => <span key={item.id}>{item.name} 🍧 </span>)}
        </div>
    );
}

export default Desserts;
```

## Events

We can trigger functions from page events. Triggered function can be without args, with SyntheticEvent, or with customs args:

```
function Recommendations(): JSX.Element {

    // No arguments:
    function first(): void {
        console.log('click on btn');
    }

    // SyntheticEvent argument (or derivation):
    function second(args: SyntheticEvent): void {
        console.log(args);
    }

    // Getting my own arguments:
    function third(item: string, price: number): void {
        console.log(item, price);
    }

    return (
        <div className="Recommendations Box">

			<button onClick={first}>First</button>

			<button onClick={second}>Second</button>

			<button onClick={() => third("Apple Pie", 12)}>Third</button>

        </div>
    );
}
```
## Media

> Create Assets/Images folder, place the file there. Import it and use it as an "src" in <img> tag:

```
import imageSource from "../../../Assets/Images/dish.jpg";

function Dish(): JSX.Element {
    return (
        <div className="Dish">
            <img src={imageSource} />
        </div>
    );
}
```
