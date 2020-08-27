wget https://openssl.org/source/openssl-1.0.2k.tar.gz
tar -xvf openssl-1.0.2k.tar.gz
cd openssl-1.0.2k/
sudo ./config --prefix=`pwd`/local --openssldir=/usr/lib/ssl enable-ssl2 enable-ssl3 no-shared
sudo make depend
sudo make
sudo make -i install
sudo cp local/bin/openssl /usr/local/bin/
curl -k https://localhost:5443
########################################################################
#  RECREATE TABLES
#-----------------
#Accounts
curl -k -L -X POST "https://localhost:1443/admin/recreateDBTables"
#Portfolio
curl -k  -L -X POST "https://localhost:3443/admin/recreateDBTables"
#Quotes
curl -k  -L -X POST "https://localhost:4443/admin/recreateDBTables"

#=======================================================================
#  POPULATE TABLES
#-----------------
#Accounts
curl -k -L -X POST "https://localhost:1443/admin/tradeBuildDB?limit=500&offset=0"
curl -k -L -X POST "https://localhost:1443/admin/tradeBuildDB?limit=10&offset=10"
curl -k -L -X POST "https://localhost:1443/admin/tradeBuildDB?limit=10&offset=20"
curl -k -L -X POST "https://localhost:1443/admin/tradeBuildDB?limit=10&offset=30"

#Portfolio
curl -k  -L -X POST "https://localhost:3443/admin/tradeBuildDB?limit=500&offset=0"
curl -k  -L -X POST "https://localhost:3443/admin/tradeBuildDB?limit=10&offset=10"
curl -k  -L -X POST "https://localhost:3443/admin/tradeBuildDB?limit=10&offset=20"
curl -k  -L -X POST "https://localhost:3443/admin/tradeBuildDB?limit=10&offset=30"

#Quotes
curl -k  -L -X POST "https://localhost:4443/admin/tradeBuildDB?limit=500&offset=0"
curl -k  -L -X POST "https://localhost:4443/admin/tradeBuildDB?limit=10&offset=10"
curl -k  -L -X POST "https://localhost:4443/admin/tradeBuildDB?limit=10&offset=20"
curl -k  -L -X POST "https://localhost:4443/admin/tradeBuildDB?limit=10&offset=30"

#=======================================================================
#generic testing
curl -k  -L -X GET  "https://localhost:1443/accounts/uid:1/profiles"
curl -k  -L -X GET  "https://localhost:1443/accounts/uid:1"

#Portfolio
#curl -k  -X GET  "https://localhost:3443/portfolios/{userId}/orders"
#curl -k  -X GET  "https://localhost:3443/portfolios/{userId}"

#Quotes
curl -k  -L -X GET  "https://localhost:4443/quotes/s:1"
curl -k  -L -X GET  "https://localhost:4443/quotes?limit=10"
#=======================================================================

########################################################################
