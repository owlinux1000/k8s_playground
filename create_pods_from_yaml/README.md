# YAMLファイルからPodを作成する手順

1. YAMLファイルを作成する

以下のような形式でYAMLファイルを作成する。基本的に```kubectl run```で設定している引数の内容になっている。

```
apiVersion: v1
kind: Pod
metadata:
  name: helloworld # --name helloworldに相当
spec:
  containers:
    - image: node:v5 # イメージ名
      name: helloworld
      ports:
        - containerPort: 8080 # -p 8080:8080
          name: http
          protocol: TCP  
```

2. YAMLからPodを作成する

```
$ kubectl apply -f helloworld_pod.yaml
```

3. 生成されたPodを確認する

```
$ kubctl get pod
NAME                    READY     STATUS    RESTARTS   AGE
helloworld              1/1       Running   0          16m
```

便利そうなオプション
* --no-headers
* -o wide

さらに詳細な情報を得たい場合は、```describe``` サブコマンドを使うのが良さそう。

```
$ kubectl describe pods helloworld
Name:         helloworld
Namespace:    default
Node:         minikube/10.0.2.15
Start Time:   Fri, 18 May 2018 08:18:10 +0900
Labels:       <none>
Annotations:  kubectl.kubernetes.io/last-applied-configuration={"apiVersion":"v1","kind":"Pod","metadata":{"annotations":{},"name":"helloworld","namespace":"default"},"spec":{"containers":[{"image":"node:v5","name"...
Status:       Running
IP:           172.17.0.4
Containers:
  helloworld:
    Container ID:   docker://2309fb401483536447cb824c80636af96b0b3059b4997cf36b383d2dda935aa8
    Image:          node:v5
    Image ID:       docker://sha256:c70605d840de490eda25e9f7dfd8a7c940258383ac1e6871815994736e42650d
    Port:           8080/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Fri, 18 May 2018 08:18:11 +0900
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-vcddl (ro)
Conditions:
  Type           Status
  Initialized    True 
  Ready          True 
  PodScheduled   True 
Volumes:
  default-token-vcddl:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-vcddl
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute for 300s
                 node.kubernetes.io/unreachable:NoExecute for 300s
Events:
  Type    Reason                 Age   From               Message
  ----    ------                 ----  ----               -------
  Normal  Scheduled              18m   default-scheduler  Successfully assigned helloworld to minikube
  Normal  SuccessfulMountVolume  18m   kubelet, minikube  MountVolume.SetUp succeeded for volume "default-token-vcddl"
  Normal  Pulled                 18m   kubelet, minikube  Container image "node:v5" already present on machine
  Normal  Created                18m   kubelet, minikube  Created container
  Normal  Started                18m   kubelet, minikube  Started container
```

4. ポートフォワードでクラスタ外からのアクセスを可能に

```
$ kubectl port-forward helloworld 8080:8080
$ curl localhost:8080
```
