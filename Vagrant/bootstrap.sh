function install {
    echo installing $1
    shift
    apt-get -y install "$@" >/dev/null 2>&1
}

echo adding swap file
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap defaults 0 0' >> /etc/fstab

install "curl" curl
gpg2 --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
curl -sSL https://get.rvm.io | bash -s stable
source /etc/profile.d/rvm.sh
rvm requirements
rvm install 2.2.4
rvm use 2.2.4 --default 

install "Node js" nodejs nodejs-legacy
install "npm" npm
sudo npm install -g bower grunt grunt-cli compass
gem install compass


sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
install "Mongo DB" mongodb-org
echo -e "[Unit]\n Description=High-performance, schema-free document-oriented database\n After=network.target\n [Service]\n User=mongodb\n ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf\n [Install]\n WantedBy=multi-user.target" >> /etc/systemd/system/mongodb.service
sudo systemctl start mongodb
sudo systemctl enable mongodb

install "python" python-pip python-dev build-essential python-blinker
sudo pip install --upgrade pip 

install "Git" git
cd /opt
sudo mkdir idatosabiertos
cd idatosabiertos
sudo git clone https://github.com/idatosabiertos/calidad-del-aire-webapp
sudo git clone https://github.com/idatosabiertos/api-calidad-aire


cd api-calidad-aire 
sudo rm -rf src/flask-mongoengine
sudo rm -rf src/mongoengine
sudo pip install -r requirements.txt
export con_secret=sRl1gtwWjtEuEkqagJifZyZxE
export con_secret_key=IgusDRzyt8fVlzlFQtMQa6fnaeexLAXOYlBemUF7XuUczRPV7o
export token=2537971922-ZjqRTjrqWwkG8SiFFWnNuNqEbHU6cq5ulrt1CYe
export token_key=HPi61C53C11Qr5tok0IvLVuFBkFioeZud0ac5eHfUlnCz
export rollbar_key=api-calidad-aire
export rollbar_environment=development
python run.py &

cd /opt/idatosabiertos/calidad-del-aire-webapp
npm install
sudo chmod 757 -R /opt/idatosabiertos/
bower install --allow-root
grunt serve


echo 'Navegar a / Navigate to http://localhost:8080 en la maquina host/ on your host machine'