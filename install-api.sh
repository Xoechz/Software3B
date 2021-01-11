#!/bin/bash
# Node JS
sudo apt-get install -y curl nodejs
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -

# MongoDB
sudo apt-get install -y gnupg wget openssl
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org
echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-org-shell hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections
sudo systemctl enable mongod
sudo systemctl start mongod

# User and copy API
sudo useradd -s /bin/false inventurmdapi
sudo mkdir /etc/InventurMDAPI
sudo cp -r Backend /etc/InventurMDAPI/
sudo chown -R inventurmdapi:inventurmdapi /etc/InventurMDAPI

# Crontab
subpath="/Backend/InventurMDAPI/startDebian10.sh"
path="/etc/InventurMD$subpath"
line="@reboot $path"
sudo -u inventurmdapi echo ... && (crontab -l; echo "$line" ) | crontab -
