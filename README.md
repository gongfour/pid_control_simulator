# 🎛️ PID 제어 시뮬레이터

입력값, PID 파라미터(Kp, Ki, Kd) 및 외부 잡음에 따른 제어 시스템의 동적 응답을 시뮬레이션하는 대화형 웹 애플리케이션입니다.

## ✨ 주요 기능

### 📥 입력값 설정
- **상수 입력**: 일정한 값 유지
- **단계 입력 (Step Input)**: 여러 시점에서 급격한 변화 설정
  - 예: 0~2초 입력=0, 2~5초 입력=100, 5~10초 입력=50
- **정현파 입력 (Sinusoidal)**: 진폭, 주파수, 오프셋 조정 가능

### ⚙️ PID 파라미터 조정
- **Kp (비례 계수)**: 0 ~ 5.0
- **Ki (적분 계수)**: 0 ~ 2.0
- **Kd (미분 계수)**: 0 ~ 2.0
- 슬라이더 또는 직접 입력으로 조정 가능

### 🔊 외부 잡음 추가
- 가우시안 화이트 노이즈 시뮬레이션
- 잡음 크기(표준편차) 0 ~ 20 설정 가능
- 실제 환경의 센서 노이즈 반영

### 📊 실시간 시뮬레이션 결과
- **목표값**: 설정한 입력값
- **실제값**: PID 제어기로 조절된 시스템 출력
- **제어신호**: PID 제어기가 생성한 제어 신호
- 동적 그래프 시각화

### 📈 시뮬레이션 통계
- 최대 출력값
- 최종 출력값
- 정상상태 오차
- 평균 오차
- 데이터 포인트 개수

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속

### 프로덕션 빌드

```bash
npm run build
```

`dist` 폴더에 최적화된 빌드 파일이 생성됩니다.

## 🛠️ 기술 스택

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Charts**: Chart.js + react-chartjs-2
- **Build Tool**: Vite
- **Deployment**: Cloudflare Pages

## 📁 프로젝트 구조

```
pid_control_simulator/
├── src/
│   ├── components/
│   │   ├── SimulationChart.tsx      # 그래프 컴포넌트
│   │   ├── PIDControls.tsx          # PID 파라미터 UI
│   │   └── InputControls.tsx        # 입력값 및 잡음 UI
│   ├── utils/
│   │   └── pidSimulation.ts         # PID 시뮬레이션 엔진
│   ├── App.tsx                      # 메인 앱
│   ├── main.tsx                     # 진입점
│   └── index.css                    # 스타일
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🧮 PID 제어 알고리즘

시뮬레이터는 고전적인 PID 제어기를 구현합니다:

```
u(t) = Kp * e(t) + Ki * ∫e(t)dt + Kd * de(t)/dt
```

where:
- `e(t)` = 목표값 - 현재값 (오차)
- `u(t)` = 제어 신호

### 시스템 모델

1차 선형 시스템 (1-order system):
```
dy/dt = -1/τ * y + 1/τ * u
```

where:
- `τ = 1.0` (시정수)
- `y` = 시스템 출력
- `u` = 제어 신호

## 📊 사용 예시

### 예제 1: 빠른 응답 (Aggressive Control)
```
Kp = 3.0
Ki = 1.0
Kd = 0.5
입력: 단계입력 (0→100→50)
잡음: 0
```

### 예제 2: 안정적인 응답 (Moderate Control)
```
Kp = 1.0
Ki = 0.5
Kd = 0.1
입력: 단계입력 (0→100→50)
잡음: 2.0
```

### 예제 3: 잡음에 강한 응답 (Robust Control)
```
Kp = 0.8
Ki = 0.3
Kd = 0.05
입력: 정현파 (진폭=100, 주파수=0.1Hz)
잡음: 10.0
```

## 🚀 Cloudflare Pages 배포

자세한 배포 지침은 [DEPLOYMENT.md](DEPLOYMENT.md)를 참조하세요.

### 빠른 배포

1. GitHub에 저장소 푸시
2. Cloudflare Pages 대시보드에서 GitHub 연결
3. 빌드 설정:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Deploy!

## 📝 라이선스

MIT

## 🤝 기여

기여는 언제든 환영합니다!

## 📞 문의

문제가 발생하거나 기능을 제안하고 싶으시면 GitHub Issues를 열어주세요.
