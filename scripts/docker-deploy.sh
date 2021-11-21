image_name=$1
tag=$2
port=$3

# free memory
docker rm -f $(docker ps -a | grep $image_name | grep -oE "[0-9a-z]{12}" | tr '\n' ' ') \
&& docker rmi $(docker images | grep $image_name | grep -oE "[0-9a-z]{12}" | tr '\n' ' ')

# pull and run
docker pull $image_name:$tag > ./deploy-blog.log \
&& docker run --restart=always -d -p $port -it $image_name:$tag > ./deploy-blog.log