# React-Typescript-tutorials

## Table of Contents
  1. [Installations](#Installations)
  2. [Interpolation](#Interpolation)
  3. [Conditional rendering](#Conditional_rendering)
  4. [Displaying lists](#Displaying_lists)
  5. [Events](#Events)
  6. [Media](#Media)
  7. [Props](#Props)
  8. [State and side effect](#State_and_side_effect)
        - [useState](#useState)
        - [useEffect](#useEffect)
  9. [Routing](#Routing)
  10. [Ajax, Services, Models, AppConfig](#Ajax) 


## What is this?

My main goal is to summarize the coding techniques we used to learn in React with Typescript, and provide simple example to each one. 

This is not about theory. 

I hope that this cheat sheet will help students not to drown at the start in interfaces, models, classes, react hooks itc... This specific material are based on React course in John Bryce, 2023 by lecturer Assaf Finkelshtein.  

## Installations

> React install, project install (ts template), run.
```
1. NodeJs install.
2. npm i -g create-react-app  => React global install on PC.
3. create-react-app my-project-name --template typescript  => Create React project.
4. npm start  => run React project.
5. npm i  =>  auto-download all packages in "dependencies" (while you run project on new workspace).
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
**[⬆ back to top](#table-of-contents)**


## Conditional_rendering

> Show the content on condition. There is 3 main techniques: 

1. Interpolation with ternary operator: 
```
{ isWeekend() ? <span>Pizza 🍕 </span> : <span>Cake🎂</span> }
```
2. Short cuit - condition, then logic && or ||, then HTML to render:

```
{ isWeekend() && <span>Pizza 🍕 </span> }
```
3. Condition with other 'return' that return HTML.


```
if isWeekend() return <span>Today is weekend</span>;

return (
    <span>Today is regular day</span>
);
```
**[⬆ back to top](#table-of-contents)**


## Displaying_lists

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
**[⬆ back to top](#table-of-contents)**


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

**[⬆ back to top](#table-of-contents)**


## Media

> Create Assets/Images folder, place the file there. Import it and use it as an "src" in img tag:

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

**[⬆ back to top](#table-of-contents)**



## Props

> Props can be passed from parent to child element. Child should configure expected props type with 'interface':
```
interface SaleProps {
    discount: number;
    category: string;
}

function Sale(props: SaleProps): JSX.Element {
    return (
        <div className="Sale Box">
			<span>{props.discount}% discount on all {props.category}</span>
        </div>
    );
}
```
> And the parent pass props to child:
```
<Sale discount={10} category="Candies" />
```

**[⬆ back to top](#table-of-contents)**



## State_and_side_effect


- **Hooks** - react system functions - we can't change their names. 

- **Lifecycle Hooks** - those special functions will work only in class component.

- **React Hooks** - those special functions will work only in functional component. They starts with keyword "use". Since we prefer to use FC, we focus on them.

### useState

State is an special variable. React monitors them, and if their values change, react will re-render the component.
> When we call to useState react hook - we also have to specify the type of data we want to manage, and the initial value to the state. The function returns array with 2 items:
1. The first item is actually a state variable.
2. The second item is an state setter, with that setter we set new values to state (this func is also an trigger to render page)

```
    const sellerNameArr = useState<string>("");
    const sellerName = sellerNameArr[0]; // First item in the array is the state variable we need.
    const setSellerName = sellerNameArr[1]; // Second item in the array is a function for changing the variable.
```
3. There is also short syntax to assign the state and setter func to variables - using Array Destructuring Assignment:
```
const [num, setNum] = useState<number>(0);
```
4. We also can use our custom created type:
```
const [product, setProduct] = useState<ProductModel>();
```
**[⬆ back to top](#table-of-contents)**


### useEffect

- **Side-Effect** - A React side-effect occurs when we use something that is outside the scope of React.js in our React components e.g. the Browser APIs like localStorage, AJAX calls, accessing browser Window object etc. We cant perform actions with side effect in our functional component! This will cause infinite loop. For those cases, we have useEffect rect hook.

> useEffect used to perform side-effect functionality in fc. There is 3 timing setups we can use:

1. Using this config, the function will run once on component build:
```
useEffect(()=>{
    // ...
},[]);
``` 
2. Using this config it will run each time one of variables in array will change:
```
let a={}, b={}, c={};

useEffect(()=>{
    // ...
},[a, b, c]);
``` 
3. Using this config, the the code in 'return' will be executed on component destroy:
```
useEffect(()=>{
    return() =>{
        // ...
    }
},[]);

```
4. You can mix them together in one useEffect func:

```
let a={}, b={}, c={};

useEffect(()=>{
    // Code to run once on load
    return()=>{
        // Code to run on destroy
    }
},[a, b, c]);
```
**[⬆ back to top](#table-of-contents)**



## Routing
### Install
```
npm i react-router-dom @types/react-router-dom
```
**1.** The first step is to wrap our App with BrowserRouter tag:

```
import { BrowserRouter } from 'react-router-dom';

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
```

**2.** The best practice is to create routing component. It may include:
- Custom route, to different part of site/API
- Default route - what component should be loaded on default route
- Not-existing route - what component should be loaded on not-existing route

```
function Routing(): JSX.Element {
    return (

        <Routes>

            {/* Some Route: */}
            <Route path="/about" element={<About />} />

            {/* Default Route: */}
            <Route path="/" element={<Navigate to="/home" />} />

            {/* Page not found: */}
            <Route path="*" element={<PageNotFound />} />

        </Routes>

    );
}

export default Routing;
```

**3.** Then, we need to mount our Routing component somewhere in our site layout:
```
<main>
    <Routing />
</main>
```

**4.** Create navigation links. 
>  Don't use HTML a tag, since it have render problems. Use NavLink instead:
```
import { NavLink } from "react-router-dom";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/about">About</NavLink>
        </div>
    );
}

export default Menu;

```
**5.** Route from code, instead of NavLink:
> We use useRoute hook to do that:
```
import { useNavigate } from "react-router-dom";

function goHome(): JSX.Element {
    
    const navigate = useNavigate();
    
    function goHome(): void {
        navigate("/home");
    }

    return (
        <button onClick={goHome}>Home</button>
    );
}

```

**[⬆ back to top](#table-of-contents)**

## Ajax, Services, Models, AppConfig 

### **Install**
> npm i axios

### **Concept**

The most standard task in  modern web application is sending HTTP request to external API.

When we perform such request, the best practice to do is:

1. Create global 'AppConfig' and write the API URL there.
2. Create model class to describe returned data.
3. Create service class, who actually will perform axios requests.
4. Create component to render the returned data.

### **AppConfig**

Class that contains common configuration to our application, for example the URL of the necessary resources. It should be in global scope, and can be accessed from anywhere in our app. Usually we will export instance of this class (its called "singleton"). For example:

```
class AppConfig {
    public registerUrl = "http://localhost:3030/api/auth/register/";
    public loginUrl = "http://localhost:3030/api/auth/login/";  
}

const appConfig = new AppConfig(); // Singleton
export default appConfig;
```

### **Model**

Class that describes pure data type of the returned object. For example employee obj, or product obj... To configure class variables without initialize, we should add to tsconfig.json this setting:
> "strictNullChecks": false

Example Model:
```
class CredentialsModel {
    public username: string; // username AND NOT userName
    public password: string;
}

export default CredentialsModel;
```

### **Service**

This component performs only logic, and don't have UI. Usually we perform axios request and handle the response. Example:

```
import axios from "axios";
import ProductModel from "../Models/ProductModel";
import appConfig from "../Utils/AppConfig";

class ProductsService {

    // Get all products: 
    public async getAllProducts(): Promise<ProductModel[]> {

        // Get from REST API products: 
        const response = await axios.get<ProductModel[]>(appConfig.productsUrl);

        // Extract products: 
        products = response.data; // data will be ProductModel[]

        // Update global store: 
        productsStore.dispatch({ type: ProductsActionType.FetchProducts, payload: products });

        // Return:
        return products;
    }

}

const productsService = new ProductsService(); // Singleton

export default productsService;

```
**[⬆ back to top](#table-of-contents)**

