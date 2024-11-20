# Superb Property CLI

Welcome to the **Superb Property CLI**! This command-line interface (CLI) tool allows users to search for properties based on various filters such as price, square footage, and amenities, directly from the terminal. The application interacts with the user, provides filtered property results, and displays a link to view the property location on Google Maps.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technical Choices](#technical-choices)

## Installation

To get started, follow these steps to ensure you're using the correct version of Node.js and to install the required dependencies.

### Step 0: Install and Use NVM (Node Version Manager)

1. **Install NVM**  
   NVM is a version manager for Node.js, which allows you to install and switch between multiple versions of Node.js on your system.  
   Follow the instructions to install NVM from the official [NVM GitHub page](https://github.com/nvm-sh/nvm) for your platform.

2. **Install Node.js**  
   After installing NVM, use it to install the required version of Node.js

   ```bash
   nvm install
   ```

3. **Use the Installed Node.js Version**  
   Switch to the installed version:

   ```bash
   nvm use
   ```

4. **Verify Node.js Installation**  
   Ensure that the correct version of Node.js is active:

   ```bash
   node -v
   ```

   This should display the Node.js version (`v22.11.0`).

### Step 1: Install Dependencies

Install the dependencies with npm:

```bash
npm i
```

This will install all the required packages defined in the `package.json`.

### Step 2: Run the CLI

To run the application, execute the following command:

```bash
npx ts-node src/index.ts
```

This will start the CLI, and you can interact with the menu to filter and search for properties.

## Usage

Once the CLI is running, you'll be prompted with a menu to select different filtering options, such as:

1. Search by square footage
2. Search by price
3. Search by amenities

For each option, the program will prompt you for additional information (e.g., square footage, price, etc.), and it will display the results in your terminal. For properties that include location information, a clickable link to the property on **Google Maps** will be displayed.

## Technical Choices

In this project, I have made some key technical choices to enhance user experience and improve the functionality of the CLI:

### **Inquirer**

**Inquirer** is used to improve the terminal interaction with the user. It provides an interactive command-line interface to ask questions, handle input, and display menus in a structured way. This helps create a more intuitive and user-friendly CLI.

### **Terminal-kit**

**Terminal-kit** is used to display the results in the terminal in a more colorful and visually appealing way. It supports advanced text formatting, coloring, and other interactive terminal features, making the results easier to read and navigate.