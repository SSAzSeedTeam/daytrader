# DayTrader Helm Charts Repository

This repository is intended to be used as a [Helm](https://github.com/helm/helm) [chart repository](https://github.com/helm/helm/blob/master/docs/chart_repository.md). It contains the packaged Helm charts for the [DayTrader](https://github.com/jpmorganchase/daytrader-example-webrepo) application at [https://github.com/jpmorganchase/daytrader-helm-charts](https://github.com/jpmorganchase/daytrader-helm-charts).




# Adding the Repository to `helm`

This chart repository can be added to `helm` via

```
helm repo add jpmc 'https://raw.githubusercontent.com/jpmorganchase/daytrader-helm-charts-repo/master/'
helm repo update
```
Here, the latter command is required in order to get the (latest) information about charts from the `jpmc` repository.


All charts in the repository can be listed via
```
helm search jpmc
```




# Installing the DayTrader Helm Chart

The Helm chart for Daytrader has a number of required parameters such as

- Host names
- TLS certificate and key

This section outlines how to generate the TLS certificate as well as how to eventually install DayTrader via `helm`.



## Generating Certificate and Key

The TLS certificate and keys can be generated using the [`generate_tls_certs.sh`](https://github.com/jpmorganchase/daytrader-helm-charts/blob/master/generate_tls_certs.sh) Bash script included in the [https://github.com/jpmorganchase/daytrader-helm-charts](https://github.com/jpmorganchase/daytrader-helm-charts) repository. Note that the Bash script is not included in this repository on purpose to keep it as a mere chart repository.

Using the Bash script, the TLS certificate and keys can be generated via
```
./generate_tls_certs.sh <common-name>
```

If DayTrader is supposed to be acessible via `daytrader.example.com`, then 
```
./generate_tls_certs.sh daytrader.example.com
```
would created the following output
```
Generating RSA private key, 2048 bit long modulus
......................................................................+++++
...........+++++
e is 65537 (0x10001)
TLS Certificate:
LS0tLS1CRUdJTiBD...LQo=
TLS Key:
LS0tLS1CRUdJTiBS...tCg==
```
Here, the outputs in `TLS Certificate` and `TLS Key` are already [Base64](https://en.wikipedia.org/wiki/Base64) encoded, as is required for Kubernetes secrets. A modern operating system should be able to display the outputs such that they can be directly copied from the console. Note that the outputs above are _truncated and not valid Base64_ encoded strings.

The Bash script also outputs the Base64 encoded TLS certificate and key in two separate files named

```
<common-name>-<timestamp>.crt
<common-name>-<timestamp>.key
```
With the common name set to `daytrader.example.com` and the timestamp being `2018-12-18_18-57-39`, the two files
```
daytrader.example.com-2018-12-18_18-57-39.crt
daytrader.example.com-2018-12-18_18-57-39.key
```
are generated.


## Preparing the Minimum Chart Values

At minimum, the DayTrader Helm chart requires a TLS certificate and key. As a best practice, we recommend adding a domain for ingress.

When using the above truncated TLS certificate and key as well as the domain `daytrader.example.com`, a minimum value file might look like
```
daytrader-web:
  ingress:
    hosts: 
      - "daytrader.example.com"
    tls:
      - hosts: 
        - "daytrader.example.com"
  secrets:
    tls:
      crt: "LS0tLS1CRUdJTiBD...LQo="
      key: "LS0tLS1CRUdJTiBS...tCg=="
```
Here, the values are grouped under `daytrader-web`, as they are eventually passed to the `daytrader-web` subchart.

## Installing DayTrader

When saving the above minimum chart values to file `my-values.yaml`, DayTrader can be installed via
```
helm install jpmc/daytrader -f my-values.yaml --name daytrader
```

Here, `--name daytrader` is used to name the release as it makes upgrading, rolling back, or deleting the release easier.


# DNS Record Update for Ingress

The Helm chart should be installed with an ingress host domain as outlined above. When doing so, the corresponding DNS record should be updated as well.

When using an A record, update the DNS record to point to the output of
```
kubectl get ingress <release-name>-daytrader-web -o jsonpath="{.items[0].status.loadBalancer.ingress[0].ip}"
```

When using a CNAME, please refer to the documentation of your cloud provider.

Additional information, as well as instructions, are provided in the notes upon installing the Helm chart.


# Deleting the DayTrader Helm Chart

When installing DayTrader with name `daytrader` as outlined above, the Helm chart can be uninstalled via
```
helm delete daytrader
```
