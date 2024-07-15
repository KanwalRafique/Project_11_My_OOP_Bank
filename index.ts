#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

//Bank Account interface
interface IBankAccount{
    accountNumber : number;
    balance : number;
    //Adding methods
    withdraw(amount: number): void; //returns no value 
    deposit(amount: number): void;
    checkBalance(): void;
}


//---------------Class of Bank Account-------------------

class BankAccount implements IBankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber:number, balance: number ){
        this.accountNumber = accountNumber;
        this.balance = balance;
    }


// Debit Money
withdraw(amount: number): void {
    if (this.balance >= amount){
        this.balance -= amount;
        console.log(chalk.bold.blueBright`\nWithdrawal successfull👍🏻`);
        console.log(chalk.bold.yellow`\nYour remaining balance is ${this.balance}`);
    } else {
        console.log(chalk.bold.bgCyan`\nInsufficient Balance!!!!`);
        console.log(chalk.bold.redBright`\nTransaction Failed!!!!!!!!!!!!😯`);

    }
}

// Credit Money
deposit(amount: number): void {
    if (amount > 100){
        amount -= 1; // $1 is charged if more than $100 is deposited.
    } this.balance += amount;
    console.log(chalk.bold.greenBright`\nDeposit sucessfull...`);
    console.log(chalk.bold.bgYellowBright`\nYour current Balance is $${this.balance}`);

}

// Check Balance
checkBalance(): void {
    console.log(chalk.bold.italic.bgCyan`YOUR CURRENT BALANCE IS $${this.balance}`);
    
    }
}

//---------------------Class of Customer--------------------

class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName:string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount){
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}


// Creating Bank Accounts
let accounts : BankAccount [] = [
    new BankAccount (1001, 500), // Account number and current balance
    new BankAccount (1002, 1000),// Account number and current balance
    new BankAccount (1003, 2000),// Account number and current balance
];

// Creating customers
let customers: Customer[] = [
    new Customer ("Umair", "Rafique", "Male", 32, 3167878123, accounts[0]),
    new Customer ("Junaid", "Rafique", "Male", 30, 3165863330, accounts[1]),
    new Customer ("Usama", "Rafique", "Male", 27, 3415648780, accounts[2])
];

// Creating function to interact with bank account

async function service(){

        console.log(chalk.bold.bgCyanBright`\n\t\t\t\W==========*******============WELCOME TO K-R OOP BANK===========********============\t\t\t\n`);
            
    do{
        let accountNumberInput = await inquirer.prompt({
                name: "accountNumber",
                type: "input",
                message: "Kindly enter your Account Number."
        });

        let accountNumber = parseInt(accountNumberInput.accountNumber);


        let customer = customers.find(customer => customer.account.accountNumber === accountNumber);
        if(customer){
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}\n`);
            

            let ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "Select an operation",
                choices: [
                             { name: "Deposit", value: "deposit" },
                             { name: "Withdraw", value: "withdraw" },
                             { name: "Check Balance", value: "check_balance" },
                             { name: "Exit", value: "exit" }           
                         ]  

            }]);
            

            switch(ans.select){
                case "deposit":
                    let depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "input",
                        message: "Enter the amount to deposit"
                    });
                    customer.account.deposit(parseInt(depositAmount.amount));
                    break;

                case "withdraw":
                    let withdrAmount = await inquirer.prompt({
                        name: "amount",
                        type: "input",
                        message: "Enter the amount to withdraw"
                    });
                    customer.account.withdraw(parseInt(withdrAmount.amount));
                    break;

                case "check_balance":
                    customer.account.checkBalance();
                    break;

                case "exit":
                    console.log(chalk.bold.magentaBright`Exiting Bank program.....!`);
                    console.log(chalk.bold.greenBright`\nThankyou for using Our Bank Services, Have a Good Day!`);
                    return;
                    

            }

        } else {
            console.log(chalk.bold.redBright`Invalid Account Number!!!!!!!`);
            console.log(chalk.bold.bgRedBright`Please Try Again`);

        }


    } while (true)
}

service()





