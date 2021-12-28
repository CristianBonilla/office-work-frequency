# OFFICE WORK FREQUENCY

Search for coincidences between pairs of employees in the time they have worked in the offices, having flexibility

## It was developed with the following

* **NodeJs** (Development environment with Javascript)
* **Yarn** (Package manager)
* **NestJs** (Modular framework)
* **TypeScript** (JavaScript superset and static typing)
* **Jest** (Unit tests and e2e)
* **Eslint/Prettier** (Linter and code format)

## Installations

* node >= **14.14.0**
* npm >= **6.14.8**
* yarn >= **1.22.5**

### Yarn

```bash
yarn global add @nestjs/cli
```

## Running Instructions

To install the project dependencies

```bash
yarn install
```

To run the unit tests

```bash
yarn run test
```

To run the e2e tests

```bash
yarn run test:e2e
```

To generate the tests coverage report

```bash
yarn run test:cov
```

After generating the coverage report, go to the **"coverage/lcov-report"** folder and open the **index.html** file in the browser

To run the project in a development environment

```bash
yarn run start:dev
```

## Program execution process

Once you run the program in a development environment; there will be a choice type to select, if you want to load the dataset from a default text file or custom.

If you choose the option from a text file, it will read the file found in the **src/shared/mocks/dataset.txt** directory, you can modify it if you wish, to do the corresponding tests.

If you choose the custom option, it will create a file for you and open it in the editor of your choice (on windows it is notepad and on mac it is vim), so that you can add the data sets you want.

After loading the data sets, you will create a table in the console with the employee pairs and the corresponding coincidences. For the results to be favorable, there is a regular expression that validates that the dataset must comply with the established format.

At the end it will ask if you want to make a new attempt to load the dataset, pressing (y or n).

## Architecture

The architecture was created under the domain driven design (DDD) pattern, as the business focuses on the frequency of times according to the pairs of employees calculated and the coincidences as a result. The architecture is formed under the following layers.

### Application

Be in charge of defining the work to be done in the program and directing the domain to solve difficulties.

### Contracts

It is responsible for defining the types, constants, DTOs and interfaces that are part of the entire program.

### Domain

As its name implies, it is responsible for representing business concepts, for employee frequency and for obtaining coincidences.

### Infrastructure

This layer was not taken into account since there was no need to connect the data in memory or keep it persistent (databases).

### Other Directories

* **config** (Define and obtain the variables of the different environments).
* **providers** (Providers for the entire project to be used as sources of help).
* **shared** (Shared resources).

## Design patterns

* **Facade**
* **Factory**
* **Dependency injection**

## License

Office Work Frequency is [MIT licensed](LICENSE).
