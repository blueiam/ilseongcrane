#!/usr/bin/env node

/**
 * Supabase 설정 확인 스크립트
 * 
 * 사용법:
 *   node scripts/check-supabase-setup.js
 * 
 * 또는 package.json에 스크립트 추가:
 *   "check:supabase": "node scripts/check-supabase-setup.js"
 */

const { createClient } = require('@supabase/supabase-js');

// 환경 변수 확인
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Supabase 설정 확인 중...\n');

// 1. 환경 변수 확인
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ 환경 변수가 설정되지 않았습니다.');
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌');
  console.error('   NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✅' : '❌');
  console.error('\n💡 .env.local 파일을 생성하고 환경 변수를 설정하세요.');
  console.error('   .env.example 파일을 참고하세요.');
  process.exit(1);
}

console.log('✅ 환경 변수 설정 확인됨');
console.log(`   URL: ${supabaseUrl.substring(0, 30)}...`);

// 2. Supabase 클라이언트 생성 및 연결 테스트
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSupabaseSetup() {
  try {
    // equipments 테이블 확인
    console.log('\n📊 데이터베이스 테이블 확인 중...');
    
    const { data: equipments, error: equipmentsError } = await supabase
      .from('equipments')
      .select('id')
      .limit(1);

    if (equipmentsError) {
      console.error('❌ equipments 테이블 접근 실패:', equipmentsError.message);
      return false;
    }
    console.log('✅ equipments 테이블 접근 가능');

    // equipment_images 테이블 확인
    const { data: images, error: imagesError } = await supabase
      .from('equipment_images')
      .select('id')
      .limit(1);

    if (imagesError) {
      console.warn('⚠️  equipment_images 테이블 접근 실패:', imagesError.message);
      console.warn('   마이그레이션 스크립트를 실행했는지 확인하세요.');
    } else {
      console.log('✅ equipment_images 테이블 접근 가능');
    }

    // Storage Bucket 확인
    console.log('\n📦 Storage Bucket 확인 중...');
    
    const buckets = ['equipment-images', 'equipment-assets', 'post-files'];
    for (const bucket of buckets) {
      try {
        const { data, error } = await supabase.storage.from(bucket).list('', { limit: 1 });
        if (error) {
          console.warn(`⚠️  ${bucket} bucket 접근 실패:`, error.message);
        } else {
          console.log(`✅ ${bucket} bucket 접근 가능`);
        }
      } catch (err) {
        console.warn(`⚠️  ${bucket} bucket 확인 중 오류:`, err.message);
      }
    }

    console.log('\n✅ Supabase 설정 확인 완료!');
    console.log('\n📝 다음 단계:');
    console.log('   1. 모든 테이블이 정상적으로 접근 가능한지 확인');
    console.log('   2. Storage Bucket이 생성되고 Public Access가 활성화되었는지 확인');
    console.log('   3. 마이그레이션 스크립트(supabase_migration.sql)를 실행했는지 확인');
    
    return true;
  } catch (error) {
    console.error('❌ 확인 중 오류 발생:', error.message);
    return false;
  }
}

// 스크립트 실행
checkSupabaseSetup()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('❌ 예상치 못한 오류:', error);
    process.exit(1);
  });


























