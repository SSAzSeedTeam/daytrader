STARTTIME=$(date +%s)
python3 eks_ops.py install 0 6
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
#helm repo update
helm install my-release ingress-nginx/ingress-nginx

ENDTIME=$(date +%s)
echo "It took $(($ENDTIME - $STARTTIME)) seconds to start cluster ..."
