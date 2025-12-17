# Vercel 배포 가이드

이 문서는 Vercel을 사용한 Next.js 애플리케이션 배포 가이드를 제공합니다.

## 📋 사전 준비사항

1. **Vercel 계정 생성**
   - [Vercel](https://vercel.com)에서 계정 생성
   - GitHub 계정 연동 (권장)

2. **GitHub 저장소 준비**
   - 프로젝트가 GitHub에 푸시되어 있어야 합니다
   - `main` 또는 `master` 브랜치가 최신 상태인지 확인

3. **Supabase 설정 완료**
   - Supabase 프로젝트 생성 및 마이그레이션 완료
   - Supabase URL과 API 키 준비

## 🚀 배포 방법

### 방법 1: Vercel Dashboard 사용 (권장)

1. **프로젝트 가져오기**
   - [Vercel Dashboard](https://vercel.com/dashboard) 접속
   - **Add New** > **Project** 클릭
   - GitHub 저장소 선택 또는 Import

2. **프로젝트 설정**
   - **Framework Preset**: Next.js (자동 감지됨)
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `npm run build` (기본값)
   - **Output Directory**: `.next` (기본값)
   - **Install Command**: `npm install` (기본값)

3. **환경 변수 설정**
   - **Environment Variables** 섹션에서 다음 변수 추가:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```
   - 각 환경(Production, Preview, Development)에 대해 설정

4. **배포 실행**
   - **Deploy** 버튼 클릭
   - 빌드 로그 확인
   - 배포 완료 후 URL 확인

### 방법 2: Vercel CLI 사용

1. **Vercel CLI 설치**
   ```bash
   npm install -g vercel
   ```

2. **로그인**
   ```bash
   vercel login
   ```

3. **프로젝트 연결**
   ```bash
   vercel
   ```
   - 프로젝트 설정 질문에 답변
   - 기존 프로젝트가 있으면 연결, 없으면 새로 생성

4. **환경 변수 설정**
   ```bash
   # 프로덕션 환경 변수
   vercel env add NEXT_PUBLIC_SUPABASE_URL production
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
   
   # 프리뷰 환경 변수
   vercel env add NEXT_PUBLIC_SUPABASE_URL preview
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview
   
   # 개발 환경 변수
   vercel env add NEXT_PUBLIC_SUPABASE_URL development
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY development
   ```

5. **배포**
   ```bash
   # 프로덕션 배포
   vercel --prod
   
   # 프리뷰 배포
   vercel
   ```

## ⚙️ 환경 변수 설정

### 필수 환경 변수

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anon Key | `eyJhbGc...` |

### 환경 변수 설정 위치

1. **Vercel Dashboard**
   - Project Settings > Environment Variables
   - 각 환경별로 설정 가능

2. **환경별 설정**
   - **Production**: 프로덕션 배포에 사용
   - **Preview**: Pull Request 및 브랜치 배포에 사용
   - **Development**: 로컬 개발용 (`vercel dev`)

## 🔧 빌드 설정

### 빌드 명령어 확인

```bash
# 로컬에서 빌드 테스트
npm run build

# 빌드 성공 확인
npm run start
```

### 빌드 최적화

- Next.js 16은 자동으로 최적화됩니다
- 이미지 최적화는 `next.config.ts`에서 설정됨
- Supabase 이미지는 `remotePatterns`에 포함됨

## 📦 배포 체크리스트

### 배포 전 확인사항

- [ ] `npm run build` 로컬 빌드 성공
- [ ] 환경 변수 설정 완료
- [ ] Supabase 마이그레이션 완료
- [ ] Storage Bucket 설정 완료
- [ ] Git 저장소에 최신 코드 푸시됨

### 배포 후 확인사항

- [ ] 배포 URL 접속 가능
- [ ] 페이지 로딩 정상 작동
- [ ] Supabase 연결 확인
- [ ] 이미지 로딩 확인
- [ ] API 요청 정상 작동

## 🔍 문제 해결

### 빌드 실패

1. **환경 변수 확인**
   ```bash
   # Vercel Dashboard에서 환경 변수 확인
   # 또는 CLI로 확인
   vercel env ls
   ```

2. **로컬 빌드 테스트**
   ```bash
   npm run build
   # 로컬에서 빌드가 성공하면 Vercel에서도 성공해야 함
   ```

3. **빌드 로그 확인**
   - Vercel Dashboard > Deployments > 해당 배포 > Build Logs
   - 에러 메시지 확인

### 환경 변수 오류

1. **변수명 확인**
   - `NEXT_PUBLIC_` 접두사가 있는지 확인
   - 대소문자 정확히 일치하는지 확인

2. **재배포 필요**
   - 환경 변수 변경 후 자동 재배포되지 않음
   - 수동으로 재배포 필요

### 이미지 로딩 오류

1. **next.config.ts 확인**
   - `remotePatterns`에 Supabase 도메인 포함 확인

2. **Supabase Storage 설정 확인**
   - Bucket의 Public Access 활성화 확인
   - CORS 설정 확인

### Supabase 연결 오류

1. **환경 변수 확인**
   - Supabase URL과 Key가 정확한지 확인
   - Vercel Dashboard에서 확인

2. **RLS 정책 확인**
   - Supabase Dashboard에서 RLS 정책 확인
   - 필요한 정책이 모두 생성되었는지 확인

## 🔄 자동 배포 설정

### GitHub 연동

1. **자동 배포 활성화**
   - Vercel Dashboard > Project Settings > Git
   - Production Branch: `main` 또는 `master`
   - Auto-deploy: 활성화

2. **브랜치별 배포**
   - Pull Request마다 Preview 배포 생성
   - Production 브랜치에 푸시 시 자동 배포

### 커스텀 도메인 설정

1. **도메인 추가**
   - Vercel Dashboard > Project Settings > Domains
   - 도메인 추가 및 DNS 설정

2. **SSL 인증서**
   - Vercel이 자동으로 SSL 인증서 발급
   - HTTPS 자동 활성화

## 📊 모니터링

### Vercel Analytics

- Vercel Dashboard에서 Analytics 확인 가능
- 페이지 뷰, 성능 메트릭 등 확인

### 로그 확인

- Vercel Dashboard > Deployments > 해당 배포 > Logs
- 실시간 로그 스트리밍 가능

## 🆘 추가 리소스

- [Vercel 공식 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [Vercel CLI 문서](https://vercel.com/docs/cli)

## 📝 참고사항

- Vercel은 Next.js를 완벽하게 지원합니다
- 자동 HTTPS, CDN, Edge Functions 등이 자동으로 설정됩니다
- 무료 플랜에서도 충분한 기능을 제공합니다
- 환경 변수는 암호화되어 안전하게 저장됩니다

