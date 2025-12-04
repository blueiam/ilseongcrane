// types/equipment.ts

export type Equipment = {
  id: string
  name?: string  // name 또는 model_name (호환성)
  model_name?: string  // 실제 DB 컬럼명
  manufacturer: string | null
  tonnage: string | null
  category: string
  thumbnail_url: string | null
  spec_pdf_url: string | null
  description: string | null
  display_order?: number
  // 추가 스펙 필드
  max_boom_length?: string | null
  max_lifting_capacity?: string | null
  max_lifting_moment?: string | null
  dimensions_image_url?: string | null
  technical_data_image_url?: string | null
  created_at?: string
  updated_at?: string
}

