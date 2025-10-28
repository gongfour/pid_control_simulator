# PID 제어 시뮬레이터 - 프로젝트 요약

## ✅ 완료된 작업

### 1. 프로젝트 초기화
- Vite + React 19 + TypeScript 설정
- Tailwind CSS v4 통합
- Chart.js 그래프 라이브러리 설정

### 2. 핵심 시뮬레이션 엔진 구현 (`src/utils/pidSimulation.ts`)
- **PID 제어기**: Kp, Ki, Kd 파라미터 지원
- **입력값 생성**:
  - 상수 입력 (Constant)
  - 단계 입력 (Step) - 여러 단계 설정 가능
  - 정현파 입력 (Sinusoidal) - 진폭, 주파수, 오프셋 조정
- **시스템 시뮬레이션**: 1차 선형 시스템 (τ=1.0)
- **잡음 추가**: 가우시안 화이트 노이즈 (Box-Muller 방식)
- **데이터 출력**: 시간, 목표값, 실제값, 오차, 제어신호

### 3. React 컴포넌트 개발

#### `src/components/SimulationChart.tsx`
- Chart.js를 이용한 실시간 그래프 시각화
- 목표값(파란색), 실제값(빨간색), 제어신호(초록색) 표시
- 이중 Y축 (Output/Control Signal 분리)

#### `src/components/PIDControls.tsx`
- Kp, Ki, Kd 슬라이더 입력
- 수치 직접 입력 지원
- 초기화 버튼

#### `src/components/InputControls.tsx`
- 입력 타입 선택 (상수/단계/정현파)
- 각 입력 타입별 파라미터 조정
- 외부 잡음 크기 설정 (0~20)

#### `src/App.tsx`
- 전체 UI 레이아웃 및 상태 관리
- 시뮬레이션 실행 로직
- 통계 정보 표시 (최대값, 최종값, 정상상태오차 등)

### 4. 빌드 및 배포 설정
- Vite 설정 완료
- Tailwind CSS v4 PostCSS 통합
- Cloudflare Pages 배포용 wrangler.toml
- DEPLOYMENT.md 작성

## 📊 입력값 설정 방식 상세 설명

### 1. 상수 입력 (Constant)
```
입력값 = 고정값 (예: 100)
```
- 시간에 관계없이 항상 같은 값 유지
- 정상상태 응답 테스트에 유용

### 2. 단계 입력 (Step Input) - 가장 일반적
```
시간 t1: 입력값 = v1
시간 t2: 입력값 = v2
...
```
- 각 시점에서 입력값을 변경
- 예:
  - 0초: 0
  - 2초: 100 (급격한 상승)
  - 5초: 50 (하강)
- 제어기의 추적 성능과 안정성 테스트에 적합

### 3. 정현파 입력 (Sinusoidal)
```
입력값 = offset + amplitude * sin(2π*frequency*time)
```
- 진폭 (Amplitude): 0~200
- 주파수 (Frequency): 0.01~1.0 Hz
- 오프셋 (Offset): 0~200
- 동적 추적 성능과 대역폭 특성 분석에 유용

## 🔧 외부 잡음 설정

### 가우시안 화이트 노이즈
```
noise = N(0, σ²)  // 평균 0, 표준편차 σ
```
- **σ = 0**: 잡음 없음 (이상적인 조건)
- **σ = 2~5**: 약간의 센서 노이즈 (실제 환경)
- **σ = 10~20**: 큰 잡음 (악조건)

## 🧪 추천 테스트 시나리오

### 시나리오 1: 제어기 튜닝 기초
```
입력: 단계입력 (0→100→50)
Kp=1.0, Ki=0.5, Kd=0.1
잡음=0
```
기본 PID 튜닝으로 빠른 응답과 안정성 확인

### 시나리오 2: 오버슈트 감소
```
입력: 단계입력 (0→100)
Kp=2.0, Ki=0.3, Kd=0.5
잡음=0
```
Kd를 증가시켜 오버슈트 감소

### 시나리오 3: 정상상태오차 제거
```
입력: 상수 100
Kp=1.0, Ki=1.0, Kd=0.1
잡음=0
```
Ki 증가로 정상상태오차 제거

### 시나리오 4: 잡음 영향 테스트
```
입력: 정현파 (진폭=100, 주파수=0.1Hz)
Kp=1.0, Ki=0.5, Kd=0.1
잡음=5.0~10.0
```
실제 환경 조건 시뮬레이션

## 🚀 다음 단계

### 배포하기
1. GitHub에 저장소 생성 및 푸시
2. Cloudflare Pages 대시보드에서 GitHub 연결
3. 자동 배포 설정

```bash
# 로컬에서 빌드 테스트
npm run build

# 빌드 결과 확인
ls -la dist/
```

### 기능 확장 (선택사항)
- [ ] CSV/JSON 데이터 내보내기
- [ ] 시뮬레이션 데이터 저장/로드
- [ ] 고급 시스템 모델 (2차, 3차 시스템)
- [ ] 다중 PID 제어기 비교
- [ ] 시뮬레이션 속도 조정
- [ ] 다크 테마
- [ ] 다국어 지원

## 📦 파일 크기

빌드 결과:
- CSS: 1.77 KB (gzip: 0.86 KB)
- JS: 372.02 KB (gzip: 121.91 KB)
- HTML: 0.63 KB (gzip: 0.43 KB)

매우 가볍고 Cloudflare Pages에 최적화됨!

## 🔗 배포 링크

Cloudflare Pages에 배포 후, 다음 URL에서 접속 가능:
```
https://[your-project-name].pages.dev
```

## 💡 주요 설계 결정

1. **클라이언트 사이드 시뮬레이션**
   - 서버 비용 0
   - 오프라인 동작 가능
   - 빠른 응답성

2. **모듈화된 아키텍처**
   - 시뮬레이션 엔진과 UI 분리
   - 향후 확장 용이

3. **Tailwind CSS 사용**
   - 빠른 UI 개발
   - 최소 CSS 파일 크기

4. **Chart.js 선택**
   - 가볍고 빠름
   - 실시간 업데이트 지원
   - 풍부한 커스터마이징

## 📚 참고 자료

- [PID 제어 기초](https://en.wikipedia.org/wiki/Proportional%E2%80%93integral%E2%80%93derivative_controller)
- [React 문서](https://react.dev)
- [Vite 문서](https://vitejs.dev)
- [Cloudflare Pages 문서](https://developers.cloudflare.com/pages/)
