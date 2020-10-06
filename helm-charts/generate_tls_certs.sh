#!/bin/bash


if [ "$#" -lt 1 ]; then
    echo "Usage: $0 <common-name>"
    echo "Example: $0 daytrader.example.com"
    exit -1
fi

COMMON_NAME=$1
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
TLS_KEY=${COMMON_NAME}-${TIMESTAMP}.key
TLS_CRT=${COMMON_NAME}-${TIMESTAMP}.crt

openssl genrsa -out "${TLS_KEY}" 2048
openssl req -new -x509 -key "${TLS_KEY}" -out "${TLS_CRT}" -days 360 -subj /CN=${COMMON_NAME}

echo "TLS Certificate:"
base64 -i "${TLS_CRT}"

echo "TLS Key:"
base64 -i "${TLS_KEY}"
