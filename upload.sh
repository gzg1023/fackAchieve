echo "开始上传"

git add .
git commit -am  "$1"
git push 

echo "上传完毕"