

## Secure coding
  1. [Basics](#Basics)
  2. [Logs](#logs)
  3. [CORS](#cors)
  4. [Auth](#auth)
  5. [SQL Injection](#sql-injection)
  6. [XSS - Cross Site Scripting](#xss-attack)
  7. [IDOR - Insecure Direct Object Reference](#idor)
  8. [DoS - Deny of Service](#dos)
  9. [DDoS - Distributed DoS Attack](#ddos)
  10. [Bots](#protection-against-bots)
  11. [Helmet](#helmet)

### **Basics**
    
Writing correct code for a security perspective.  
This is something that programmers must do.  
There are several basic principles that we should implement in the code we write.  

**[⬆ back to top](#secure-coding)**

## **Logs**

Documentation must be performed on the server-side by writing to a Log file. These logs capture errors that occurred on the server and sometimes record system actions.

**Error Report on Production**

System errors in the Production environment should not be reported to the user.

If a crash occurs, the crash message contains sensitive information about our system, such as database names, table names, column names, ports, and more.

In the Production environment, we provide a general message to the Front for system crashes (5xx errors).

**[⬆ back to top](#secure-coding)**

## **CORS**
Cross-Origin Resource Sharing is a policy implemented by browsers that states the following: If the Front-end performs an AJAX request to a Back-end that is not hosted on the same origin as the Front-end, the browser initiates a pre-flight request to verify and authorize the actual request made to the server.

CORS should only be allowed for our own website if the data belongs exclusively to us, and CORS should not be granted to the entire world if the data is not intended for everyone.

To install the CORS library on the server-side:
```
npm i cors
npm i @types/cors -D
```
Code example:

```
server.use(cors()); // Enable cors for any frontend.
server.use(cors({ origin: ["http://localhost:3000", "http://some-other-site.com"] })); // Enable cors only for those websites.
server.use(cors({ origin: "http://localhost:3000" })); // Enable cors only for this frontend.
```

**[⬆ back to top](#secure-coding)**

## **Auth**

Authentication & Authorization
In the world of REST APIs, the commonly accepted practice today is to use JWT (JSON Web Tokens).

**Passwords**

- Passwords and other sensitive information should not be returned within the token!
- Storing passwords in plain text in the database is prohibited (password that stored as-is)!
However, passwords are not encrypted. Encryption refers to a reversible operation on the code that involves an algorithm for decryption. 
Passwords are "hashed." Hashing means a one-way code transformation. There is no algorithm that returns the original string from a hash string. Additionally, the same input will always produce the same hash (for the same hashing algorithm) that is unique only to the input string that created it.
- It is mandatory to protect against overly simple passwords:
  - Users should be required to enter a strong password (lowercase letter + uppercase letter + digit + special character, etc.).
  - Salt should be applied to the original password and then hashed.
- For Production, real usernames and passwords should be used for the database (not root and an empty password).

Code example:

```
import crypto from "crypto";

const salt = "TheAmazing4578-85Students!";

// Hash password:
function hashPassword(plainText: string): string {

    // SHA = Secure Hashing Algorithm
    // MD5 = Message Digest algorithm #5
    // HMAC = Hash based Message Authentication Code

    // Hash without salt:
    // const hashedText = crypto.createHash("sha512").update(plainText).digest("hex");

    // Hash with salt:
    const hashedText = crypto.createHmac("sha512", salt).update(plainText).digest("hex");

    return hashedText;
}

```

**localStorage or sessionStorage**

- If we want logged-in users to remain logged in even after closing the browser, we store the token in localStorage.
- If we don't want logged-in users to remain logged in after closing the browser, we store the token in sessionStorage.
- Sometimes it is advisable to display a "Remember Me" checkbox. Checking the checkbox will store the token in localStorage, while leaving it unchecked will store the token in sessionStorage.

**[⬆ back to top](#secure-coding)**

## **SQL Injection**
"Injecting" a piece of SQL query into a text/input/channel/Query String, etc., that is combined with the original query and alters its intended meaning.

Example with a username:  

```ABC' OR 1=1 --```

Therefore, the executed query would be:

```SELECT * FROM users WHERE username = 'ABC' OR 1=1 -- ' AND password = '1234'```

which successfully retrieves all users.


Solution: Building queries using Prepared Statements - a query that does not contain the values within it and does not include the single quotation marks that represent strings. Instead, a question mark is used in place of each value (string or non-string) in the query.

For example, instead of the query:

```SELECT * FROM users WHERE username = '___' AND password = '___'```

the query would be:  

```SELECT * FROM users WHERE username = ? AND password = ?```

Then, the query and the values are sent separately to the DAL (Data Access Layer), which combines them within the query by performing automatic Escaped Character processing.

Code example:

Send secured query:
```
const sql = `INSERT INTO forum VALUES(DEFAULT, ?, ?)`; // Set ? instead values

await dal.execute(sql, [message.sender, message.text]); // Send the values separated as array of values. Its matches each "?" in same order as passed items in arr
```

Dal service, adapted to use prepared statements:
```
// Connection dal func, using mysql library:
function execute(sql: string, values?: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        connection.query(sql, values, (err, result)=>{
            if(err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

```

**[⬆ back to top](#secure-coding)**

## **XSS Attack**

XSS stands for Cross Site Scripting. It refers to a situation where our website allows users to input data that is later displayed in the browser, usually to all users.

If an attacker enters HTML code, the browser may render it. 

If an attacker inserts JavaScript code within a ```<script>``` tag, the browser may execute that code, which can be malicious.

One solution is to remove any existing tags from the data before it enters the database.

A library that can perform this task is:

```npm i striptags```.

Code example:

Prevent-XSS middleware:

```
import stripTags from "striptags";

// <h1>Some text</h1> --> Some text

function preventXss(request: Request, response: Response, next: NextFunction) {

    // Run on request.body props:
    for(const prop in request.body) {

        // If string - stript tags:
        if(typeof request.body[prop] === "string") {
            request.body[prop] = stripTags(request.body[prop]);
        }
    }

    next();
}

export default preventXss;
```

And register it as middleware:

```
server.use(preventXss);
```

**[⬆ back to top](#secure-coding)**

## **IDOR**
IDOR stands for Insecure Direct Object Reference. 

It refers to a situation where an attacker can access other resources, references, or data by modifying the identifier or reference in the request.

For example, user 1 are going to edit his personal data - its site url is: /user/edit/4 (4 is the userId). 

Then he may access to other user data and change it, just by change the userId. 

To prevent it, we can build custom middleware that compares userId from token to userId from route. Here is the code example of how it may look:

```
jwt.verify(token, jwtSecretKey, (err: JsonWebTokenError, container: any) => {
    if (err) {
        resolve(false);
        return;
    }
    const user: UserModel = container.user;
    
    // Verify that given id is the same as token id:
    if (user.id !== id) {
        resolve(false);
        return;
    }

    resolve(true);
});
```
 
**[⬆ back to top](#secure-coding)**

## **DoS**

DoS stands for Denial of Service. It is a situation where an attacker continuously sends a large amount of data or performs repetitive actions on a website, overwhelming its resources and preventing regular users from accessing it.

Solution: A library that prevents excessive browsing from the same IP address.

Installation:

```npm i express-rate-limit```

**[⬆ back to top](#secure-coding)**

## **DDoS**

DDoS stands for Distributed Denial of Service Attack. It is an attack in which the attacker modifies the IP address in each request. The server then sees the requests coming from different users and does not block them as it would in a DoS attack. To date, there is no absolute protection against such attacks. There are products that can be installed on servers to monitor statistics and make educated guesses about whether multiple requests are legitimate or a DDoS attack.

**[⬆ back to top](#secure-coding)**

## **Protection against Bots**
BOT is short for ROBOT. It refers to software or scripts that perform actions as if a human had done them, such as posting comments or opening accounts.

Protection: CAPTCHA

CAPTCHA stands for Completely Automated Public Turing test to tell Computers and Humans Apart. The popular CAPTCHA solution today is reCAPTCHA by Google, which uses AI to verify the mouse movement and keyboard input of the user to determine if they are a real human.

Installation in Front-end:

```npm i react-google-recaptcha ```

```npm i @types/react-google-recaptcha```

**[⬆ back to top](#secure-coding)**

## **Helmet**
Helmet is a middleware that helps prevent problematic or dangerous headers. It adds an extra layer of security to your application.