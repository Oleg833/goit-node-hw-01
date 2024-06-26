const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const listAllContacts = await listContacts();
      console.table(listAllContacts);
      break;

    case "get":
      const getById = await getContactById(id);
      console.table(getById);
      break;

    case "add":
      const addNewContact = await addContact(name, email, phone);
      console.table(addNewContact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      console.table(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction(argv);

const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join("db1");

async function test() {
  const data = await fs.readdir(contactsPath, "utf-8");
  console.log("data=", data);
  return;
}

test();
