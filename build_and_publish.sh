#!/bin/bash

docker_check(){
    if (! docker stats --no-stream ); then
    echo "This process requires docker to be running, please start docker."
    return 0
    else
    return 1
    fi
}


if ! docker_check 1
then

    printf "Input appversion/image tag:\n"
    read app_version_tag

    docker build -t :$app_version_tag \
        --build-arg REACT_APP_STAGE_ARG=staging .

    docker build -t :$app_version_tag \
        --build-arg REACT_APP_STAGE_ARG=production .

    docker push :$app_version_tag
    docker push :$app_version_tag

fi
