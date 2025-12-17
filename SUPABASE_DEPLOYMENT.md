# Supabase 배포 가이드

이 문서는 Supabase 데이터베이스 배포를 위한 가이드입니다.

## 📋 사전 준비사항

1. **Supabase 프로젝트 생성**
   - [Supabase Dashboard](https://app.supabase.com)에서 새 프로젝트 생성
   - 프로젝트 URL과 API 키 확인

2. **환경 변수 설정**
   - `.env.local` 파일 생성 (로컬 개발용)
   - 배포 환경의 환경 변수 설정

## 🔧 환경 변수 설정

### 로컬 개발 환경 (`.env.local`)

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 배포 환경 (Vercel, Netlify 등)

배포 플랫폼의 환경 변수 설정에서 다음 변수를 추가하세요:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase Anon Key

## 🗄️ 데이터베이스 마이그레이션

### 방법 1: Supabase SQL Editor 사용 (권장)

1. [Supabase Dashboard](https://app.supabase.com) 접속
2. 프로젝트 선택
3. 좌측 메뉴에서 **SQL Editor** 클릭
4. `supabase_migration.sql` 파일의 내용을 복사하여 붙여넣기
5. **Run** 버튼 클릭하여 실행

### 방법 2: Supabase CLI 사용

```bash
# Supabase CLI 설치 (아직 설치하지 않은 경우)
npm install -g supabase

# Supabase 로그인
supabase login

# 프로젝트 연결
supabase link --project-ref your-project-ref

# 마이그레이션 실행
supabase db push
```

## 📦 Storage Bucket 설정

다음 Storage Bucket들을 생성하고 설정하세요:

### 1. equipment-images
- **용도**: 장비 이미지 저장
- **Public Access**: 활성화
- **File Size Limit**: 필요에 따라 설정 (기본값: 50MB)

### 2. equipment-assets
- **용도**: 장비 PDF 및 자산 파일 저장
- **Public Access**: 활성화
- **File Size Limit**: 필요에 따라 설정 (기본값: 100MB)

### 3. post-files
- **용도**: 게시글 첨부 파일 저장
- **Public Access**: 활성화
- **File Size Limit**: 필요에 따라 설정 (기본값: 50MB)

### Storage Bucket 생성 방법

1. Supabase Dashboard > **Storage** 메뉴 클릭
2. **New bucket** 버튼 클릭
3. Bucket 이름 입력 및 Public Access 활성화
4. **Create bucket** 클릭

## ✅ 배포 체크리스트

### 데이터베이스
- [ ] `equipments` 테이블에 `display_order` 컬럼 추가됨
- [ ] `equipment_images` 테이블 생성됨
- [ ] RLS (Row Level Security) 정책 설정됨
- [ ] 인덱스 생성됨

### Storage
- [ ] `equipment-images` bucket 생성 및 Public Access 활성화
- [ ] `equipment-assets` bucket 생성 및 Public Access 활성화
- [ ] `post-files` bucket 생성 및 Public Access 활성화

### 환경 변수
- [ ] `NEXT_PUBLIC_SUPABASE_URL` 설정됨
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` 설정됨

### 테스트
- [ ] 데이터베이스 연결 테스트
- [ ] Storage 업로드/다운로드 테스트
- [ ] RLS 정책 동작 확인

## 🔍 문제 해결

### 마이그레이션 오류 발생 시

1. **이미 존재하는 객체 오류**
   - `IF NOT EXISTS` 구문이 포함되어 있어 대부분 자동으로 처리됩니다
   - 특정 오류가 발생하면 해당 부분만 주석 처리하고 다시 실행

2. **RLS 정책 충돌**
   - 기존 정책을 확인하고 중복되는 정책 삭제
   - `DROP POLICY IF EXISTS` 구문으로 안전하게 처리됩니다

3. **Storage 접근 권한 오류**
   - Bucket의 Public Access가 활성화되어 있는지 확인
   - Storage 정책에서 읽기 권한 확인

### 데이터베이스 연결 오류

1. **환경 변수 확인**
   ```bash
   # 로컬에서 확인
   echo $NEXT_PUBLIC_SUPABASE_URL
   echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

2. **Supabase 프로젝트 상태 확인**
   - Supabase Dashboard에서 프로젝트가 활성 상태인지 확인
   - API 키가 유효한지 확인

## 📚 추가 리소스

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase JavaScript 클라이언트](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Storage 가이드](https://supabase.com/docs/guides/storage)

## 🆘 지원

문제가 발생하면 다음을 확인하세요:

1. Supabase Dashboard의 로그 확인
2. 브라우저 콘솔의 에러 메시지 확인
3. 네트워크 탭에서 API 요청 상태 확인

