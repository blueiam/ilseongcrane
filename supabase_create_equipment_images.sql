-- equipment_images 테이블 생성
-- Supabase SQL Editor에서 실행하세요

-- 1. equipment_images 테이블 생성 (없는 경우)
CREATE TABLE IF NOT EXISTS equipment_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  equipment_id UUID NOT NULL REFERENCES equipments(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 인덱스 생성 (성능 향상)
CREATE INDEX IF NOT EXISTS idx_equipment_images_equipment_id ON equipment_images(equipment_id);
CREATE INDEX IF NOT EXISTS idx_equipment_images_created_at ON equipment_images(created_at);

-- 3. RLS (Row Level Security) 정책 설정
ALTER TABLE equipment_images ENABLE ROW LEVEL SECURITY;

-- 공개 읽기 정책
CREATE POLICY "equipment_images_select_policy" ON equipment_images
  FOR SELECT
  USING (true);

-- 공개 삽입 정책 (관리자 페이지에서 사용)
CREATE POLICY "equipment_images_insert_policy" ON equipment_images
  FOR INSERT
  WITH CHECK (true);

-- 공개 업데이트 정책
CREATE POLICY "equipment_images_update_policy" ON equipment_images
  FOR UPDATE
  USING (true);

-- 공개 삭제 정책
CREATE POLICY "equipment_images_delete_policy" ON equipment_images
  FOR DELETE
  USING (true);

-- 4. updated_at 자동 업데이트 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. 트리거 생성
DROP TRIGGER IF EXISTS update_equipment_images_updated_at ON equipment_images;
CREATE TRIGGER update_equipment_images_updated_at
  BEFORE UPDATE ON equipment_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 6. 테이블이 제대로 생성되었는지 확인
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'equipment_images'
ORDER BY ordinal_position;



