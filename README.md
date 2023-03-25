
# Table of Contents
## React with Typescript
  1. [ReactJs Installations](#ReactJs-intallation)
  2. [Interpolation](#Interpolation)
  3. [Conditional rendering](#Conditional-rendering)
  4. [Displaying lists](#Displaying-lists)
  5. [Events](#Events)
  6. [Media](#Media)
  7. [Props](#Props)
  8. [Hooks: useState, useEffect, useRef](#State-and-side-effect)
        - [useState](#useState)
        - [useEffect](#useEffect)
        - [useRef](#useRef)
  9. [Routing](#Routing)
  10. [Ajax, Services, Models, AppConfig](#Ajax-Services-Models-AppConfig) 
  11. [Form handling](#Form-handling)
  12. [Redux](#Redux)
  13. [Json Web Token - JWT](#Json-Web-Token)
  14. [Error Handling](#Error-handling)
  
  **Appendices:**

  15. [Project Files Structure](#project-file-structure)
  16. [Material UI](#material-ui)


## NodeJs
  1. [NodeJs Installations](#NodeJs-installations)
  
## **What is this?**

My main goal is to summarize the coding techniques we used to learn in React with Typescript, NodeJs (with mysql integration) and provide simple example to each one. 

I hope that this cheat sheet will help students not to drown at the start in complicated stuff of React, NodeJs, mysql etc... This specific material are based on Fullstack course in John Bryce, 2023 by lecturer Assaf Finkelshtein.  

## **ReactJs installations**

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
1. npm i -g react-cli-snippets  => tool to create React components, by Assaf Finkelshtein.
```

## **Interpolation**

> Wrapping the variables inline.
```
const percent = 10;
<span>Only today - {percent}% off on all store shoes!</span>
```
**[⬆ back to top](#table-of-contents)**


## **Conditional rendering**

> Show the content on condition. There is 3 main techniques: 

**1.** Interpolation with ternary operator: 
```
{ isWeekend() ? <span>Pizza 🍕 </span> : <span>Cake🎂</span> }
```
**2.** Short cuit - condition, then logic && or ||, then HTML to render:

```
{ isWeekend() && <span>Pizza 🍕 </span> }
```
**3.** Condition with other 'return' that return HTML.


```
if isWeekend() return <span>Today is weekend</span>;

return (
    <span>Today is regular day</span>
);
```
**[⬆ back to top](#table-of-contents)**


## **Displaying lists**

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


## **Events**

We can trigger functions from page events. Triggered function can be without args, with SyntheticEvent/ ChangeEvent etc.. , or with customs args:

```
function Recommendations(): JSX.Element {

    //1. No arguments:
    function first(): void {
        console.log('click on btn');
    }

    //2. SyntheticEvent argument (or derivation):
    function second(args: SyntheticEvent): void {
        console.log(args);
    }

    //3. Getting my own arguments:
    function third(item: string, price: number): void {
        console.log(item, price);
    }

    //4. Getting value from HTML element:
    function four(args: ChangeEvent<HTMLSelectElement>):void{
        alert(args.target.value); // Get value (myData) from HTML element
    }

    //5. Get value and store it in state (The trick is to set input value={text}):
    const [text,setText] = useState<string>("");
    function handleText(args: ChangeEvent<HTMLInputElement>): void {
        setText(args.target.value);
    }


    return (
        <div className="Recommendations Box">

			<button onClick={first}>First</button> 

			<button onClick={second}>Second</button>

			<button onClick={() => third("Apple Pie", 12)}>Third</button>

            <button value="myData" onClick={four}>Four</button>

            <!-- Option 2 - in this case function will expect just value (function four(value){...}) -->
            <button value="myData" onClick={(e)=>four(e)}>Four</button>

            <input type="text" value={text} onChange={handleText} />

        </div>
    );
}
```

**[⬆ back to top](#table-of-contents)**


## **Media**

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



## **Props**

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



## **Hooks: useState, useEffect, useRef**


- **Hooks** - React system functions - we can't change their names. 

- **Lifecycle Hooks** - those special functions will work only in class component.

- **React Hooks** - those special functions will work only in functional component. They starts with keyword "use". Since we prefer to use FC, we focus on them.

### **useState**

State is an special variable. React monitors them, and if their values change, React will re-render the component.
> When we call to useState React hook - we also have to specify the type of data we want to manage, and the initial value to the state. The function returns array with 2 items:
**1.** The first item is actually a state variable.
**2.** The second item is an state setter, with that setter we set new values to state (this func is also an trigger to render page)

```
    const sellerNameArr = useState<string>("");
    const sellerName = sellerNameArr[0]; // First item in the array is the state variable we need.
    const setSellerName = sellerNameArr[1]; // Second item in the array is a function for changing the variable.
```
**3.** There is also short syntax to assign the state and setter func to variables - using Array Destructuring Assignment:
```
const [num, setNum] = useState<number>(0);
```
**4.** We also can use our custom created type:
```
const [product, setProduct] = useState<ProductModel>();
```
**[⬆ back to top](#table-of-contents)**


### useEffect

- **Side-Effect** - A React side-effect occurs when we use something that is outside the scope of React.js in our React components e.g. the Browser APIs like localStorage, AJAX calls, accessing browser Window object etc. We cant perform actions with side effect in our functional component! This will cause infinite loop. For those cases, we have useEffect rect hook.

> useEffect used to perform side-effect functionality in fc. There is 3 timing setups we can use:

**1.** Using this config, the function will run once on component build:
```
useEffect(()=>{
    // Component build will trigger this code
},[]);
``` 
**2.** Using this config it will run each time one of variables in array will change:
```
let a={}, b={}, c={};

useEffect(()=>{
    // Any change in a, b, c will trigger this code
},[a, b, c]);
``` 
**3.** Using this config, the the code in 'return' will be executed on component destroy:
```
useEffect(()=>{
    return() =>{
        // Component destroy will trigger this code
    }
},[]);

```
**4.** You can mix them together in one useEffect func:

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


### **useRef**

useRef hook can be used to access DOM elements directly.

Example of how it works:

```
function List():JSX.Element {

    const elementValue = useRef(null); // Init hook and its value

    function printElementValue(){
        console.log(elementValue.current.value);
    }

    return (
        <div className="List">
            <label>useRef example:</label>
            <input ref={elementValue} type="number" />
            <button onClick={printElementValue} >Print input value</button>
        </div>
    );

}

```

**[⬆ back to top](#table-of-contents)**



## **Routing**
### **Install**
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

**6.** Pass parameter in route - Route parameter:
> We can pass parameters passed in URL and handle it - this is popular technique to pass data.

Configure first the route parameter in route:
```
{/* Access to /products/details/value will pass 'value' to the receiver*/}
<Route path="/products/details/:prodId" element={<ProductDetails />} />
```
To get the parameter, use useParams:

```
const params = useParams();
const passedParameter = params.prodId; // will contain the passed value. 
```

**[⬆ back to top](#table-of-contents)**

## **Ajax, Services, Models, AppConfig** 

### **Concept**

The most standard task in  modern web application is sending HTTP request to external API. In React, we use axios library to perform the requests.

When we perform such request, the best practice to do is:

1. Create global 'AppConfig' and write the API URL there.
2. Create model class to describe returned data.
3. Create service class, who actually will perform axios requests.
4. Create component to render the returned data.

### **Install**
> npm i axios

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
    public username: string;
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

### Interceptor

Interceptor is an special function that triggered on every response or request.

Using interceptors, you can interrupt every response or request, and modify it/ insert some additional data.

To configure interceptor, we usually open file in services folder. 

This example will add authorization header with the token from Redux state:

```

import axios from "axios";
import { authStore } from "../Redux/AuthState";

class InterceptorService {

    // Create interceptor:
    public create(): void {

        // Register to any request: 
        axios.interceptors.request.use(requestObject => {

            // If we have a token: 
            if(authStore.getState().token) {

                // Add authorization header, containing the token:
                requestObject.headers = {

                    // The needed header format: 
                    authorization: "Bearer " + authStore.getState().token // DON'T FORGET THE SPACE AFTER "Bearer "
                }

                // In other versions, it may looks like this:
                // requestObject.headers['Authorization'] = "Bearer " + authStore.getState().token;
                
            }

            // Return the updated request object:
            return requestObject;
        });
    }
}

const interceptorService = new InterceptorService();

export default interceptorService;

```
To start the interceptors, we have to run it at root level index.ts:

```

import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './Components/LayoutArea/Layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import interceptorService from './Services/InterceptorService';

// Create interceptors: 
interceptorService.create();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Layout />
    </BrowserRouter>
);


```

**[⬆ back to top](#table-of-contents)**

## **Form handling**

Its very easy to work with form in React using useForm React hook.

### **Install**
> npm i react-hook-form

This library contains 3 main elements:

- Register function - we use it inline in the input HTML tag to get parameter that matched the parameter from model.
- handleSubmit function - uses to bridge submit event with our custom handler function(who gets data from the form).
- setValue function - used to set initial values to form fields.


> When we mess with file uploads, we need to convert its data type, since in browser we get file collection and not single file.

Example:
```
import { useForm } from "react-hook-form";
import ProductModel from "../../../Models/ProductModel";

function AddProduct(): JSX.Element {

    const { register, handleSubmit } = useForm<ProductModel>();

    async function send(product: ProductModel) {
        
        // Convert image type to "File" type (that are configured like this in model)
        product.image = (product.image as unknown as FileList)[0];
        
        // axios action to external API... 
    }

    return (
        <div className="AddProduct Box">
            <!-- handleSubmit will send the data from the form to 'send' function -->
            <form onSubmit={handleSubmit(send)}> 

                <label>Name:</label>
                <input type="text" {...register("name")} required minLength={2} maxLength={100} />

                <label>Price:</label>
                <input type="number" {...register("price")} required min={0} max={1000} />

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image")} />

                <button>Add</button>

            </form>

        </div>
    );
}

export default AddProduct;

```

**[⬆ back to top](#table-of-contents)**

## **Redux**

Redux is an JS library to manage states in global scope.

Every component in our application can access it, and perform CRUD actions. In additional, every component can subscribe to state and get triggers on state changes!

### **Install**
> npm i redux


### **Redux terminology**

Those are the possible interactions with Redux:
- getState - get data from global state object (read)
- dispatch - add/update/delete data from global state object
- subscribe - user can get triggers on state change.

![alt text](screenshots/Redux.JPG)

### **Redux setup**


**1.** AppState - global state, available in global application scope. Configured in class. For example, products array will be described in ProductState class:
```
// 1. Products State - The application level state regarding products: 
export class ProductsState {
    public products: ProductModel[] = []; // ProductModel is an model that describes the product object
}
```
**2.** ActionType - describes the actions we can perform on our AppState. We build the action list in enum.
```
// 2. Products Action Type - Which actions we can perform on our products global state
export enum ProductsActionType {
    FetchProducts,
    AddProduct,
    UpdateProduct,
    DeleteProduct
}
```
**3.** Action - interface that describes object to perform one action on AppState. This object contains 'type' - what operation is requested, and the 'payload' - what data should be assigned to this type of operation:
```
// 3. Products Action - Interface describing an object for performing one action on our products global state:
export interface ProductsAction {
    type: ProductsActionType; // Which operation we're going to perform.
    payload: any; // What is the data related to that operation.
}
```
**4.** Reducer - the main function that perform actions on data and includes the logics. When we perform dispatch action (like update), we send action object (with type and payload), and its automatically passed to Reducer function. We never call the Reducer function directly, redux call automatically it when we do dispatch actions. Redux pass to Reducer function 2 arguments: 

- (a) The current AppState object
- (b) The Action object that we send in dispatch (action object includes type and payload)

Reducer function can't change the received state. So, we must copy received state, do needed action on copied object, and return the modified copy.

```
// 4. Products Reducer - The main function performing the needed action.
export function productsReducer(currentState = new ProductsState(), action: ProductsAction): ProductsState {

    // Duplicate current state into a new state:
    const newState = { ...currentState };

    // Perform the needed action on the newState:
    switch (action.type) {

        case ProductsActionType.FetchProducts: // Here, the payload is all products for saving
            newState.products = action.payload;
            break;

        case ProductsActionType.AddProduct: // Here, the payload is a product object for adding
            newState.products.push(action.payload);
            break;

        case ProductsActionType.UpdateProduct: // Here, the payload is a product object for updating
            const indexToUpdate = newState.products.findIndex(p => p.id === action.payload.id);
            if (indexToUpdate >= 0) {
                newState.products[indexToUpdate] = action.payload;
            }
            break;

        case ProductsActionType.DeleteProduct: // Here, the payload is the product id for deleting
            const indexToDelete = newState.products.findIndex(p => p.id === action.payload)
            if (indexToDelete >= 0) {
                newState.products.splice(indexToDelete, 1);
            }
            break;
    }

    // Return the newState: 
    return newState;
}
```
**5.** Store - Create the store object and start redux mechanism - we pass the reducer as an argument.

```
// 5. Products Store - The manager object handling redux:
export const productsStore = createStore(productsReducer);

```
Here is an full example of AuthState redux setup. Its also includes check for token in localStorage - so, if user are logged in and refreshed the page, he wont be dropped from the site:
```
import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import UserModel from "../Models/UserModel";

// 1. Global Auth State:
export class AuthState {
    
    public token: string = null;
    public user: UserModel = null;

    public constructor() {
        this.token = localStorage.getItem("token");
        if(this.token) {
            this.user = jwtDecode<{ user: UserModel }>(this.token).user; // Extract user from token.
        }
    }
}

// 2. Auth Action Type:
export enum AuthActionType {
    Register,
    Login,
    Logout
}

// 3. Auth Action:
export interface AuthAction {
    type: AuthActionType;
    payload?: string;
}

// 4. Auth Reducer: 
export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {

    // Create a new state: 
    const newState = { ...currentState };

    // Perform the needed action: 
    switch (action.type) {

        case AuthActionType.Register: // Here, the payload is a token
        case AuthActionType.Login: // Here, the payload is a token
            newState.token = action.payload;
            newState.user = jwtDecode<{ user: UserModel }>(action.payload).user; // Extract user from token.
            localStorage.setItem("token", newState.token);
            break;

        case AuthActionType.Logout: // Here, we don't have any payload
            newState.token = null;
            newState.user = null;
            localStorage.removeItem("token");
            break;
    }

    // Return new state: 
    return newState;
}

// 5. Auth Store:
export const authStore = createStore(authReducer);

```
### **getState, dispach, subcribe**

Dispach:
```
authStore.dispatch({type: AuthActionType.Login, payload: token});
```

Subscribe, un-subscribe, getState:
> In this example, we set redux state in useState hook inside component. Then, we subscribe to redux change, and update local state. To unsubscribe, just exec unsubscribe var in return of useEffect hook.
```
    const [user,setUser] = useState<UserModel>();

    useEffect(() => {

        setUser(authStore.getState().user);

        const unsubscribe = authStore.subscribe(()=>{
            setUser(authStore.getState().user); 
        });

        return () => unsubscribe();

    },[]);

```

**[⬆ back to top](#table-of-contents)**


## **Json Web Token**

JSON Web Token is a proposed Internet standard for creating data with optional signature and/or optional encryption whose payload holds JSON that asserts some number of claims. The tokens are signed either using a private secret or a public/private key. 

Once client access backend resource, backend server creates uniq token object with user data, expiration time etc... Once client get his token, he should save it, and send it with every HTTP request as an HTTP header. Its easy to work with JWT using jwt-decode package:

### **Install**
> npm i jwt-decode

Example:
```
import jwt_decode from "jwt-decode";
 
var token = "eyJ0eXAiO..." /// jwt token;
var decoded = jwt_decode(token);
 
console.log(decoded);
 
/* prints:
 * { foo: "bar",
 *   exp: 1393286893,
 *   iat: 1393268893  }
 */
 ```

 Example with TS (it's taken from full example of AuthState redux setup):

 ```
    newState.user = jwtDecode<{ user: UserModel }>(action.payload).user; // Extract user from token.
 ```

 ### **Interceptors**

Since we want to include token with every AJAX request to server, we will use interceptor. Interceptor example can be found in axios [section](#Interceptor) 

**[⬆ back to top](#table-of-contents)**

## Error handling

In general, don't show user internal or technic errors, like: "Request failed with status code 404". 

Instead, you should print to user something like "Incorrect username or password".

These error messages are returned from the server, but hidden by axios, so we need to fetch it from axios.response

Also, don't use alerts. The are old-fashioned, and process breakers. Also, you can't style them. 

The is many libraries to show notification - for example notyf.

### **Install**
```
npm i notyf
```

Here is an example of how to build NotifyService - it is good reference to how it should look like:

```
import { Notyf } from "notyf";

class NotifyService {

    private notyf = new Notyf({
        duration: 3000,
        position: { x: "center", y: "top" }
    });

    public success(message: string): void {
        this.notyf.success(message);
    }

    public error(err: any): void {
        const message = this.extractErrorMessage(err);
        this.notyf.error(message);
    }

    private extractErrorMessage(err: any): string {

        // If error is the message string: 
        if (typeof err === "string") return err;

        // If error thrown by axios:
        if (err.response?.data) return err.response.data;

        // Unknown error (JIC = Just in Case)
        return "Some error, please try again";
    }

}

const notifyService = new NotifyService();

export default notifyService;
```

**[⬆ back to top](#table-of-contents)**

-------------------------------------------------------------------------------------
## *Appendices*

## **Project file structure**

First of all, React uses PascalCase for classes and its filenames. Don't break this convention.
Good practice would be build your project src. folder with logic similar to this:

1. Assets - for media, images etc
2. Components, including:
    - LayoutArea - Layout, Routing, and Layout members should be here
    - SharedArea - Incudes shared components, for example spinner component
    - Rest of layer components like AboutArea, HomeArea, AuthArea, ProductsArea...
3. Models - includes model classes we use in our project
4. Redux - includes redux setup files as describes [here](#redux).
5. Services with app services - for example AuthService, InterceptorService, NotifyService etc...
6. Utils - with AppConfig file.


Of course, all of these are only recommendations for best practices. Technically, you can combine all that code to one file and it will work. But, we don't sure if you will able to work with it :)

This repository includes react project that demonstarate all the stuff we covered here. It works with local web server API called northwind. If you plan to play with that project, you should  clone that repo, npm i it, and install nortwind:

> npm i -g northwind-back-end

Then, just start the server with command 'northwind'.

**[⬆ back to top](#table-of-contents)**


## **Material UI**

Popular styling library with styled elements.

Available as component-based library, for React use. Official site: https://mui.com

### **Install**
> npm i @mui/material @emotion/react @emotion/styled

It has also nice icon collections:

> npm i @mui/icons-material

Just go here https://mui.com/material-ui/material-icons/ ,select the icon you need, copy the import path and use it in your component.

Here is an example of "contact us" page from our project, that uses it:

```

import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SendIcon from '@mui/icons-material/Send';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import "./ContactUs.css";

function ContactUs(): JSX.Element {
    return (
        <div className="ContactUs Box">

            <Typography variant="h3">
                <ContactMailIcon fontSize="large" />
                &nbsp;
                Contact Us
            </Typography>

            <form>

                <TextField label="Full name:" variant="outlined" className="InputBox" />

                <TextField label="Email:" variant="outlined" type="email" className="InputBox" />

                <TextField label="Message:" variant="outlined" className="InputBox" />

                <div className="Left">
                    <FormControlLabel label="Send me promotional emails" control={<Checkbox />} />
                </div>

                <ButtonGroup fullWidth variant="contained">
                    <Button color="primary">Send &nbsp; <SendIcon /> </Button>
                    <Button color="secondary" type="reset">Clear &nbsp; <HighlightOffIcon /> </Button>
                </ButtonGroup>

            </form>

        </div>
    );
}

export default ContactUs;


```

Thank you! 

Feel free to contact me if you have any questions :)

Alex, 2023.

**[⬆ back to top](#table-of-contents)**



## NodeJs


## **NodeJs Installations**

> NodeJs project install:
```
1. npm init -y  => creates package.json project config file.
2. npm i -g nodemon => global install of nodemon tool to hot-reloading.
3. npm i -g ts-node =>  global install of nodejs typescript.
4. npm i @types/node -D => project install of types for nodejs, we instll it only for devDependencies (-D).
5. Create tsconfig.json config file with:
    {
        "compilerOptions": {
            "target": "ES6",
            "esModuleInterop": true,
            "moduleResolution": "Node",
        }
    }
6. npm i express => express install, library to manage REST API. 
7. npm i @types/express -D => types for express (with -D)
```
> Tools that may be usefull:
```
1. npm i -g javascript-obfuscator  => tool to transform code to make it harder to understand and steal.
2. Postman utility for debuging our server application.
```


## Project structure
Root will contain project config files (package.json, package-lock.json, tsconfig.json) and src folder.

src folder will contain this:

![alt text](screenshots/src-structure.JPG)

The app.ts file 

## Node js layered architecture

A small app consists of three (3) layers: Router Layer, Service Layer, and Data Access Layer (DAL). The number of layers will depend on how complex your app turns out. Router Layer contains the app programming interface (API) routes of the app. Its only job is to return a response from the server.

![alt text](screenshots/layered-architecture1.JPG)

## Create an basic REST API server

1. We will use local json file with superheroes, it will be in src/1-assets/data/superheroes.json:

```
[
    {
        "id": 1,
        "name": "Spiderman12",
        "ability": "Stick on walls using spider web"
    },
    {
        "id": 2,
        "name": "Superman",
        "ability": "Amazing power, Laser eyes"
    },
    {
        "id": 3,
        "name": "Batman",
        "ability": "Very rich and smart"
    },
    {
        "id": 6,
        "name": "Wonderwomen",
        "ability": "Amazing strength"
    }
]
```

2. Create superhero model in 2-models/superhero-model.ts:

```
class SuperheroModel {

    public id: number;
    public name: string;
    public ability: string;

    public constructor(superhero: SuperheroModel) { // Copy Constructor
        this.id = superhero.id;
        this.name = superhero.name;
        this.ability = superhero.ability;
    }
}

export default SuperheroModel;
```
> The copy constructor will explained later.

3. Create data access layer (DAL) - in 4-utils/dal.ts:

```
import fsPromises from "fs/promises";
import SuperheroModel from "../2-models/superhero-model";

// File location:
const superheroesFile = "./src/1-assets/data/superheroes.json";

// Get all superheroes from file:
async function getAllSuperheroesFromFile(): Promise<SuperheroModel[]> {

    // Read file content as a JSON string:
    const content = await fsPromises.readFile(superheroesFile, "utf-8");

    // Convert JSON string to array:
    const superheroes = JSON.parse(content);

    // Return:
    return superheroes;
}

// Save all superheroes to file:
async function saveAllSuperheroesToFile(superheroes: SuperheroModel[]): Promise<void> {

    // Create JSON string from array:
    const content = JSON.stringify(superheroes, null, 4);

    // Save content to JSON file:
    await fsPromises.writeFile(superheroesFile, content);
}

export default {
    getAllSuperheroesFromFile,
    saveAllSuperheroesToFile
};

```

4. Create service in 5-services/superheroes-service.ts - here we do the necessary logics:

```
import SuperheroModel from "../2-models/superhero-model";
import dal from "../4-utils/dal";

// Get all superheroes:
async function getAllSuperheroes(): Promise<SuperheroModel[]> {

    // Get all superheroes from file:
    const superheroes = await dal.getAllSuperheroesFromFile();

    // Return:
    return superheroes;
}

// Get one superhero:
async function getOneSuperhero(id: number): Promise<SuperheroModel> {

    // Get all superheroes from file (in real database we're get only needed one):
    const superheroes = await dal.getAllSuperheroesFromFile();

    // Find needed superhero:
    const superhero = superheroes.find(h => h.id === id); // Returns undefined if not found.

    // Return:
    return superhero;
}

// Add new superhero:
async function addSuperhero(superhero: SuperheroModel): Promise<SuperheroModel> {

    // Get all superheroes from file:
    const superheroes = await dal.getAllSuperheroesFromFile();

    // Create new id for the given object (database will do it automatically):
    superhero.id = superheroes[superheroes.length - 1].id + 1;

    // Add object to array:
    superheroes.push(superhero);

    // Save all back to file:
    await dal.saveAllSuperheroesToFile(superheroes);

    // Return added object:
    return superhero;
}

// Update full superhero:
async function updateFullSuperhero(superhero: SuperheroModel): Promise<SuperheroModel> {

    // Get all superheroes from file:
    const superheroes = await dal.getAllSuperheroesFromFile();

    // Find index of the object to update:
    const index = superheroes.findIndex(h => h.id === superhero.id);

    // Update that object:
    superheroes[index] = superhero;

    // Save all back to file:
    await dal.saveAllSuperheroesToFile(superheroes);

    // Return updated object:
    return superhero;
}

// Update partial superhero:
async function updatePartialSuperhero(superhero: SuperheroModel): Promise<SuperheroModel> {

    // Get desired object from database: 
    const dbSuperhero = await getOneSuperhero(superhero.id);

    // Change only given fields:
    for (const prop in dbSuperhero) {
        if (superhero[prop] !== undefined) {
            dbSuperhero[prop] = superhero[prop];
        }
    }

    // Update back to database:
    await updateFullSuperhero(dbSuperhero);

    // Return updated object:
    return dbSuperhero;
}

// Delete existing superhero:
async function deleteSuperhero(id: number): Promise<void> {

    // Get all superheroes from file:
    const superheroes = await dal.getAllSuperheroesFromFile();

    // Find index of the object to update:
    const index = superheroes.findIndex(h => h.id === id);

    // Delete that object:
    superheroes.splice(index, 1);

    // Save all back to file:
    await dal.saveAllSuperheroesToFile(superheroes);
}

export default {
    getAllSuperheroes,
    getOneSuperhero,
    addSuperhero,
    updateFullSuperhero,
    updatePartialSuperhero,
    deleteSuperhero
};

```

5. Create routes in 6-routes/superheroes-routes.ts:

```
import express, {Request, Response } from "express";
import SuperheroModel from "../2-models/superhero-model";
import superheroesService from "../5-services/superheroes-service";

// Create superheroes router:
const router = express.Router(); // Capital R

// GET http://localhost:4000/api/superheroes
router.get("/api/superheroes", async (request: Request, response: Response) => {

    // Get all superheroes:
    const superheroes = await superheroesService.getAllSuperheroes();

    // Response back:
    response.json(superheroes);

});

// GET http://localhost:4000/api/superheroes/:id
router.get("/api/superheroes/:id([0-9]+)", async (request: Request, response: Response) => {

    // Extract id from route:
    const id = +request.params.id;

    // Get that superhero:
    const superhero = await superheroesService.getOneSuperhero(id);

    // Response back:
    response.json(superhero);

});

// POST http://localhost:4000/api/superheroes
router.post("/api/superheroes", async (request: Request, response: Response) => {

    // Get superhero from body:
    const superhero = new SuperheroModel(request.body); // Literal Object

    // Add it to database:
    const addedSuperhero = await superheroesService.addSuperhero(superhero);

    // Response back:
    response.status(201).json(addedSuperhero);

});

// PUT http://localhost:4000/api/superheroes/:id
router.put("/api/superheroes/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {

    // Take route id into the body:
    request.body.id = +request.params.id;

    // Get superhero from body:
    const superhero = new SuperheroModel(request.body);

    // Update it in database:
    const updatedSuperhero = await superheroesService.updateFullSuperhero(superhero);

    // Response back:
    response.json(updatedSuperhero);

});

// PATCH http://localhost:4000/api/superheroes/:id
router.patch("/api/superheroes/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {

    // Take route id into the body:
    request.body.id = +request.params.id;

    // Get superhero from body:
    const superhero = new SuperheroModel(request.body);

    // Update it in database:
    const updatedSuperhero = await superheroesService.updatePartialSuperhero(superhero);

    // Response back:
    response.json(updatedSuperhero);

});

// DELETE http://localhost:4000/api/superheroes/:id
router.delete("/api/superheroes/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {

    // Take route id:
    const id = +request.params.id;

    // Delete that item:
    await superheroesService.deleteSuperhero(id);

    // Response back:
    response.sendStatus(204);

});

export default router;

```

6. Finally, setup the server in app.ts:

```
import express from "express";
import superheroesRoutes from "./6-routes/superheroes-routes";

// Create one server:
const server = express();

// Build request.body from given JSON:
server.use(express.json());

// Combine superheroes routes into our server:
server.use("/", superheroesRoutes);

// Run server: 
server.listen(4000, () => console.log("Listening on http://localhost:4000"));

```