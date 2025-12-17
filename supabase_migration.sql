-- ============================================
-- Supabase 배포 마이그레이션 스크립트
-- ============================================
-- 이 파일은 Supabase SQL Editor에서 순서대로 실행하세요.
-- 또는 Supabase CLI를 사용하여 배포할 수 있습니다.
-- ============================================

-- ============================================
-- 1. equipments 테이블 수정
-- ============================================

-- display_order 컬럼 추가 (없는 경우)
ALTER TABLE equipments 
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- 기존 데이터에 display_order 값 설정
UPDATE equipments 
SET display_order = 0 
WHERE display_order IS NULL;

-- 인덱스 추가 (정렬 성능 향상)
CREATE INDEX IF NOT EXISTS idx_equipments_display_order ON equipments(display_order);

-- ============================================
-- 2. equipment_images 테이블 생성
-- ============================================

-- equipment_images 테이블 생성 (없는 경우)
CREATE TABLE IF NOT EXISTS equipment_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  equipment_id UUID NOT NULL REFERENCES equipments(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성 (성능 향상)
CREATE INDEX IF NOT EXISTS idx_equipment_images_equipment_id ON equipment_images(equipment_id);
CREATE INDEX IF NOT EXISTS idx_equipment_images_created_at ON equipment_images(created_at);

-- RLS (Row Level Security) 정책 설정
ALTER TABLE equipment_images ENABLE ROW LEVEL SECURITY;

-- 공개 읽기 정책
DROP POLICY IF EXISTS "equipment_images_select_policy" ON equipment_images;
CREATE POLICY "equipment_images_select_policy" ON equipment_images
  FOR SELECT
  USING (true);

-- 공개 삽입 정책
DROP POLICY IF EXISTS "equipment_images_insert_policy" ON equipment_images;
CREATE POLICY "equipment_images_insert_policy" ON equipment_images
  FOR INSERT
  WITH CHECK (true);

-- 공개 업데이트 정책
DROP POLICY IF EXISTS "equipment_images_update_policy" ON equipment_images;
CREATE POLICY "equipment_images_update_policy" ON equipment_images
  FOR UPDATE
  USING (true);

-- 공개 삭제 정책
DROP POLICY IF EXISTS "equipment_images_delete_policy" ON equipment_images;
CREATE POLICY "equipment_images_delete_policy" ON equipment_images
  FOR DELETE
  USING (true);

-- updated_at 자동 업데이트 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거 생성
DROP TRIGGER IF EXISTS update_equipment_images_updated_at ON equipment_images;
CREATE TRIGGER update_equipment_images_updated_at
  BEFORE UPDATE ON equipment_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 3. equipments 테이블 RLS 정책 설정
-- ============================================

-- RLS 활성화 확인 및 정책 추가
ALTER TABLE public.equipments ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제 (중복 방지)
DROP POLICY IF EXISTS "Allow public insert on equipments" ON public.equipments;
DROP POLICY IF EXISTS "Allow public select on equipments" ON public.equipments;
DROP POLICY IF EXISTS "Allow public update on equipments" ON public.equipments;
DROP POLICY IF EXISTS "Allow public delete on equipments" ON public.equipments;

-- INSERT 정책 추가
CREATE POLICY "Allow public insert on equipments"
ON public.equipments
FOR INSERT
TO public
WITH CHECK (true);

-- SELECT 정책 추가
CREATE POLICY "Allow public select on equipments"
ON public.equipments
FOR SELECT
TO public
USING (true);

-- UPDATE 정책 추가
CREATE POLICY "Allow public update on equipments"
ON public.equipments
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- DELETE 정책 추가
CREATE POLICY "Allow public delete on equipments"
ON public.equipments
FOR DELETE
TO public
USING (true);

-- ============================================
-- 4. Storage Bucket 설정 확인
-- ============================================
-- 다음 Storage Bucket들이 생성되어 있어야 합니다:
-- - equipment-images: 장비 이미지 저장용
-- - equipment-assets: 장비 PDF 및 자산 파일 저장용
-- - post-files: 게시글 첨부 파일 저장용
--
-- Storage Bucket은 Supabase Dashboard > Storage에서 생성하세요.
-- 각 Bucket의 Public Access를 활성화하세요.

-- ============================================
-- 마이그레이션 완료 확인
-- ============================================

-- equipments 테이블 확인
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'equipments' 
ORDER BY ordinal_position;

-- equipment_images 테이블 확인
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'equipment_images'
ORDER BY ordinal_position;

-- RLS 정책 확인
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename IN ('equipments', 'equipment_images')
ORDER BY tablename, policyname;

