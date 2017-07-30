# Calidad del Aire / Air Quality [![Build Status](https://travis-ci.org/idatosabiertos/calidad-del-aire-webapp.svg?branch=develop)](https://travis-ci.org/idatosabiertos/calidad-del-aire-webapp)

Aplicación web que muestra el estado de la calidad del aire actual en relación con los estándares de la OMS. 

Web application showing the current state of air quality in relation to the OMS standard.


## REQUERIMIENTOS / REQUIREMENTS
1. **Ruby**	 
	 -  [RVM](https://rvm.io/rvm/install) 
	 - $`rvm install 2.x.x`
	 - $`rvm use 2.x.x`
2. **NodeJS**
	 - $`apt get install -y nodejs npm`
3. **Bower**
	 - $`npm install -g bower`
4. **Grunt**
	 - $`npm install -g grunt grunt-cli`
5. **Compass**
	 - $`npm install -g compass`
	 - $`gem install compass`
6. **API**
	- [API](https://github.com/idatosabiertos/api-calidad-aire) levantada y corriendo / up and running
7. **API JOB**
	- [API JOB](https://github.com/idatosabiertos/calidad-aire-cdmx-latam) levantada y corriendo / up and running

## INSTALACIÓN / INSTALATION
- $`git clone https://github.com/idatosabiertos/calidad-del-aire-webapp`
- $`cd  /calidad-del-aire-webapp`
- $`npm install`
- $`bower install`
- $`grunt serve`

### Vagrant  [/vagrant](https://github.com/idatosabiertos/calidad-del-aire-webapp/tree/develop/Vagrant)
**Requerimientos / Requirements**
 - [Vagrant](https://www.vagrantup.com/downloads.html)
 - [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
**Pasos / Steps:**
1. `git clone calidad-del-aire-webapp`
2. `cd calidad-del-aire-webapp/Vagrant`
3. `vagrant up` 
4. Navegar a / Navigate to `http://localhost:8080` en la maquina host / on host machine.