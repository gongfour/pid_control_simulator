# Cloudflare Pages 배포 가이드

## 사전 준비

1. [Cloudflare](https://www.cloudflare.com) 계정 생성
2. [GitHub](https://github.com) 계정에 프로젝트 푸시

## 배포 단계

### 1. GitHub에 저장소 푸시

```bash
git init
git add .
git commit -m "Initial commit: PID control simulator"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/pid_control_simulator.git
git push -u origin main
```

### 2. Cloudflare Pages 연결

1. Cloudflare 대시보드 접속
2. **Pages** → **Create a project** 클릭
3. **Connect to Git** 선택
4. GitHub 저장소 연결
5. 빌드 설정 확인:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. **Deploy** 클릭

### 3. 배포 완료

배포가 완료되면 자동으로 생성된 URL에서 프로젝트를 볼 수 있습니다.

예: `https://pid-control-simulator.pages.dev`

## 자동 배포

GitHub에 푸시할 때마다 자동으로 Cloudflare Pages에 배포됩니다.

## 커스텀 도메인 설정 (선택사항)

1. Cloudflare Pages 프로젝트 설정
2. **Custom domain** → **Set up custom domain** 클릭
3. 도메인 입력 및 DNS 레코드 설정

## 환경 변수 설정 (필요시)

Cloudflare Pages 대시보드에서:
1. 프로젝트 → **Settings**
2. **Build & Deployments** → **Environment Variables**
3. 필요한 변수 추가
