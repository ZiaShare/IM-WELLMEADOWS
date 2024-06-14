## Instructions

## Beginning to the End

1. gi download nako utro sa terminal git clone https://github.com/JeymsKun/Wellmeadows/.
2. then gi open nako ang folder ani.
3. nangita kog source para sugdan ang pag access sa PostgreSQL.
4. pag human sa guide sa source, nag sugod nakog sa terminal ani npm init -y.
5. npm init -y, meaning is create basic package.json, makita didto tanan like author, license, etc.
6. lahi sya compare sa react na package.json.
7. wala ko kabalo aning package.json.
8. human nag install kog dependencies like database driver, salamat sa source.
9. utro sa terminal, nag input ko ani npm install pg.
10. npm install pg, meaning is sya mag interact with PostgreSQL from Node.js.
11. btw, Node.js, mao center aron kita maka access sa PostgreSQL.
12. nag create kog Server-Side Code in short server.js, sa source ni ha naunsa.
13. about sa server.js, basaha lang kong unsa sya pangitaa lng sa ubos.
14. ang sa server.js is para sa connection sa PostgreSQL, makita dadto, nay user, password, host, database, and port. Tan awa lng sa server.js.
15. then nag create another js napud para sa data like information sa patients, etc.
16. for sample lang ni ang patient.html.
17. warning lng gyud, sa data.js ug server.js. Dapat na sila sa gawas gyud.
18. ug about sa public folder, is needed sya kay tungon akong gi plastar ang tanan para maka open atong web sa localhost:port para mag 'Server listening on port 5500'.
19. wala ko kabalo sa port sa inyo kung ma butang naning web sa inyo aron ma check ang port.
20. dapat mag download mog Live Server. Didto sa extension sa vs code.
21. kung gusto ninyo e run para makita ang port.
22. pangitaa ang main html sa web then right click sa mouse, makita dha ang Open with Live Server or pwede pud na, Alt + L Alt + O.
23. Alt + L Alt + O, sal a ang vs code ambot ngano ingnani.
24. pag run dayun is makita na ninyo ni http://127.0.0.1:5500/public/index.html.
25. kanang 5500 mao nay port.
26. ambot bai HAHAHAHA same mn guro tanan sa port, by numbering na lng nako ang explanation kung e whole, kampoy gyud basa, ingnani lng para payts.
27. back to the data.js ug server.js, ang data.js mao mag collect sa data o information sa patient, etc. 
28. naa koy gi add sa data.js like data validation, meaning is sya mag correct kung naka input na ba tanan sa patient, etc.
29. about sa public naka structured na gyud ingnana, pwede ra mag butang sa scripts folder sa sulod basta ang kanang script is related sa html like slide, overlay sa picture, etc. 
30. the reason na naka structured na sya dili na hilaptan kay sala ni sa source pero back to No. 18. Mao gyud HAHAHAH.
31. pero, pero ayaw nag himo lain folder para usa html. Nah igna gyud ang source dili ako sala kay nag sunod rako.
32. o kung try nimo e usa tanan html sa usa ka folder sulod sa public. Tan awa gani para run nimo. Adto lang sa Run sa taas makita rana then click then Start Debugging o pwede pud F5.
33. wait nakalimot ko, kabantay ka anang .vscode na folder dha. Ang sulod ana kay launch.json. 
34. sa launch.json, makita nimo nay Launch Chrome ug Launch Edge. Nay url dha oh mao na pag run nimo ma automatic nana kay naka set na daan ang url so mao nang akong gipasabot http://localhost:5500/index.html, mao na.
35. ang port gyud number one importante para ang Node.js ma access niya imong web na naa aning url. 
36. okay ra ba, akong explanation, e google na lng kung d masaptan chariz.
37. makita sa webRoot, kanang nay /public, mao nay main folder ug kanang url nay /index.html mao ning main sa html web nimo. 
38. aron masabtan, kung naa kay ilis lain main html web nimo like main.html, etc. Dapat na naka /your_main_html_web kay kung ani lng  http://localhost:5500/ makita kag white screen tapos nay naka butang na 'Cannot get /'. Meaning na dli nya makuha imong html kay tungon naka folder pero i think ang cause ana kay ang Node.js, data.js, ug server.js.
39. pero nag try nako gipagawas ang index.html tapos na run kog utro ang mugawas mao ni 'Cannot get /index.html' or nay mogawas na parent directory mn guro na makita tanan imong folder ug files sa imong web.
40. pwede raka mag href="../css/style.css", ang path niya ba or ../img/doctor.jpg.
41. sa data.js ba, kabantay ka anang patient.html pag makita nimo, ako na lng na gipasulod like ingnani ba '<script></script>' wala na toy src. Para makita gyud nimo pero ayaw lng na walaa kanang data.js.
42. kung nay ano, like admin.html pwede ra tong ikapareha sa patient.html.
43. ay kalimot ko, dapat open gyud ang PostgreSQL kung kag milagro, i mean online ba.
44. dapat diay na mag himo naka daan ug table didto sa PostgreSQL. Kabantay ka anang server.js? mabantayan nimo na nga nay const query ug const values. Mao na sila dapat ang const query is same didto sa table sa PostgreSQL. Ayaw na kuan ang primary key kay different nana sya.
45. mao ra to.


## Purpose sa Data.js

Tan awa sa daan ang data.js para ma gets nimo ayaw na pansina kanang errorMessage.textContent.

copy paste nako ni sa source para dali.

1. The script performs validation on the received data to ensure it's in the correct format and meets any specific requirements.

2. The script uses the database driver to connect to the PostgreSQL database using your database connection credentials (host, user, password, database name).

3. It constructs an SQL query to insert the validated data into the desired table in your database.

4. It executes the query on the database server.

5. After successful data insertion or encountering any errors, the server script sends a response back to the HTML page.

6. This response can be a simple success message, an error message, or even a redirect to a confirmation page.

7. You might use JavaScript on the HTML page to handle the response from the server.

8. Based on the response (success or error), you can update the HTML content, display messages to the user, or perform other actions.

Code Explanations.

1. It uses document.getElementById to access specific elements within the HTML form:
* signupForm: The entire form element.
* button-register: The element containing the submit button.
* Various input fields like firstName, lastName, address, etc.

2. submitForm Function:
* This function defines the logic that executes when the submit button is clicked.
* It first clears any previous error messages displayed in the errorMessage element.
* It initializes a variable isValid set to true, assuming validation will pass initially.

3. Client-Side Validation:
* It uses an async function within submitForm to handle form submission asynchronously.
* It iterates through each form field and performs basic validation:
* Checks if the field value is empty after trimming whitespace.
* For specific fields like telephone, it checks for a valid format using a regular expression (/^\d+$/).
* For dropdown fields like sex and maritalStatus, it checks if a value is selected.
* If any validation fails, it sets isValid to false and adds an appropriate error message to the errorMessage element.

4. Sending Data (if Valid):
* If validation passes (all fields are filled correctly), it creates a JavaScript object (data) containing the extracted values from each form field.
* It uses the fetch API to send a POST request to the server-side endpoint /register.
* It sets the request headers with Content-Type: application/json to indicate JSON data is being sent.
* It converts the data object to a JSON string using JSON.stringify and includes it in the request body.

5. Handling Response:
* Upon receiving a response from the server, it checks if the response is successful using response.ok.
* If successful, it logs a success message to the console.
* It creates a new paragraph element (successMessage) with a success message and appends it to the form's parent element.
* It resets the form (clears all input fields).
* If the response is not successful (error), it catches any errors using a try...catch block:
* It logs the error message to the console.
* It updates the errorMessage element with a user-friendly message based on the error.
* It adds a class "visible" to the errorMessage element to make it visible temporarily using CSS.
* It uses setTimeout to automatically hide the error message after 2 seconds using JavaScript.

6. Event Listener:
* Finally, it attaches an event listener to the submit button (submitButton).
* Whenever the submit button is clicked, it triggers the submitForm function, initiating the entire form submission and validation process.

## Purpose sa Server.js

1. Dependencies:
* It imports necessary modules like express (web framework), bodyParser (for parsing request body), pg (PostgreSQL driver), and path (for file path manipulation).

2. Server Setup:
* It creates an Express app instance (app).
* It defines the server port (port).
* It uses bodyParser.json() middleware to parse incoming JSON data from the HTML form.
* It uses express.static middleware to serve static files (like HTML, CSS, JavaScript) from the public directory in your project structure.

3. Database Connection Pool:
* It creates a connection pool (pool) using the pg.Pool class.
* It provides your database credentials (user, password, host, database name, port) to establish connections with the PostgreSQL database.

4. Registration Route (/register):
* It defines a POST route handler for the /register endpoint.
* This route is likely triggered when the HTML form is submitted, sending patient data in the request body.
* It uses async/await syntax for asynchronous operations.
* It destructures the relevant fields (firstName, lastName, etc.) from the request body using destructuring assignment.

5. Data Validation:
* It checks if the request body itself exists.
* It performs basic validation to ensure all required fields are present in the request body.

6. Database Connection and Query:
* It establishes a connection to the PostgreSQL database pool using pool.connect().
* It formats the birthday field from the request body into a valid date format (YYYY-MM-DD) using toISOString().slice(0, 10).
* It constructs an SQL INSERT query to insert the received data into the patients table in the database.
* It uses placeholders ($1, $2, etc.) for values that will be replaced with actual data later.
* It creates a values array containing the extracted data from the request body.
* It executes the prepared query using client.query(query, values).

7. Response and Error Handling:
* Upon successful insertion, it sends a JSON response with a success message (Patient registration successful!).
* It includes a try...catch...finally block for error handling:
* The try block encompasses the core logic for data validation, connection, and query execution.
* The catch block handles any errors that might occur during the process and sends an appropriate error response with a 500 Internal Server Error status code.
* The finally block ensures the database connection is released using client.release() even if errors occur, preventing connection leaks.

8. Server Start:
* It starts the server to listen for incoming requests on the specified port (port).
* It logs a message to the console indicating the server is listening.

## Steps aron mag try pag access sa PostgreSQL

1. Download ang sa terminal sa github git clone https://github.com/JeymsKun/Wellmeadows/.

2. Tapos adto utro sa terminal then e input ni 'node server.js'. Dapat na nabutang na 'Server listening on port 5500'.

3. Then e run ang website, warning dapat naka localhost:port ang url dli ingnani folder like 'file:///C:/Users/Maser/Wellmeadows/public/index.html'.

4. Nay something wrong about sa website, kon kabantay ka na sigeg loading try hulat lng kayp wala ko kabalo unsay rason ana pero i think either sa caching sa Node.js, website, ug sa PostgreSQL or sa Node.js. Kung d sya mo back to normal like mo stop mo show dayun ang title sa website. Utro lang, e run lang utro ayaw nang walaa ang 'node server.js'.

5. adto sa daan sa PostgreSQL e set sa ang imong user, password, host, database, ug port. Kung d makita or no idea about sa user ug password. Mag utro na lng ka like sa akoa. Akong gi utro kay kalimot nako sa username na sya ug sa password. Kung mag utro ka sa PostgreSQL like e delete tanan or reset dapat pangitaon nimo ang related folder sa PostgreSQL, i mean tanan gyud apil ang Local Disk: C ug Local Disk: D. Sa local disk c, e guid kita pangitaa ang main folder system sa imong laptop or sa computer like makita na sya kay na Users, etc. Wait e uninstall sa una ang PostgreSQL sa control panel --> uninstall program. Pangitaa kung nay related other software application sa PostgreSQL. Paghuman sa pag uninstall, adto sa una sa local disk c then pangita tong akong gi ingon sa Users basta daghan pangalan ana naa pud usahay pangala sa brand, etc. Pangitaa dha ang PostgreSQL after that balik pangitaa sa Program Files ug sa Program File (x86) basta nay postgreSQL na name. Tapos sa AppData pangita didto kay main folder mana sa tanan, kung dli nimo makita ang AppData, kay usa sa rason is naka hidden gyud na sya kay naa didto tanan important na mga files sa imong tanan software application ni like Google Chrome, Microsoft Edge, etc. Pag windows + R, i dungan nimo tapos type %AppData% tapos makita nimo didto ang tulo ka folder na Local, LocalLow, ug Roaming pero halusa naa sa Roaming, basta pangitaa lng didto tapos delete ang PostgreSQL na folder. After ana, adto dayun sa local disk d, pangitaa didto.

6. Naka set na tanan username, password, host, database, ug port ang PostgreSQL. btw, pwede pud ka mag YT para makita unsa pag himo sa username, password, host, database, ug port. 

7. Adto sa query sa PostgreSQL, then himo table for sample patients, dapat same sya sa server.js, btw, sa server.js pangitaa ang ni 'const query = 'INSERT INTO patients (first_name, last_name, address, telephone, date_of_birth, sex, marital_status, date_registered) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';' ayaw nana pansina ang values depende nana sya kung pila ka buok na butang na attributes nimo. Kabantay ka anang ani '(first_name, last_name, address, telephone, date_of_birth, sex, marital_status, date_registered)' dapat na same sya sa imong table sa PostgreSQL. Like ingnani ba sample nako sa table; 

CREATE TABLE patients (
  patient_number SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  address TEXT,
  telephone VARCHAR(20),
  date_of_birth DATE,
  sex VARCHAR(20),
  marital_status VARCHAR(20),
  date_registered DATE DEFAULT CURRENT_DATE
);

8. Execute dayun then try ug SELECT * FROM patients; ug kon nay mali ang table then try ug DROP TABLE patients; ug kon gusto kag e remove ang attributes then try ug DELETE FROM patients;

9. So mao nani, naka set up na ang web then try tong click ang login choose patient don't mind sa mga style HAHHAAH then input tanan imong information dha tapos click register just once dapat motunga ni sya 'Registration successful!' then click ok. Don't mind kung utro mogawas na. 

10. if nay something na di motunga ang 'Registration successful!'. Mag utro lng same steps lng gihapon.

11. after mag 'Registration successful!' then adto sa PostgreSQL, then utroha ni SELECT * FROM patients;. Then makita na kung double sya don't mind na lng HAHHAHA basta na makita ang data na imong gi input sa patient.html. Aron ma double check pwede rapud ka moadto sa vs code then click sa ubos naa dha ang DEBUG CONSOLE, makita dha na 'Patient registration successful!'.