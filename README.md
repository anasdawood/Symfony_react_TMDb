# The Moview DB React Symfony Application

Thie application uses Symfony to read data from The movie DB API and store it in local DB then react displayes this data.

## Getting Started

1- Download both Folders.
2- TMBD is the Symfony project.
3- rtmbd is the React part of this project.

### Prerequisites

cd to TMBD and run the folowing to install the database and run the Symfony server:

```
php bin/console doctrine:database:create
php bin/console doctrine:schema:update --force
php bin/console server:run
```

in another terminal, cd to rtmdb and run :

```
npm start
```

navigate to :
```
http://localhost:3000/signup
```


## Built With

* [Symfony](https://symfony.com/) - version 3.4
* [React](https://reactjs.org/)
* [Guzzle](https://github.com/guzzle/guzzle) - Used make webservice calls from Symfony
* [Axios](https://www.axios.com/) - Used make webservice calls React

## Improvements

* Place proper validations on front and back ends.
* Write proper tests.
* Document the server APIs.
* Implement Pagination.
* Imrpove UI.
