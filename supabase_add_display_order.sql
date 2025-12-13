-- equipments 테이블에 display_order 컬럼 추가
-- Supabase SQL Editor에서 실행하세요

-- 1. display_order 컬럼 추가 (INTEGER 타입, 기본값 0)
ALTER TABLE equipments 
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- 2. 기존 데이터에 display_order 값 설정 (기존 데이터는 0으로 설정)
UPDATE equipments 
SET display_order = 0 
WHERE display_order IS NULL;

-- 3. 인덱스 추가 (정렬 성능 향상)
CREATE INDEX IF NOT EXISTS idx_equipments_display_order ON equipments(display_order);

-- 4. 컬럼이 제대로 추가되었는지 확인
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'equipments' AND column_name = 'display_order';






