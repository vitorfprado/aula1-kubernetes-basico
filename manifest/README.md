# Mini Aula Kubernetes no kind

Este projeto mostra uma estrutura basica de manifestos Kubernetes com:

- `Deployment` (com `resources` e `probes`)
- `Service` (NodePort)
- `ConfigMap`
- `HPA` (Horizontal Pod Autoscaler)
- `Namespace`

## Arquivos

- `configmap.yaml`
- `deployment.yaml`
- `service.yaml`
- `hpa.yaml`
- `namespace.yaml`

## Pre-requisitos

- Docker Desktop (ou Docker Engine) em execucao
- [kind](https://kind.sigs.k8s.io/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)

Para validar instalacao:

```powershell
kind version
kubectl version --client
docker version
```

## 1) Criar cluster local com kind

```powershell
kind create cluster --name exemplo-aula
```

Verifique o contexto atual:

```powershell
kubectl config current-context
```

## 2) Aplicar os manifestos

No diretorio deste projeto, execute:

```powershell
kubectl apply -f namespace.yaml
kubectl apply -f configmap.yaml -f deployment.yaml -f service.yaml -f hpa.yaml
```

## 3) Validar se subiu corretamente

```powershell
kubectl get ns
kubectl get pods -n aula-k8s
kubectl get deploy -n aula-k8s
kubectl get svc -n aula-k8s
kubectl get hpa -n aula-k8s
```

Se quiser detalhes do pod:

```powershell
kubectl describe pod -n aula-k8s -l app=exemplo
```

## 4) Testar acesso a aplicacao

Opcao simples para aula (recomendada): `port-forward`

```powershell
kubectl port-forward -n aula-k8s svc/exemplo-service 8080:80
```

Abra no navegador:

- http://localhost:8080

## 5) HPA no kind (observacao importante)

O HPA depende de metricas de CPU/memoria fornecidas pelo `metrics-server`.
Sem ele, o HPA aparece com metricas como `<unknown>`.

Instalacao rapida do metrics-server:

```powershell
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
kubectl patch deployment metrics-server -n kube-system --type='json' -p='[{\"op\":\"add\",\"path\":\"/spec/template/spec/containers/0/args/-\",\"value\":\"--kubelet-insecure-tls\"}]'
```

Confirme:

```powershell
kubectl get apiservice v1beta1.metrics.k8s.io
kubectl top nodes
kubectl top pods -n aula-k8s
```

## 6) Gerar carga para demonstrar autoscaling

Crie um pod temporario para fazer requisicoes:

```powershell
kubectl run load-generator --rm -it -n aula-k8s --image=busybox -- /bin/sh
```

Dentro do shell do pod:

```sh
while true; do wget -q -O- http://exemplo-service.aula-k8s.svc.cluster.local; done
```

Em outro terminal:

```powershell
kubectl get hpa -n aula-k8s -w
kubectl get pods -n aula-k8s -w
```

## 7) Limpeza do ambiente

Apagar recursos:

```powershell
kubectl delete -f hpa.yaml -f service.yaml -f deployment.yaml -f configmap.yaml
kubectl delete -f namespace.yaml
```

Apagar cluster kind:

```powershell
kind delete cluster --name exemplo-aula
```

---

Dica didatica: namespace ajuda a organizar por time/projeto, aplicar RBAC e quotas sem misturar recursos do cluster inteiro.
