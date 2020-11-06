export IPADDRESS=$1
find . -name "index.html" -exec sed -i "s/GATEWAY_END_POINT_URL/$IPADDRESS/g" {} \;
npm start
