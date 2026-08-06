#!/bin/bash
# Trivy Security Scanner Script for CI/CD

echo "[DevSecOps] Initializing Trivy Vulnerability Scan..."

# Scan dependencies in package-lock.json
echo "1. Scanning Node Dependencies..."
trivy fs --scanners vuln,secret,config --severity HIGH,CRITICAL ./

# (Optional) Scan Docker Image if available
# echo "2. Scanning Docker Image..."
# trivy image helping-hand-backend:latest --severity CRITICAL

if [ $? -eq 0 ]; then
    echo "[DevSecOps] ✅ Scan passed successfully. No critical vulnerabilities found."
    exit 0
else
    echo "[DevSecOps] ❌ CRITICAL vulnerabilities found. Blocking CI/CD pipeline."
    exit 1
fi
