# SQL Language

SQL (Structured Query Language) is a language that allows you to perform data selection from a relational database (which contains tables), as well as add, update, delete, create new tables, and more. The code is a string, and strings are not case-sensitive.

The first word in each SQL command determines what the command does:

- `SELECT` - selects data without changing it in the database
- `INSERT` - adds new data
- `UPDATE` - updates existing data
- `DELETE` - deletes existing data
- `CREATE` - creates a structure in the database, such as tables, columns, links... (usually not done from the REST API).

## SELECT Commands

**Selecting all columns and rows from a table**
```
SELECT * FROM products
```

**Selecting specific columns and all rows from a table**
```
SELECT ProductName, UnitPrice, UnitsInStock FROM products
```

**Selecting columns with aliases for column names. The original name in the database does not change, only the returned data will come with the aliases**
```
SELECT ProductID AS id, ProductName AS name, UnitPrice AS price, UnitsInStock AS stock FROM products
```

**Selecting all columns, but only rows that meet a certain condition**
```
SELECT * FROM products WHERE UnitPrice > 50
```

**AND**
```
SELECT * FROM products WHERE UnitPrice > 50 AND UnitPrice < 90
```

**OR**
```
SELECT * FROM products WHERE UnitPrice > 100 OR UnitPrice < 10
```

**NOT**
```
SELECT * FROM products WHERE NOT UnitPrice >= 10
```

**BETWEEN**
```
SELECT * FROM products WHERE UnitPrice BETWEEN 10 AND 20
```

**IN**
```
SELECT * FROM products WHERE UnitPrice IN (10, 20, 30)
```

**LIKE**
```
SELECT * FROM products WHERE ProductName LIKE 'Ch%'
```

**Sorting**
```
SELECT * FROM products WHERE UnitPrice BETWEEN 10 AND 20 ORDER BY UnitPrice
SELECT * FROM products WHERE UnitPrice BETWEEN 10 AND 20 ORDER BY UnitPrice DESC
```

**Secondary sorting**
```
SELECT * FROM products WHERE UnitPrice BETWEEN 10 AND 20 ORDER BY UnitPrice, ProductName
```

**NULL values**
NULL means that there is no value. 
It's not 0, not an empty string, not a space. 
Therefore, NULL cannot be compared to any of those. 
Only by using the IS or IS NOT operator:
```
SELECT * FROM suppliers WHERE Fax IS NULL
SELECT * FROM suppliers WHERE Fax IS NOT NULL
```

**Using scalar functions (scalar = in physics, it means a single value)**
A scalar function is a function that takes a value and returns a single value from it. That is, if a column is given to such a function - a value will be returned from each cell, and therefore, we will also get a column.

```
SELECT ProductName, UnitPrice, CEIL(UnitPrice), FLOOR(UnitPrice), ROUND(UnitPrice, 1)
FROM products
```
```
SELECT ProductName, UPPER(ProductName), LOWER(ProductName), LENGTH(ProductName)
FROM products
```
```
SELECT FirstName, LastName, UPPER(Country) AS 'Country',
DATE_FORMAT(BirthDate, '%d/%m/%Y') AS 'BirthDate' FROM employees ORDER BY FirstName
```

**Grouping functions**
These are functions that take a column but return a single value from all the values in it or from a group of values in it.

```
SELECT AVG(UnitPrice), MIN(UnitPrice), MAX(UnitPrice), SUM(UnitPrice), COUNT(UnitPrice)
FROM Products
```
```
SELECT CategoryID, AVG(UnitPrice) FROM Products GROUP BY CategoryID
```
```
SELECT UPPER(city) AS City, COUNT(*) AS 'Total Employees'
FROM employees GROUP BY City ORDER BY City
```

**LIMIT**
```
SELECT ProductName, UnitPrice FROM products LIMIT 10
```
```
SELECT ProductName, UnitPrice FROM products ORDER BY UnitPrice DESC LIMIT 10
```

**Paging/Pagination**
```
SELECT ProductID, ProductName, UnitPrice FROM products LIMIT 20, 7
```

**Distinct UNION**
Brings data from multiple tables that contain identical column names into one table that contains all the data from a single column.

```
SELECT Phone FROM customers UNION SELECT Phone FROM suppliers
```
```
SELECT Phone, fax FROM customers UNION SELECT Phone, fax FROM suppliers
```

**Duplicated UNION**
```
SELECT Phone FROM customers UNION ALL SELECT Phone FROM suppliers
```
```
SELECT Phone, fax FROM customers UNION ALL SELECT Phone, fax FROM suppliers
```
**JOIN**
Returning data from multiple tables with a specific relationship (usually one-to-many)
```
SELECT ProductName, UnitPrice, CategoryName
FROM products JOIN categories
ON products.CategoryID = categories.CategoryID
```

When a column with the same name exists in both tables, it is mandatory to specify from which table to bring it:
```
SELECT ProductID, ProductName, UnitPrice, categories.CategoryID, CategoryName
FROM products JOIN categories
ON products.CategoryID = categories.CategoryID
```

The same as above, but giving aliases to the tables:
```
SELECT ProductID, ProductName, UnitPrice, C.CategoryID, CategoryName
FROM products AS P JOIN categories AS C
ON P.CategoryID = C.CategoryID
```

```
SELECT ProductName, UnitPrice, CompanyName, ContactName
FROM products AS P JOIN suppliers AS S
ON P.SupplierID = S.SupplierID
```

**INNER JOIN**
This is the default JOIN. Only rows that have a match in both tables are returned.
```
SELECT ProductName, UnitPrice, CategoryName
FROM products AS P JOIN categories AS C
ON P.CategoryID = C.CategoryID
```

```
SELECT ProductName, UnitPrice, CategoryName
FROM products AS P INNER JOIN categories AS C
ON P.CategoryID = C.CategoryID
```

**LEFT JOIN**
Returns all rows from the table on the left side of the LEFT JOIN and only the matching rows from the right table:
```
SELECT ProductName, UnitPrice, CategoryName
FROM products AS P LEFT JOIN categories AS C
ON P.CategoryID = C.CategoryID
```

**RIGHT JOIN**
Returns all rows from the table on the right side of the RIGHT JOIN and only the matching rows from the left table:
```
SELECT ProductName, UnitPrice, CategoryName
FROM products AS P RIGHT JOIN categories AS C
ON P.CategoryID = C.CategoryID
```

**OUTER JOIN**
Returns all rows from both tables. There is no such command in MySQL. To perform this in MySQL, we perform a UNION of LEFT JOIN and RIGHT JOIN:
```
SELECT ProductName, UnitPrice, CategoryName
FROM products AS P LEFT JOIN categories AS C
ON P.CategoryID = C.CategoryID
UNION
SELECT ProductName, UnitPrice, CategoryName
FROM products AS P RIGHT JOIN categories AS C
ON P.CategoryID = C.CategoryID
```

**DISTINCT**
Returning data without duplicates:

```
SELECT DISTINCT City from employees
```

**EXISTS**
Returns 1 if records exist in the sub-query sent to the command or 0 if they do not exist:

```
SELECT EXISTS(SELECT City from employees WHERE City = 'London')
SELECT EXISTS(SELECT City from employees WHERE City = 'Jerusalem')
```

**DML - Data Manipulation Language**
These are commands for adding, updating, and deleting data.

**INSERT**
Adding a new row containing all the values of the table in the order of the columns (without writing the column names). For the primary key, it is mandatory to write DEFAULT instead.

```
INSERT INTO shippers VALUES(DEFAULT, 'ZIM', '04-9856985')
```

Adding a new row that describes which columns to enter values into:

```
INSERT INTO shippers(CompanyName, Phone) VALUES('Ashdod Port', '08-6541258')
```

**UPDATE**
Updating an existing record. If no WHERE condition is given, all records will be updated (usually not what we want).

```
UPDATE shippers SET CompanyName = 'The Amazing Zim', Phone = '041234567'
WHERE ShipperID = 7
```

**DELETE**
Deleting an existing record. If no WHERE condition is given, the system will try to delete all records (probably not what we want).

```
DELETE FROM shippers WHERE ShipperID = 9
```

**Exercises:**

Add a new product containing name, price, and quantity in stock:

```
INSERT INTO products(ProductName, UnitPrice, UnitsInStock) VALUES('Apple', 3.5, 100)
```

Update product 7 to a new price:

```
UPDATE products SET UnitPrice = 12.5 WHERE ProductID = 7
```

Delete the "Falafel" product that was added today:

```
DELETE FROM products WHERE ProductName = 'Falafel'
```

It is better to delete by ID, for example:

```
DELETE FROM products WHERE ProductID = 78
```

Delete an entire table if it exists:

```
DROP TABLE IF EXISTS students
```

Create a new table:

```
CREATE TABLE students ( 
StudentID INT PRIMARY KEY AUTO_INCREMENT,
FirstName VARCHAR(40) NOT NULL,
LastName VARCHAR(50) NOT NULL,
BirthDate DATE
)
```