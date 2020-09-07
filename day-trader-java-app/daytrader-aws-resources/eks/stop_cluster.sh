STARTTIME=$(date +%s)
python3 eks_ops.py delete 0 6
ENDTIME=$(date +%s)
echo "It took $(($ENDTIME - $STARTTIME)) seconds to shutdown cluster ..."

