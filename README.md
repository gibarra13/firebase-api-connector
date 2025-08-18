# firebase-api-connector
Api para conectarse a Firebase
This project is a Node.js application that integrates with Firebase.

## Features

- Firebase Authentication
- Firestore Database
- Realtime Database
- Cloud Functions

## Prerequisites

- Node.js installed
- Firebase account

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/FirebaseNode.git
    ```
2. Navigate to the project directory:
    ```bash
    cd FirebaseNode
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Usage

1. Set up your Firebase project and download the `firebase-config.json` file.
2. Place the configuration file in the root directory.
3. Start the application:
    ```bash
    npm start
    ```

## Considerations

1.  Realizar Login para obtener el accessToken
2.  Usar el accessToken como metodo de autenticacion (Bearer Token) para ejecutar el resto de requests

## License

This project is licensed under the MIT License.

## For production

No olvidar agregar el file src/config/ivan-drive-firebase-adminsdk-o379n-a67f31685f.json, que debe contener el secreto para accedder a Firebase