export IPADDRESS=$1
find "/usr/share/nginx/html" -name "index.html" -exec sed -i "s/GATEWAY_END_POINT_URL/$IPADDRESS/g" {} \;
nginx
