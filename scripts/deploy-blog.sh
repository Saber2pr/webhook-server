# record old containers
old="$(docker ps -a | grep next-ssr-blog | grep -oE "[0-9a-z]{12}" | tr '\n' ' ')"

# pull image
tag=$1
docker pull saber2pr/next-ssr-blog:$tag > ./deploy-blog.log

# remove old containers
docker rm -f $old

# run new container
docker run --restart=always -d -p 88:3000 -it saber2pr/next-ssr-blog:$tag > ./deploy-blog.log