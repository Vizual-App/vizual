# Vizual
Opensource Dashboarding Tool for visualizing data. Integrate different datasources easily and generate dashboards for data analytics. Supports Dashboard as Code. Runs on multiple platforms. Primary support would be for running on Kubernetes. 

## Build and deploy
- docker build -t vizual .
- docker run -p 3000:3000 vizual


## Install Vizual using Helm:

```bash
helm repo add vizual https://vizual-app.github.io/vizual/
helm repo update

helm upgrade -i vizual vizual/vizual -n vizual
```
