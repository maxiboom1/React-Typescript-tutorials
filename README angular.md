# Table of Contents

  1. [Installations](#installations)
  
## Installation

```
npm install -g @angular/cli => Globally, once per PC 

ng new my-angular-project --skip-tests => New project

ng serve => start angular app (write it in package.json start)

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

A. Property Binding - a binding between a variable in the component class and an HTML attribute. Any change in the variable affects the attribute.
```
example
```
B. Event Binding - a binding between an HTML tag event and a function in the component class. The event triggers the function.
```
example
```
C. Two-Way Binding - a binding between an input box and a variable. Changing the input box value will immediately update the variable value. Changing the variable value will display it in the input box.
```
example
```
D. Interpolation - displaying data from the component class directly within the HTML.
```
example
```