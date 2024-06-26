# AF-Dashboard-frontend

This is the frontend project for the AF Dashboard application (AF stands for "Assistência Farmacêutica" or "Pharmaceutical Assistance"). It is built using React, Vite, and TypeScript. 

The project aims to provide data visualiazation through an interactive map regarding the pharmaceutical assistance activities for the municipality of São José dos Pinhais.

This project uses public data obtained through the municipality's [transparency website](https://saudetransparente2.sjp.pr.gov.br/saudetransparente/#/atendimentos-farmaceuticos)

The backend for this project is available at: https://github.com/samuel-marafigo/dashboard-af-backend

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Project](#running-the-project)
  - [Running with Docker](#running-with-docker)
  - [Running without Docker](#running-without-docker)
- [Contributing](#contributing)
- [License](#license)

## Requirements

- Node.js (version 14.x or higher)
- npm or yarn
- Docker (optional, for running with Docker)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/samuel-marafigo/dashboard-af-frontend.git
    cd dashboard-af-frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

## Running the Project

### Running with Docker

1. Ensure the [backend](https://github.com/samuel-marafigo/dashboard-af-backend) is running on localhost:8080.
2. Ensure you have Docker installed on your machine.
3. Build the Docker image:

    ```bash
    docker-compose up --build
    ```
    
4. Open your browser and navigate to `http://localhost:5173`.

### Running without Docker

1. Ensure the [backend](https://github.com/samuel-marafigo/dashboard-af-backend) is running on localhost:8080.
2. Start the development server:

    ```bash
    npm run dev
    ```

    or

    ```bash
    yarn dev
    ```

3. Open your browser and navigate to `http://localhost:5173`.


## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Video Demo


https://github.com/samuel-marafigo/dashboard-af-frontend/assets/125743714/ec12b3ea-e789-4e11-846d-0972d033dbef

