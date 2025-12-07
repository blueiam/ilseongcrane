// lib/api/equipment.ts
import { createClient } from '@supabase/supabase-js'
import type { Equipment } from '@/types/equipment'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

/**
 * 장비 목록 가져오기 (display_order 순서로 정렬)
 */
export async function getEquipmentList() {
  const { data, error } = await supabase
    .from('equipments')
    .select('*')
    .order('display_order', { ascending: true })
    .order('name', { ascending: true })

  if (error) {
    throw error
  }

  return (data || []) as Equipment[]
}

/**
 * 특정 장비 가져오기
 */
export async function getEquipmentById(id: string) {
  const { data, error } = await supabase
    .from('equipments')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw error
  }

  return data as Equipment
}

/**
 * 장비 생성
 */
export async function createEquipment(equipment: Omit<Equipment, 'id'>) {
  const { data, error } = await supabase
    .from('equipments')
    .insert([equipment])
    .select()
    .single()

  if (error) {
    throw error
  }

  return data as Equipment
}

/**
 * 장비 수정
 */
export async function updateEquipment(id: string, equipment: Partial<Equipment>) {
  const { data, error } = await supabase
    .from('equipments')
    .update(equipment)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data as Equipment
}

/**
 * 장비 삭제
 */
export async function deleteEquipment(id: string) {
  const { error } = await supabase
    .from('equipments')
    .delete()
    .eq('id', id)

  if (error) {
    throw error
  }

  return true
}



