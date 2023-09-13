const inquirer = require('inquirer');
const consola = require('consola')

enum Action {
	List = "list",
	Add = "add",
	Remove = "remove",
	Quit = "quit"
  }
 
enum Variant {
  Success = "success",
  Error = "error",
  Info = "info"
}

  type InquirerAnswers = {
	action: Action
  }

class Message  {
  constructor(private content: string) {

  }
  show() {
    console.log(this.content)
  }
 
  
  capitalize() {
    this.content = this.content.charAt(0).toUpperCase() + this.content.slice(1);
  }
  
  toUpperCase() {
    this.content = this.content.toUpperCase();
  }
  
  toLowerCase() {
    this.content = this.content.toLowerCase();
  }
  
  static showColorized(Variant:string, text:string) {
    if (Variant === 'success') {
      consola.success(text);
    } else if (Variant === 'error') {
      consola.error(text);
    } else if (Variant === 'info') {
      consola.info(text);
    }
  }
  }
  
  //Na końcu dodaj metodę remove. Powinna ona przyjmować nazwę użytkownika w formie argumentu (stringa). Następnie powinna poszukać go w tablicy data. Jeśli uda się go znaleźć, to należy go usunać oraz wyświetlić komunikat sukcesu – User deleted!. Jeśli nie, to należy pokazać komunikat błędu – User not found.... Zadbaj o odpowiednie otypowanie samej funkcji, jak i o to, aby była dostępna publicznie.

interface User {
  name: string;
  age: number;
}

class UsersData {
  data: User[] = [];

  showAll() {
    if (this.data.length === 0) {
      console.log("No data...");
    } else {
      Message.showColorized(Variant.Info, "Users data");
      console.table(this.data);
    }
  }

  add(user: User): void {
    if (typeof user.age === 'number' && user.age > 0 && typeof user.name === 'string' && user.name.length > 0) {
      this.data.push(user);
      Message.showColorized(Variant.Success, "User has been successfully added!");
    } else {
      Message.showColorized(Variant.Error, "Wrong data!");
    }
  }

  remove(name: string): void {
    if(this.data.find(user=> user.name === name)) {
      this.data = this.data.filter((user) => user.name !== name);
      Message.showColorized(Variant.Success, 'User deleted')
    } else {
      Message.showColorized(Variant.Error, 'User not found...')
    }
  }
}

const users = new UsersData();

console.log("\n");
console.info("???? Welcome to the UsersApp!");
console.log("====================================");
Message.showColorized(Variant.Info, "Available actions");
console.log("\n");
console.log("list – show all users");
console.log("add – add new user to the list");
console.log("remove – remove user from the list");
console.log("quit – quit the app");
console.log("\n");

const startApp = () => {
  inquirer.prompt([{
    name: 'action',
    type: 'input',
    message: 'How can I help you?',
  }]).then(async (answers: InquirerAnswers) => {
    switch (answers.action) {
      case Action.List:
        users.showAll();
        break;
      case Action.Add:
        const user = await inquirer.prompt([{
          name: 'name',
          type: 'input',
          message: 'Enter name',
        }, {
          name: 'age',
          type: 'number',
          message: 'Enter age',
        }]);
        users.add(user);
        break;
      case Action.Remove:
        const name = await inquirer.prompt([{
          name: 'name',
          type: 'input',
          message: 'Enter name',
        }]);
        users.remove(name.name);
        break;
      case Action.Quit:
        Message.showColorized(Variant.Info, "Bye bye!");
        return;
        default:
          Message.showColorized(Variant.Error, 'wrong command, please type one of \'list, add, remove, quit\' ')
    }

    startApp();
  });
}
startApp();