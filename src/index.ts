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



const startApp = () => {
  inquirer.prompt([{
    name: 'action',
    type: 'input',
    message: 'How can I help you?',
  }]).then(async (answers: InquirerAnswers) => {
    console.log("Chosen action: " + answers.action);
    startApp();
    if (answers.action === "quit")
      return;
  });
}

startApp();