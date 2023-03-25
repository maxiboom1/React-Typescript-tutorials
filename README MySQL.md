שפת SQL

SQL
Structured Query Language
זו שפה המאפשרת לבצע בחירת מידע ממסד נתונים רלציוני (מכיל טבלאות), להוסיף, לעדכן, למחוק, ליצור טבלאות חדשות ועוד.
הקוד הינו מחרוזת, המחרוזות אינן Case Sensitive.

המילה הראשונה בכל פקודת SQL קובעת מהי הפקודה:
SELECT – בחירת מידע מבלי לשנות את המידע במסד הנתונים.
INSERT – הוספת מידע חדש.
UPDATE – עדכון מידע קיים.
DELETE – מחיקת מידע קיים.
CREATE – יצירת מבנה במסד הנתונים כמו טבלאות, עמודות, קישורים... (לרוב לא נבצע מה-REST API).

פקודות SELECT

בחירת כל העמודות וכל הרשומות מטבלה:
SELECT * FROM products
בחירת עמודות מסוימות וכל הרשומות מטבלה:
SELECT ProductName, UnitPrice, UnitsInStock FROM products
בחירת עמודות עם כינויים לשמות העמודות. השם המקורי במסד הנתונים לא משתנה, רק המידע המוחזר יגיע עם הכינויים:
SELECT ProductID AS id, ProductName AS name, UnitPrice AS price, UnitsInStock AS stock 
FROM products
בחירת כל העמודות אך רק רשומות העונות על תנאי מסוים:
SELECT * FROM products WHERE UnitPrice > 50
AND
SELECT * FROM products WHERE UnitPrice > 50 AND UnitPrice < 90



OR
SELECT * FROM products WHERE UnitPrice > 100 OR UnitPrice < 10
NOT
SELECT * FROM products WHERE NOT UnitPrice >= 10
BETWEEN
SELECT * FROM products WHERE UnitPrice BETWEEN 10 AND 20
IN
SELECT * FROM products WHERE UnitPrice IN (10, 20, 30)
LIKE
SELECT * FROM products WHERE ProductName LIKE 'Ch%'
מיון:
SELECT * FROM products WHERE UnitPrice BETWEEN 10 AND 20 ORDER BY UnitPrice
SELECT * FROM products WHERE UnitPrice BETWEEN 10 AND 20 ORDER BY UnitPrice DESC
מיון משני:
SELECT * FROM products WHERE UnitPrice BETWEEN 10 AND 20 ORDER BY UnitPrice, ProductName
ערכי NULL
NULL זה אומר שאין ערך. זה לא 0. זה לא מחרוזת ריקה. זה לא רווח. לכן לא ניתן להשוות NULL לכל אחד מאלו.
ניתן להשוות רק ע"י אופרטור IS או IS NOT:
SELECT * FROM suppliers WHERE Fax IS NULL
SELECT * FROM suppliers WHERE Fax IS NOT NULL
שימוש בפונקציות סקלריות (סקלר = מפיזיקה זה ערך בודד)
פונקציה סקלרית זו פונקציה המקבלת ערך ומחזירה ממנו ערך בודד.
כלומר אם ניתן עמודה לפונקציה כזו – מכל תא יוחזר ערך, לכן נקבל גם כן עמודה.
SELECT ProductName, UnitPrice, CEIL(UnitPrice), FLOOR(UnitPrice), ROUND(UnitPrice, 1)
FROM products

SELECT ProductName, UPPER(ProductName), LOWER(ProductName), LENGTH(ProductName)
FROM products

SELECT FirstName, LastName, UPPER(Country) AS 'Country',
DATE_FORMAT(BirthDate, '%d/%m/%Y') AS 'BirthDate' FROM employees ORDER BY FirstName

פונקציות Grouping
אלו פונקציות המקבלות עמודה אך מחזירות ערך בודד מכלל הערכים שבה או מקבוצת ערכים שבה.
SELECT AVG(UnitPrice), MIN(UnitPrice), MAX(UnitPrice), SUM(UnitPrice), COUNT(UnitPrice)
FROM Products

SELECT CategoryID, AVG(UnitPrice) FROM Products GROUP BY CategoryID

SELECT UPPER(city) AS City, COUNT(*) AS 'Total Employees'
FROM employees GROUP BY City ORDER BY City

LIMIT
SELECT ProductName, UnitPrice FROM products LIMIT 10

SELECT ProductName, UnitPrice FROM products ORDER BY UnitPrice DESC LIMIT 10

Paging / Pagination
SELECT ProductID, ProductName, UnitPrice FROM products LIMIT 20, 7

Distinct UINION
מביאה מידע ממספר טבלאות המכילות שמות זהים של עמודות לטבלה אחת המכילה את כלל המידע בעמודה אחת.
SELECT Phone FROM customers UNION SELECT Phone FROM suppliers
SELECT Phone, fax FROM customers UNION SELECT Phone, fax FROM suppliers
Duplicated UNION
SELECT Phone FROM customers UNION ALL SELECT Phone FROM suppliers
SELECT Phone, fax FROM customers UNION ALL SELECT Phone, fax FROM suppliers


 

JOIN
החזרת מידע ממספר טבלאות המכילות קשר מסוים ביניהן (לרוב קשר יחיד לרבים):
SELECT ProductName, UnitPrice, CategoryName
FROM products JOIN categories
ON products.CategoryID = categories.CategoryID
עמודה בעלת שם זהה בשתי הטבלאות – חובה לציין מאיזו טבלה להביא אותה:
SELECT ProductID, ProductName, UnitPrice, categories.CategoryID, CategoryName
FROM products JOIN categories
ON products.CategoryID = categories.CategoryID
כנ"ל, אך מתן כינויים לטבלאות:
SELECT ProductID, ProductName, UnitPrice, C.CategoryID, CategoryName
FROM products AS P JOIN categories AS C
ON P.CategoryID = C.CategoryID

SELECT ProductName, UnitPrice, CompanyName, ContactName
FROM products AS P JOIN suppliers AS S
ON P.SupplierID = S.SupplierID

INNER JOIN
זה ה-Default – JOIN רגיל – מוחזרות רק רשומות הקשורות בין שתי הטבלאות.
SELECT ProductName, UnitPrice, CategoryName
FROM products AS P JOIN categories AS C
ON P.CategoryID = C.CategoryID

SELECT ProductName, UnitPrice, CategoryName
FROM products AS P INNER JOIN categories AS C
ON P.CategoryID = C.CategoryID
LEFT JOIN
החזרת כל הרשומות מהטבלה שנמצאת משמאל לפקודה LEFT JOIN ורק את התואמות להן מהטבלה שמימין:
SELECT ProductName, UnitPrice, CategoryName
FROM products AS P LEFT JOIN categories AS C
ON P.CategoryID = C.CategoryID
RIGHT JOIN
החזרת כל הרשומות מהטבלה שנמצאת מימין לפקודה RIGHT JOIN ורק את התואמות להן מהטבלה שמשמאל:
SELECT ProductName, UnitPrice, CategoryName
FROM products AS P RIGHT JOIN categories AS C
ON P.CategoryID = C.CategoryID








OUTER JOIN
החזרת כל הרשומות משתי הטבלאות. אין פקודה כזו ב-MySQL. בכדי לבצע זאת ב-MySQL אנו מבצעים UNION על LEFT JOIN יחד עם RIGHT JOIN:
SELECT ProductName, UnitPrice, CategoryName
FROM products AS P LEFT JOIN categories AS C
ON P.CategoryID = C.CategoryID
UNION
SELECT ProductName, UnitPrice, CategoryName
FROM products AS P RIGHT JOIN categories AS C
ON P.CategoryID = C.CategoryID

תרגיל:
הציגו את הטבלה הבאה:
OrderID | OrderDate | CompanyName | Country
שתי העמודות הראשונות הינן מטבלת Orders.
שתי העמודות האחרונות הינן מטבלת Customers.
יש להביא רק הזמנות שבוצעו ב-1996
פתרון:
SELECT OrderID, OrderDate, CompanyName, Country FROM orders AS O JOIN customers AS C ON O.CustomerID = C.CustomerID WHERE YEAR(OrderDate) = 1996

DISTINCT
החזרת מידע ללא כפילויות:
SELECT DISTINCT City from employees
EXISTS
מחזירה 1 אם קיימות רשומות בתת השאילתה שנשלחה לפקודה או 0 אם לא קיימות:
SELECT EXISTS(SELECT City from employees WHERE City = 'London')
SELECT EXISTS(SELECT City from employees WHERE City = 'Jerusalem')



פקודות DML – Data Manipulation Language
אלו פקודות הוספה, עדכון, מחיקה.
INSERT – הוספת שורה חדשה המכילה את כלל הערכים של הטבלה לפי סדר העמודות (ללא כתיבת שמות העמודות).
במקום המפתח הראשי חובה לכתוב DEFAULT
INSERT INTO shippers VALUES(DEFAULT, 'ZIM', '04-9856985')
הוספת שורה חדשה המתארת לאלו עמודות להכניס ערכים:
INSERT INTO shippers(CompanyName, Phone) VALUES('Ashdod Port', '08-6541258')

UPDATE – עדכון רשומה קיימת. אם לא נותנים תנאי WHERE, כלל הרשומות יעודכנו (לרוב לא נרצה דבר כזה):
UPDATE shippers SET CompanyName = 'The Amazing Zim', Phone = '041234567'
WHERE ShipperID = 7
DELETE – מחיקת רשומה קיימת. אם לא נותנים תנאי WHERE, המערכת תנסה למחוק את כלל הרשומות (כנראה לא טוב לנו)
DELETE FROM shippers WHERE ShipperID = 9


תרגילים:
הוסיפו מוצר חדש המכיל שם, מחיר, כמות במלאי:
INSERT INTO products(ProductName, UnitPrice, UnitsInStock) VALUES('Apple', 3.5, 100)

עדכנו את מוצר 7 למחיר חדש:
UPDATE products SET UnitPrice = 12.5 WHERE ProductID = 7

מיחקו את ה-Falafel שהוספתם היום:
DELETE FROM products WHERE ProductName = 'Falafel'
עדיף למחוק לפי ID, לדוגמה:
DELETE FROM products WHERE ProductID = 78


מחיקת טבלה שלמה אם היא קיימת:
DROP TABLE IF EXISTS students

יצירת טבלה חדשה:
CREATE TABLE students ( 
StudentID INT PRIMARY KEY AUTO_INCREMENT,
FirstName VARCHAR(40) NOT NULL,
LastName VARCHAR(50) NOT NULL,
BirthDate DATE
)
