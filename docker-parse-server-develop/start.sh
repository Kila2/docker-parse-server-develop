eval $(docker-machine env)
docker-compose up -d
sudo sed -i '' "s/192.168.99.101 parse//g" /etc/hosts
sudo sed -i '' "/^$/d"  /etc/hosts
echo '192.168.99.101 parse' | sudo tee -a /etc/hosts