-- Supabase SQL Editor에서 실행하세요
-- equipments 테이블의 RLS 정책 설정

-- 1. 현재 RLS 상태 확인
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'equipments';

-- 2. RLS가 활성화되어 있다면, INSERT/UPDATE/DELETE를 허용하는 정책 추가

-- 옵션 A: 모든 사용자가 equipments 테이블에 접근 가능하도록 설정 (개발/테스트용)
-- 주의: 프로덕션 환경에서는 인증된 사용자만 허용하도록 수정하세요

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

-- 3. 또는 RLS를 완전히 비활성화 (개발/테스트용만, 프로덕션에서는 권장하지 않음)
-- ALTER TABLE public.equipments DISABLE ROW LEVEL SECURITY;

-- 4. 기존 정책 확인
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'equipments';













