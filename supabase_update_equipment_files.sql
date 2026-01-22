-- 장비 파일 경로 업데이트 스크립트
-- 장비 ID: bcd5c041-7bc2-440e-a635-39f1384c3bbf (Terex Demag CC-8800-1 1600t)

UPDATE equipments
SET 
  thumbnail_url = '/images/equipments/Thumbnail/400x400-terex1600.jpg',
  main_image_url = '/images/equipments/detail/detail-Terex-Demag-CC-8800-1-1600t.jpg',
  pdf_cover_url = '/images/equipments/pdf-cover/cover-Terex-Demag-CC-8800-1-1600t.png',
  spec_pdf_url = '/images/equipments/pdf/199-Terex-Demag-CC-8800-1-1600t.pdf'
WHERE id = 'bcd5c041-7bc2-440e-a635-39f1384c3bbf';
