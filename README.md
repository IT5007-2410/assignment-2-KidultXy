<!-- # IT5007 Tutorial Setup and Submission

* Attach shell to the container on VSCode and work on your tutorial from /home/it5007/
```
cd /home/it5007/
```
* $```git clone <your github classroom repository url>```
* Once you are done with the changes to the code base, add node_modules to .gitignore, but ensure package.json reflects all packages you installed additionally.
* Make sure you commit your changes to the repository using the command:
  - $```git commit -am "answer to T3"```

## IT5007 Tutorial Submission
 * When pushing a change to remote repository, you will be asked for your github username and password. Recently, github has replaced passwords with personal access tokens. To generate a personal access token, follow the instructions in this link: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token.
 * ```$git push```
 * If you are coding in a branch use the following command instead: ```$git push -u origin <mybranchname>``` -->


# Ticket To Ride Enhanced Version

**IT5007: Software Engineering Assignment 2**  

## Overview

**Ticket To Ride** is a React-based web application for managing reservations on the Singapore-Thailand high-speed railway. It allows users to add, view, and delete traveller reservations and visualizes seat availability.

## Features

- **Traveller Management:** Add, display, and delete travellers locally.
- **Navigation:** Switch between components using a navigation bar.
- **Seat Visualization:** View reserved (orange) and available (green) seats.
- **Real-time Updates:** Instant updates on reservations and seat counts.

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/IT5007-2410/assignment-2-KidultXy.git
   cd assignment-2-KidultXy
   ```
2. **Install Dependencies**

   ```bash
    npm install
   ```

3. **Start the Application**
   ```bash
    npm install
   ```

Open http://localhost:3000 in your browser.