image_name=next-ssr-blog

# record old containers
old="$(docker ps -a | grep $image_name | grep -oE "[0-9a-z]{12}" | tr '\n' ' ')"
old_images="$(docker images | grep $image_name | grep -oE "[0-9a-z]{12}" | tr '\n' ' ')"

# pull image
tag=$1
docker pull saber2pr/next-ssr-blog:$tag > ./deploy-blog.log

# remove old containers, run new container
docker rm -f $old && docker run --restart=always -d -p 88:3000 -it saber2pr/next-ssr-blog:$tag > ./deploy-blog.log && docker rmi $old_images