# DayTrader Helm Charts

This repository contains [Helm charts](https://github.com/helm/helm) for the [DayTrader](https://github.com/jpmorganchase/daytrader-example-webrepo) application. It contains a Helm chart for each of the individual services as well as a single Helm chart to deploy the entire application in one go.

For a brief introduction to [Kubernetes](https://kubernetes.io/), [Helm](https://helm.sh/), and the lessons learned writing Helm Charts for DayTrader see the presentation below.
<p align="center">
  <a href="Helm.pdf"><img alt="Authoring Helm Charts for DayTrader - Lessons Learned Writing the Helm Charts for DayTrader" src="Helm.jpg"/></a>
</p>


# Packaging the Charts

All charts in this repository can be packaged via

```
./package-charts.sh <path-to-daytrader-helm-charts-repo-directory>
```

Assuming directory `../daytrader-helm-charts-repo` exists or has been previously cloned from [https://github.com/jpmorganchase/daytrader-helm-charts-repo](https://github.com/jpmorganchase/daytrader-helm-charts-repo), an example packaging may look like

```
./package-charts.sh ../daytrader-helm-charts-repo/
```

Here, the `package-charts.sh` script updates all dependencies before packaging the individual Helm charts.


# Deploying the Charts

This repository only holds the source code for the Helm charts.

The packaged charts can be found at [https://github.com/jpmorganchase/daytrader-helm-charts-repo](https://github.com/jpmorganchase/daytrader-helm-charts-repo). This repository also contains instructions on how to add the repository to `helm` as well as deploying the packages charts via `helm`.
