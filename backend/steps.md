# Steps to build mini paytm backend

## Phase 1
1. initialize a node project
2. create index.js file and start the server
3. connect db with backend using connection string, then go to index.js and connect the db
4. create the user schema in the schema folder
5. create a main route where i manage my all routes
6. build user.js route where i have all funcionality realted to user like login signup authentication part.
- In this part i use zod for input validation

7. use 3 middleware in index.js
- cors
- express.json
- /api/v1 -> if i change the version of api i just need to change here

8. add code to repo --> https://github.com/Arindam2003/paytm/tree/main


## Phase 2

9. Create authmiddleware.js to protect the routes because some routes are only for logged in user...
10. i create a update user route in user.js route file to update user details
- it checks in postman to put the headers value with bearer
11. Create a find user from database route which gives me all the same name user


## Phase 3

12. create a transaction schema in schema folder
13. update mainRoute with add extra accountRoute for transaction related routes
14. initalize balance when signup... so update the sign up and signin route
.... 
Thinking... about how to transfer money ,

15. Create a new router for accounts
16. create a endpoint to getting their balance
17. An endpoint for user to transfer money to another account
    - session.Transactions....use with mongo

18. Check again and again on signup and signin route and improve the balance and transaction route
    - send money with toUsername:email and amount:200/100 any




## PostMan testing ----

- for signup -> {
	username: "name@gmail.com",
	firstName: "name",
	lastName: "name",
	password: "123456"
}

- for signin ->{
	username: "name@gmail.com",
	password: "123456"
}

- for update ->{
	password: "new_password",
	firstName: "updated_first_name",
	lastName: "updated_first_name",
}

- for find ->{
	users: [{
		firstName: "",
		lastName: "",
		_id: "id of the user"
	}]
}

- fir send balance -> {
	toUsername: string,
	amount: number
}

- whenever the middleware use then i give the bearer token in headers

- Phase -> My working Phase.....for making this project