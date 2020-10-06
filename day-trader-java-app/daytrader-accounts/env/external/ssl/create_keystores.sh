
#
# This script was run to create the keystores. It is called via an off-line
# administrative action and then the resulting keystores are copied into the 
# src\main\resources folder. This script documents the set of commands that 
# were used to make it easier for others.
#

echo "=========================================="
echo "Creating fake third-party chain root -> ca"
echo "=========================================="

# generate private keys (for root and ca)

keytool -genkeypair -alias root -dname cn=root -validity 10000 -keyalg RSA -keysize 2048 -ext bc:c -keystore root.jks -keypass password -storepass password
keytool -genkeypair -alias ca -dname cn=ca -validity 10000 -keyalg RSA -keysize 2048 -ext bc:c -keystore ca.jks -keypass password -storepass password

# generate root certificate

keytool -exportcert -rfc -keystore root.jks -alias root -storepass password > root.pem

# generate a certificate for ca signed by root (root -> ca)

keytool -keystore ca.jks -storepass password -certreq -alias ca | keytool -keystore root.jks -storepass password -gencert -alias root -ext bc=0 -ext san=dns:ca -rfc > ca.pem

# import ca cert chain into ca.jks

keytool -keystore ca.jks -storepass password -importcert -trustcacerts -noprompt -alias root -file root.pem
keytool -keystore ca.jks -storepass password -importcert -alias ca -file ca.pem

echo  "================================================================="
echo  "Fake third-party chain generated. Now generating keystore.jks ..."
echo  "================================================================="

# generate private keys (for server)

keytool -genkeypair -alias server -dname cn=server -validity 10000 -keyalg RSA -keysize 2048 -keystore keystore.jks -keypass password -storepass password

# generate a certificate for server signed by ca (root -> ca -> server)

keytool -keystore keystore.jks -storepass password -certreq -alias server | keytool -keystore ca.jks -storepass password -gencert -alias ca -ext ku:c=dig,keyEnc -ext san=dns:localhost,dns:daytrader-accounts,dns:daytrader-gateway,dns:daytrader-portfolios,dns:daytrader-quotes,dns:daytrader-web -ext eku=sa,ca -rfc > server.pem

# import server cert chain into keystore.jks

keytool -keystore keystore.jks -storepass password -importcert -trustcacerts -noprompt -alias root -file root.pem
keytool -keystore keystore.jks -storepass password -importcert -alias ca -file ca.pem
keytool -keystore keystore.jks -storepass password -importcert -alias server -file server.pem

echo "================================================="
echo "Keystore generated. Now generating truststore ..."
echo "================================================="

# import server cert chain into truststore.jks

keytool -keystore truststore.jks -storepass password -importcert -trustcacerts -noprompt -alias root -file root.pem
keytool -keystore truststore.jks -storepass password -importcert -alias ca -file ca.pem
keytool -keystore truststore.jks -storepass password -importcert -alias server -file server.pem
