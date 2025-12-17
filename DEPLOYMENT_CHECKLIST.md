# 배포 체크리스트

## ✅ Vercel 배포 준비 완료

### 완료된 작업

- [x] Next.js 빌드 성공 확인
- [x] `useSearchParams()` Suspense 경계 처리 완료
- [x] `vercel.json` 설정 파일 생성
- [x] `.vercelignore` 파일 생성
- [x] 배포 가이드 문서 작성

### 배포 전 확인사항

#### 1. 환경 변수 설정
Vercel Dashboard에서 다음 환경 변수를 설정하세요:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### 2. Supabase 마이그레이션
- [ ] `supabase_migration.sql` 실행 완료
- [ ] Storage Bucket 생성 완료
  - [ ] `equipment-images`
  - [ ] `equipment-assets`
  - [ ] `post-files`

#### 3. Git 저장소
- [ ] 최신 코드가 GitHub에 푸시됨
- [ ] `main` 또는 `master` 브랜치가 최신 상태

### 배포 단계

1. **Vercel Dashboard 접속**
   - https://vercel.com/dashboard

2. **프로젝트 Import**
   - Add New > Project
   - GitHub 저장소 선택

3. **환경 변수 설정**
   - Project Settings > Environment Variables
   - 위의 환경 변수 추가

4. **배포 실행**
   - Deploy 버튼 클릭
   - 빌드 로그 확인

5. **배포 확인**
   - 배포 URL 접속 테스트
   - 주요 페이지 동작 확인

### 배포 후 확인사항

- [ ] 홈페이지 로딩 확인
- [ ] 장비 목록 페이지 확인
- [ ] 사업 실적 페이지 확인
- [ ] Archive 페이지들 확인
- [ ] 이미지 로딩 확인
- [ ] Supabase 연결 확인

### 문제 발생 시

1. **빌드 실패**
   - Vercel Dashboard > Deployments > Build Logs 확인
   - 로컬에서 `npm run build` 실행하여 확인

2. **환경 변수 오류**
   - 환경 변수 이름 확인 (`NEXT_PUBLIC_` 접두사 필수)
   - 환경 변수 값 확인
   - 재배포 필요 (환경 변수 변경 후 자동 재배포 안 됨)

3. **이미지 로딩 오류**
   - `next.config.ts`의 `remotePatterns` 확인
   - Supabase Storage Bucket Public Access 확인

4. **Supabase 연결 오류**
   - 환경 변수 확인
   - Supabase 프로젝트 상태 확인
   - RLS 정책 확인

### 참고 문서

- `VERCEL_DEPLOYMENT.md` - 상세 배포 가이드
- `SUPABASE_DEPLOYMENT.md` - Supabase 설정 가이드

