# Vizual
Opensource Dashboarding Tool for visualizing data. Integrate different datasources easily and generate dashboards for data analytics. Supports Dashboard as Code. Runs on multiple platforms. Primary support would be for running on Kubernetes. 

## Build and deploy
- docker build -t vizual .
- docker run -p 3000:3000 vizual


## Install using helm chart

## Install Postgres:

```bash
helm repo add vizual https://vizual-app.github.io/vizual/
helm repo update

helm upgrade -i postgres vizual/postgres -n vizual
```

## Install dex:
```bash
helm repo add dex https://charts.dexidp.io
helm repo update

helm upgrade -i dex dex/dex -n vizual
```

## Install dex client:
```bash
helm upgrade -i dex-client vizual/dex-client -n vizual
```

## Install Vizual:
```bash
helm upgrade -i vizual vizual/vizual -n vizual
```
