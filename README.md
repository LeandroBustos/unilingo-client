# mindco-firebase

A form that insert basic data from users of mindco in Firestore database, synchronized in a BigQuery dataset using Firebase Functions and visualized in a dataStudio report embeded in the page that updates its records frecuently, without the need of a traditional backend architecture.

## Environment Variables
**NONE**

## Run Locally

Clone the project

**SSH**
```bash
  git clone git@github.com:LeandroBustos/mindco-firebase.git
```

**HTTP**
```bash
  git clone https://github.com/LeandroBustos/mindco-firebase.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start:dev
```

## Firebase project
https://console.firebase.google.com/u/0/project/mindco-c3cf8/overview?hl=es&consoleUI=FIREBASE

## Data report from DataStudio
TL;DR here is the data report
https://lookerstudio.google.com/embed/u/0/reporting/03c9ff32-1f08-4add-b7f8-01419523dfbd/page/EweLD


## Tech Stack

**Cloud:** Firebase Functions, Firestore, BigQuery, DataStudio

**Frontend:** React Hooks, HTML, CSS, JavaScript