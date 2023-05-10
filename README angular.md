## Angular with Typescript

## Table of Contents

1. [Installation](#installation)
2. [Annotations](#annotations)
3. [Module](#module)
4. [Data Binding](#data-binding)
    -[Emit events from child to parent](#Emitting-events-from-child-to-parent)
5. [Directive](#directive)
6. [Pipe](#pipe)
7. [Routing](#routing)
8. [TVR-Template Reference Variable](#TVR-template-reference-variable)
9. [Dependency Injection](#dependency-injection)
10. [Forms and validation](#Forms-and-validations)
11. [Accessing a Remote Server](#accessing-a-remote-server)
  
## Installation

```
npm install -g @angular/cli => Globally, once per PC 

ng new my-angular-project --skip-tests => New project

ng serve => start angular app (write it in package.json start)

ng g c component/home-area/home --skip tests => Creates new component structure

```

**[⬆ back to top](#table-of-contents)**

## Annotation

This is a command that we write above some programming element such as a class, method, data-member, etc., that indicates something to the framework.
Every annotation starts with "@".
For example, "@Component" is an annotation that is written above a class and indicates to Angular that the class is a component.

**[⬆ back to top](#table-of-contents)**

## Module

This is a wrapper for components.
In Angular, a component should belong to one and only one module.
The AppModule is the main module that exists.

**[⬆ back to top](#table-of-contents)**

## Data Binding

A connection between a source and a target. Any changes made in the source affect the target.
There are four types of binding:

1. **Property Binding** - a binding between a variable in the component class and an HTML attribute. 
Any change in the variable affects the attribute.

2. **Event Binding** - a binding between an HTML tag event and a function in the component class. The event triggers the function.

3. **Two-Way Binding** (also called banana in the box [()]) - a binding between an input box and a variable. 
Changing the input box value will immediately update the variable value. 
Changing the variable value will display it in the input box.
** Note that to use [(ngModel)] we have to import FormModule in app.module config file 

4. **Interpolation** - displaying data from the component class directly within the HTML.

Examples:
```
// TS
export class HomeComponent {
  // 1. Property binding
  public tooltip = Math.random() > 0.5 ? "value-a" : "value-b"
  // 2. Event binding 
  public search(){
    alert('Button clicked');
    this.textToSearch = 'new'
  }
  // 3. Two-way binding (Banana in the box)
  public textToSearch: string;

}
// HTML
<div>
    <!-- 1. Property binding -->
    <label [title]="tooltip">Label</label> 
    <!-- 2. Event binding -->
    <button (click)="search()">Search</button>
    <!-- 3. Two-way binding -->
    <input type="search" [(ngModel)]="textToSearch">
    <!-- 4. Interpolation  -->
    <p>{{textToSearch}}</p>

</div>

```

### ***Emitting events from child to parent***

You can create event and pass data in child component, and catch those events in parent component.

***In child component:***

1. Create event in child component(Note that we must to use @Output() annotation):
```
    @Output()
    public deleteMe = new EventEmitter<number>(); // deleteMe is the event name

```
2. Create handler func to get data and trigger event (it will be triggered from html btn):
```
public async deleteBook() {
        this.deleteMe.emit(this.book.bookId);
    }
```
***In parent component:***

3. Add attribute with the name of event in parent HTML section:
```
   <app-book-card *ngFor="let b of books" [book]="b" (deleteMe)="deleteThisBook($event)"></app-book-card>
```
4. Catch this event in parent handler func:
```
   public async deleteThisBook(bookId: number) {
      /// Do stuff with data
    }

```

**[⬆ back to top](#table-of-contents)**

## Directive

Custom HTML Attribute is an attribute written in Angular that behaves like an HTML attribute.

There are two types of directives:

1. **Attribute Directive** - changes made to the tag itself, such as structural changes, design changes, and changes in behavior.
```
public style = {color: Math.random() > 0.5 ? "red" : "blue"}
<span [ngStyle]="style">Our Products</span>
```
2. **Structural Directive** - an attribute that instructs how many times to insert the tag into the DOM. It can be 0 or more times. 
Every Structural Directive starts with an asterisk (*).
```
// Render or not => *ngIf
<span *ngIf="isWeekend()">Our Products</span>
// Array render => *ngFor
<span *ngFor="let p of products">{{d.name}}</span>

```

**[⬆ back to top](#table-of-contents)**

## Pipe

The change that occurs on the value displayed in Interpolation.
In practice, this is a function that receives the value and returns a different value.
Because it is a function, it can accept arguments, for example - configuration of the change.
```
public price = 50;
public date = new Date();
<span> {{price | currency:"USD"}} // expected output : 50$ 
<span> {{time | date:"MMMM YYYY"}} // expected output : April 2023
```
You can read more here:
https://angular.io/api?type=pipe

**[⬆ back to top](#table-of-contents)**

## Routing
1. Place router special tag whenever we want it (usually in site layout section):
```
<main>
  <router-outlet></router-outlet>
</main>
```
Now, we will see the routed pages in this section.

2. Config the routes in app-routing.module.ts
It should look like this:

```
const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "list", component: ListComponent },
    { path: "insert", component: InsertComponent },
    // Default route
    { path: "", redirectTo: "/home", pathMatch: "full" },
    // Page not found
    { path: "**", component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
```
3. Assign navigate links to trigger routes, using routerLink (for example, from nav-bar):
```
    <a routerLink="/home">Home</a>
    <span> | </span>
    <a routerLink="/list">List</a>
    <span> | </span>
    <a routerLink="/insert">Insert</a>
```

**[⬆ back to top](#table-of-contents)**

## TVR-Template Reference Variable 

A unique identifier we give to a tag.
It is known not to give any id to tags in a component-based project.
This is an invented word written with the # sign. Behind the scenes, this is the actual object in the DOM that represents the tag.
This object can be accessed from another component in the HTML, from TypeScript, or sent to a function in TypeScript.

In this example - we get selector value access using TVR in 3 different ways :

```
<select #myLocation (change)="display(myLocation)">
    <option>North</option>
    <option>South</option>
    <option>East</option>
    <option>West</option>
</select>

<!-- First access: -->
<span>My Location: {{myLocation.value}}</span>
```
TS file of same component:
```
// Second access:
public display(myLocation: HTMLSelectElement): void {
    alert("Location: " + myLocation.value);
}

// Third access - get value from script using @ViewChild annotation:
@ViewChild("myLocation")
public myLocationWrapper: ElementRef<HTMLSelectElement>;

public show() : void {
    const myLocation = this.myLocationWrapper.nativeElement;
    alert("Location: " + myLocation.value);
}
```

**[⬆ back to top](#table-of-contents)**

## Dependency Injection
DI - This is a design pattern that allows the framework to provide us with a specific object required by the class we are building.

```
class CalculateSomething {
// We need some system object…
public constructor(theNeededObject: SomeUtility) { … }
}
```

We request the object in the constructor of the class we are building.
The framework should create the object from our class and inject the required object into it.
So, we don't export singleton, since framework runs it automatically on load (because of DI).

**[⬆ back to top](#table-of-contents)**

## Forms and validations

Angular has its own validations mechanism. However, you can bypass them, and use regular HTML5 validations, with "ngNativeValidate" attribute:
```
    <form ngNativeValidate>
    
        <input name="search" type="search" required> <!-- required will work here! -->

        <button (click)= "search()">Search</button>
    
    </form>
```

**[⬆ back to top](#table-of-contents)**

## Accessing a remote server:
We use a service called HttpClient that exists in the HttpClientModule module, which we need to import into our module.
In this example we build service that gets data from URL:
* Note we use @Injectable annotation to make this object accessible in app scope.

```
@Injectable({
    providedIn: "root" // Tells Angular to create an object from this class in the application scope
})
export class ProductsService {

    // DI:
    public constructor(private http: HttpClient) { } // Using access modifier is an ts feature to make this var accessible without the constructor

    // Get all products: 
    public async getAllProducts(): Promise<ProductModel[]> {

        // Create an Observable which can get products from the server: 
        const observable = this.http.get<ProductModel[]>(appConfig.productsUrl);

        // Convert this observable into Promise so we can await on it:
        const products = await firstValueFrom(observable);

        // Return the response products:
        return products;
    }
}

```

Then, use it in component:
* Note we use here OnInit function that is lifecycle func, and similar to useEffect

```
export class ProductListComponent implements OnInit {

    public products: ProductModel[];

    public constructor(private productsService: ProductsService) { }

    public async ngOnInit() { // Like React's componentDidMount / useEffect
        try {
            this.products = await this.productsService.getAllProducts();
        }
        catch (err: any) {
            alert(err.message);
        }
    }

}
```

**[⬆ back to top](#table-of-contents)**

## Observable
This is an object that comes from an external library that also exists in Angular called "rxjs".
This object is similar to a Promise but much more powerful and capable.
A Promise is used to run asynchronous code and report success or failure.
An Observable is used to run asynchronous code but can report information over time, or a single failure.
Examples of implementation:

The Socket.io mechanism reports information to a Service in Angular every time interval, and we want to report the information to the component every time it arrives.
A service that randomly picks a color at a certain time interval and reports it.
A service that browses a remote server at a certain time interval and receives information and reports it.

**[⬆ back to top](#table-of-contents)**