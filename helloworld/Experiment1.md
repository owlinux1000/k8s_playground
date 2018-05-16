# 実験1


## 実験事項

* アクセスしているコンテナを削除したら、同一Pod内の他のコンテナにつながることを確認する


## 手順

1. server.js を以下のようなIPアドレス、hostnameを返す処理に変更する。

```
  var os = require('os');
  var hostname = os.hostname();
  var ifaces = os.networkInterfaces();
  var ipAddress;
 
  Object.keys(ifaces).forEach(function (ifname) {
    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }
      console.log(ifname, iface.address);
      // en0 192.168.1.NNN
      ipAddress = iface.address;
    });
  });
  response.writeHead(200);
  response.end(ipAddress + hostname);
```

2. podの立ち上げ

```
$ docker build -t hello-node:v3 .
$ kubectl run hello-node --image=hello-node:v3 --port=8080 --replicas=2
$ kubectl expose deployment hello-node --type=LoadBalancer
$ minikube service hello-node
```

上記を実行後、立ち上がるブラウザでホスト名とIPアドレスを確認する。

3. podの削除と自動更新の確認

```
$ kubectl delete pods <ブラウザで確認したホスト名のコンテナ名>
```

少し立つと自動的に新しいコンテナが立ち上がり、なおブラウザをリロードすると、別IPアドレス、別ホスト名が表示され、別のコンテナに自動的につながれていることがわかる。また、アクセス元としてのURLは変わっていないこともわかる。
