
# CI/CD Workshop Demo (Docker Edition)

Tento projekt slouží jako ukázka automatizovaného testování a nasazení pomocí nástrojů:

- ✅ Jest (unit testy)
- ✅ Playwright (E2E testy)
- ✅ GitHub Actions (CI pipeline)
- ✅ Docker + Docker Compose
- ✅ Terraform (Infrastructure as Code)

---

## 🚀 Jak spustit demo

### 1. Klonování repozitáře nebo rozbalení ZIPu
```bash
git clone https://github.com/vase-org/ci-cd-workshop-demo.git
cd ci-cd-workshop-demo
```

### 2. Lokální spuštění pomocí Docker Compose
```bash
docker-compose up --build
```
➡️ Spustí unit testy pomocí Jest v kontejneru

---

## 🔬 Lokální spuštění bez Dockeru (alternativa)

### 1. Instalace závislostí
```bash
npm install
npx playwright install
```

### 2. Spuštění testů
```bash
npm run test      # Spustí Jest testy
npm run e2e       # Spustí Playwright testy
```

---

## 🛠 Struktura projektu

```
.
├── src/                 # Aplikační logika
├── tests/               # Testy (unit + e2e)
├── .github/workflows/   # CI konfigurace (GitHub Actions)
├── terraform/           # Infrastructure as Code (Docker container)
├── Dockerfile           # Build image s testovacím prostředím
├── docker-compose.yml   # Definice služby pro spuštění testů
```

---

## 📦 CI/CD Pipeline (GitHub Actions)

Workflow `.github/workflows/ci.yml` spouští:
- ✅ Build a testy na každém push/PR
- ✅ Matrix buildy (Node.js 16 a 18)
- ✅ Automatické testy (Jest + Playwright)

---

## 🌍 Infrastructure as Code

Pomocí Terraform vytvoříte testovací prostředí v Dockeru:

```bash
cd terraform
terraform init
terraform apply
```

---

## 📄 Licence

MIT – Feel free to fork, upravit a použít pro vlastní účely.
