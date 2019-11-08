#!/bin/bash
# Files are ordered in proper order with needed wait for the dependent custom resource definitions to get initialized.
# Usage: bash kubectl-apply.sh

logSummary(){
    echo ""
    echo "#####################################################"
    echo "Please find the below useful endpoints,"
    echo "JHipster Console - http://jhipster-console.jhipcon."
    echo "#####################################################"
}

kubectl apply -f namespace.yml
kubectl apply -f registry/
kubectl apply -f blog/
kubectl apply -f conference/
kubectl apply -f gateway/
kubectl apply -f console/

logSummary
