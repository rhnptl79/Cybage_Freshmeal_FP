//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || 
window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || 
window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || 
window.msIDBKeyRange

if (!window.indexedDB) {
window.alert("Your browser doesn't support a stable version of IndexedDB.")
}
         
const employeeData = [
	{ id: "test@gmail.com", email: "test@gmail.com", password: "pwd1" }
 ];
var db;
var request = window.indexedDB.open("newDatabase", 1);

request.onerror = function(event) {
console.log("error: ");
};

request.onsuccess = function(event) {
db = request.result;
};

request.onupgradeneeded = function(event) {
	var db = event.target.result;
	var objectStore = db.createObjectStore("employee", {keyPath: "email"});

	for (var i in employeeData) {
	   objectStore.add(employeeData[i]);
	}
}
function add() {
	var emailadd = document.getElementById("email").value;
	var passwordadd = document.getElementById("password").value;
	var personalurl = document.getElementById("personalurl").value;
	var yob = document.getElementById("yob").value;
	var gender = document.getElementById("gender").value;
	var comments = document.getElementById("comments").value;
	var request = db.transaction(["employee"], "readwrite")
	.objectStore("employee")
	.add({ id: emailadd, email: emailadd, password: passwordadd});
	
	request.onsuccess = function(event) {
	   alert("Kenny has been added to your database.");
	};
	
	request.onerror = function(event) {
	   alert("Unable to add data\r\nKenny is aready exist in your database! ");
	}
 }
		 
function read() {
	var transaction = db.transaction(["employee"]);
	var objectStore = transaction.objectStore("employee");
	var request = objectStore.get("00-03");

	request.onerror = function(event) {
	   alert("Unable to retrieve daa from database!");
	};

	request.onsuccess = function(event) {
	   // Do something with the request.result!
	   if(request.result) {
		  alert("Name: " + request.result.name + ", Age: " + request.result.age + ", Email: " + request.result.email);
	   } else {
		  alert("Kenny couldn't be found in your database!");
	   }
	};
}