# hello minikube のメモ

* [Hello Minikube](https://kubernetes.io/docs/tutorials/hello-minikube/)

## 操作メモ

* minikube start -vm-driver=xhyve
  * VMのドライバにxhyveを使う
* kubectl config use-context minikube
  * ```~/.kube/config``` の設定を使う(?)
* eval (minikube docker-env)
  * Minikube VMによりDockerをホスティングする
* docker build -t を kubenetesの設定が効いた状態で行う
  * **eval(minikube docker-env)をする前のimageは、eval後では見つからない**
* kubectl run hello-node --image=hello-node:v1 --port=8080
  * hello-node:v1のDockerコンテナを内部ポート8080がつながるようにして起動する
  * hello-nodeというPodを立ち上げていることを意味してる(?)
  * --replicas=3 とかで複数Podsを立ち上げることができる
* kubectl get deployments
  * Deploymentの情報を見る
* kubectl get pods
  * Podの情報を見る
* kubectl expose deployment hello-node --type=LoadBalancer  
* minikube service hello-node  
  * Serviceを作って外部からアクセスできるようにする
ここまでやるとブラウザからアクセスできるようになる
* server.jsに編集を加えて更新したら、dockerの方も:v2を作成する
* kubectl set image deployment/hello-node hello-node=hello-node:v2
  * 新しいイメージをデプロイ

