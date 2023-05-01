## Table of Contents

- [Installation](#installation)
- [Annotations](#annotations)
- [Module](#module)
- [Data Binding](#data-binding)
- [Directive](#directive)
- [Pipe](#pipe)
- [Routing](#routing)
- [Template Reference Variable](#template-reference-variable)
- [Accessing a Remote Server](#accessing-a-remote-server)
  
## Installation

```
npm install -g @angular/cli => Globally, once per PC 

ng new my-angular-project --skip-tests => New project

ng serve => start angular app (write it in package.json start)

ng g c component/home-area/home --skip tests => Creates new component structure

```

## Annotation

This is a command that we write above some programming element such as a class, method, data-member, etc., that indicates something to the framework.
Every annotation starts with "@".
For example, "@Component" is an annotation that is written above a class and indicates to Angular that the class is a component.

## Module

This is a wrapper for components.
In Angular, a component should belong to one and only one module.
The AppModule is the main module that exists.

## Data Binding

A connection between a source and a target. Any changes made in the source affect the target.
There are four types of binding:

A. Property Binding - a binding between a variable in the component class and an HTML attribute. 
Any change in the variable affects the attribute.

B. Event Binding - a binding between an HTML tag event and a function in the component class. The event triggers the function.

C. Two-Way Binding (also called banana in the box [()]) - a binding between an input box and a variable. 
Changing the input box value will immediately update the variable value. 
Changing the variable value will display it in the input box.
** Note that to use [(ngModel)] we have to import FormModule in app.module config file 

D. Interpolation - displaying data from the component class directly within the HTML.

Examples:
```
// TS
export class HomeComponent {
  // A. Property binding
  public tooltip = Math.random() > 0.5 ? "value-a" : "value-b"
  // B. Event binding 
  public search(){
    alert('Button clicked');
    this.textToSearch = 'new'
  }
  // C. Two-way binding (Banana in the box)
  public textToSearch: string;

}
// HTML
<div>
    <!-- A. Property binding -->
    <label [title]="tooltip">Label</label> 
    <!-- B. Event binding -->
    <button (click)="search()">Search</button>
    <!-- C. Two-way binding -->
    <input type="search" [(ngModel)]="textToSearch">
    <!-- D. Interpolation  -->
    <p>{{textToSearch}}</p>

</div>

```

## Directive

Custom HTML Attribute is an attribute written in Angular that behaves like an HTML attribute.

There are two types of directives:

A. Attribute Directive - changes made to the tag itself, such as structural changes, design changes, and changes in behavior.
```
public style = {color: Math.random() > 0.5 ? "red" : "blue"}
<span [ngStyle]="style">Our Products</span>
```
B. Structural Directive - an attribute that instructs how many times to insert the tag into the DOM. It can be 0 or more times. 
Every Structural Directive starts with an asterisk (*).
```
// Render or not => *ngIf
<span *ngIf="isWeekend()">Our Products</span>
// Array render => *ngFor
<span *ngFor="let p of products">{{d.name}}</span>

```


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

## Template Reference Variable

A unique identifier we give to a tag.
It is known not to give any id to tags in a component-based project.
This is an invented word written with the # sign. Behind the scenes, this is the actual object in the DOM that represents the tag.
This object can be accessed from another component in the HTML, from TypeScript, or sent to a function in TypeScript.

## Accessing a remote server:
We use a service called HttpClient that exists in the HttpClientModule module, which we need to import into our module.

## Dependency Injection - DI
This is a design pattern that allows the framework to provide us with a specific object required by the class we are building.
class CalculateSomething {
// We need some system object…
public constructor(theNeededObject: SomeUtility) { … }

}
We request the object in the constructor of the class we are building.
The framework should create the object from our class and inject the required object into it.

## Observable
This is an object that comes from an external library that also exists in Angular called "rxjs".
This object is similar to a Promise but much more powerful and capable.
A Promise is used to run asynchronous code and report success or failure.
An Observable is used to run asynchronous code but can report information over time, or a single failure.
Examples of implementation:

The Socket.io mechanism reports information to a Service in Angular every time interval, and we want to report the information to the component every time it arrives.
A service that randomly picks a color at a certain time interval and reports it.
A service that browses a remote server at a certain time interval and receives information and reports it.