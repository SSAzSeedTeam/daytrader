STARTTIME=$(date +%s)
python3 eks_ops.py install 0 6
ENDTIME=$(date +%s)
echo "It took $(($ENDTIME - $STARTTIME)) seconds to start cluster ..."
