const user1 = {
    username: 'pojo',
    email: 'test@fxh.com'
}

class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
    }

    toJSON() {
        return  {
            username: this.username,
            email: this.email
        };
    }
}

const user2 = new User('class', 'class@fxh.com');

user1.password = user2.password = "mypassword";

console.log(user1);   //POJO
console.log(user2);   //class instance
