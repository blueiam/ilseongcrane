-- Supabase SQL Editor에서 실행하세요
-- equipments 테이블의 컬럼명을 확인하고 필요시 변경

-- 1. 현재 컬럼명 확인
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'equipments';

-- 2. 만약 컬럼명이 'model_name'이라면 'name'으로 변경
-- ALTER TABLE equipments RENAME COLUMN model_name TO name;

-- 3. 또는 'equipment_name'이라면
-- ALTER TABLE equipments RENAME COLUMN equipment_name TO name;

-- 4. display_order 컬럼 추가 (없는 경우)
ALTER TABLE equipments 
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;


