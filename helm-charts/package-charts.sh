#!/bin/bash


if [ "$#" -lt 1 ]; then
    echo "Usage: $0 <packaged-charts-directory>"
    echo "Example: $0 ../daytrader-helm-charts-repo/"
    exit -1
fi

PACKAGED_CHARTS=$1

for dir in */
do
    if [ "${dir}" != "${PACKAGED_CHARTS}" ]
    then
        echo -n "Updating dependencies in '${dir}'..."
        pushd "${dir}" > /dev/null
            helm dependencies update > /dev/null
        popd > /dev/null
        echo "done!"

        echo "Packaging ${dir}..."
        helm package ${dir} --destination "${PACKAGED_CHARTS}"
        echo "...done"
    fi
done

helm repo index "${PACKAGED_CHARTS}"
