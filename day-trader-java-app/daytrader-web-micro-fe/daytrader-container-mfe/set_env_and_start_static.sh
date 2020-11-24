export GATEWAY_URL=$1
export ACCOUNT_MFE_URL=$2
export PORTFOLIO_MFE_URL=$3
export QUOTES_MFE_URL=$4
find "/usr/share/nginx/html" -name "index.html" -exec sed -i "s#GATEWAY_END_POINT_URL#$GATEWAY_URL#g" {} \;
find "/usr/share/nginx/html" -name "index.html" -exec sed -i "s#REACT_APP_DAYTRADER_ACCOUNT_MFE_URL#$ACCOUNT_MFE_URL#g" {} \;
find "/usr/share/nginx/html" -name "index.html" -exec sed -i "s#REACT_APP_DAYTRADER_PORTFOLIO_MFE_URL#$PORTFOLIO_MFE_URL#g" {} \;
find "/usr/share/nginx/html" -name "index.html" -exec sed -i "s#REACT_APP_DAYTRADER_QUOTES_MFE_URL#$QUOTES_MFE_URL#g" {} \;
nginx
