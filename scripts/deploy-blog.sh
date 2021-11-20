image_name="next-ssr-blog"

# pull image
tag=$1

# free memory
docker rm -f $(docker ps -a | grep $image_name | grep -oE "[0-9a-z]{12}" | tr '\n' ' ') \
&& docker rmi $(docker images | grep $image_name | grep -oE "[0-9a-z]{12}" | tr '\n' ' ')

# pull and run
docker pull saber2pr/next-ssr-blog:$tag > ./deploy-blog.log \
&& docker run --restart=always -d -p 88:3000 -it saber2pr/next-ssr-blog:$tag > ./deploy-blog.log