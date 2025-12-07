'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/src/supabase';
import { 
  TruckIcon, 
  BuildingOfficeIcon, 
  MegaphoneIcon, 
  PlusCircleIcon,
  ArrowRightIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    equipment: 0,
    projects: 0,
    posts: 0,
    contacts: {
      new: 0,
      in_progress: 0,
      done: 0,
      total: 0
    }
  });
  const [loading, setLoading] = useState(true);

  // 데이터 개수 가져오기
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // 1. 보유장비 개수
        const { count: equipmentCount } = await supabase
          .from('equipments')
          .select('*', { count: 'exact', head: true });

        // 2. 사업실적 개수
        const { count: projectCount } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true });

        // 3. 게시글 개수
        const { count: postCount } = await supabase
          .from('posts')
          .select('*', { count: 'exact', head: true });

        // 4. 견적문의 개수 (상태별)
        const { data: contactsData } = await supabase
          .from('contacts')
          .select('status');

        const contactsStats = {
          new: 0,
          in_progress: 0,
          done: 0,
          total: contactsData?.length || 0
        };

        if (contactsData) {
          contactsData.forEach((contact) => {
            if (contact.status === 'new') contactsStats.new++;
            else if (contact.status === 'in_progress') contactsStats.in_progress++;
            else if (contact.status === 'done') contactsStats.done++;
          });
        }

        setCounts({
          equipment: equipmentCount || 0,
          projects: projectCount || 0,
          posts: postCount || 0,
          contacts: contactsStats
        });
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <main className="min-h-screen bg-[#1a1a1a] p-8 pt-8">
      <div className="max-w-7xl mx-auto">
        
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">관리자 대시보드</h1>
          <p className="text-gray-400 mt-2">사이트 현황을 한눈에 확인하고 관리하세요.</p>
        </div>

        {/* 1. 요약 통계 (Stats Cards) */}
        <h2 className="text-xl font-bold text-white mb-4">사이트 현황</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* 장비 현황 카드 */}
          <div className="bg-[#222] p-6 rounded-2xl shadow-sm border border-gray-700 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">보유장비 총계</p>
              <p className="text-4xl font-bold text-blue-400">
                {loading ? '-' : counts.equipment}
                <span className="text-lg text-gray-500 font-normal ml-1">대</span>
              </p>
            </div>
            <div className="w-14 h-14 bg-blue-900/30 rounded-full flex items-center justify-center text-blue-400">
              <TruckIcon className="w-8 h-8" />
            </div>
          </div>

          {/* 실적 현황 카드 */}
          <div className="bg-[#222] p-6 rounded-2xl shadow-sm border border-gray-700 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">등록된 사업실적</p>
              <p className="text-4xl font-bold text-orange-400">
                {loading ? '-' : counts.projects}
                <span className="text-lg text-gray-500 font-normal ml-1">건</span>
              </p>
            </div>
            <div className="w-14 h-14 bg-orange-900/30 rounded-full flex items-center justify-center text-orange-400">
              <BuildingOfficeIcon className="w-8 h-8" />
            </div>
          </div>

          {/* 게시글 현황 카드 */}
          <div className="bg-[#222] p-6 rounded-2xl shadow-sm border border-gray-700 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">게시판 글 수</p>
              <p className="text-4xl font-bold text-green-400">
                {loading ? '-' : counts.posts}
                <span className="text-lg text-gray-500 font-normal ml-1">개</span>
              </p>
            </div>
            <div className="w-14 h-14 bg-green-900/30 rounded-full flex items-center justify-center text-green-400">
              <MegaphoneIcon className="w-8 h-8" />
            </div>
          </div>

          {/* 견적문의 현황 카드 */}
          <div className="bg-[#222] p-6 rounded-2xl shadow-sm border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">견적문의 총계</p>
                <p className="text-4xl font-bold text-purple-400">
                  {loading ? '-' : counts.contacts.total}
                  <span className="text-lg text-gray-500 font-normal ml-1">건</span>
                </p>
              </div>
              <div className="w-14 h-14 bg-purple-900/30 rounded-full flex items-center justify-center text-purple-400">
                <EnvelopeIcon className="w-8 h-8" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-700">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">신규</p>
                <p className="text-lg font-bold text-yellow-400">{loading ? '-' : counts.contacts.new}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">처리중</p>
                <p className="text-lg font-bold text-blue-400">{loading ? '-' : counts.contacts.in_progress}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">완료</p>
                <p className="text-lg font-bold text-green-400">{loading ? '-' : counts.contacts.done}</p>
              </div>
            </div>
          </div>
        </div>


        {/* 2. 바로가기 (Quick Links) */}
        <h2 className="text-xl font-bold text-white mb-4">바로가기</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 장비 관리 바로가기 */}
          <div className="group bg-[#222] p-6 rounded-2xl shadow-sm border border-gray-700 hover:border-blue-500 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-900/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <TruckIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">보유장비 관리</h3>
                <p className="text-sm text-gray-400">장비 목록 조회 및 수정</p>
              </div>
            </div>
            <Link 
              href="/admin/equipments" 
              className="block w-full py-3 text-center text-sm font-bold text-white bg-blue-600 rounded hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
            >
              <PlusCircleIcon className="w-4 h-4" /> 
              관리하기
            </Link>
          </div>

          {/* 실적 관리 바로가기 */}
          <div className="group bg-[#222] p-6 rounded-2xl shadow-sm border border-gray-700 hover:border-orange-500 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-orange-900/30 flex items-center justify-center text-orange-400 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <BuildingOfficeIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">사업실적 관리</h3>
                <p className="text-sm text-gray-400">포트폴리오 관리</p>
              </div>
            </div>
            <Link 
              href="/admin/projects" 
              className="block w-full py-3 text-center text-sm font-bold text-white bg-orange-600 rounded hover:bg-orange-700 flex items-center justify-center gap-2 transition-colors"
            >
              <PlusCircleIcon className="w-4 h-4" /> 
              관리하기
            </Link>
          </div>

          {/* 게시판 관리 바로가기 */}
          <div className="group bg-[#222] p-6 rounded-2xl shadow-sm border border-gray-700 hover:border-green-500 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-900/30 flex items-center justify-center text-green-400 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <MegaphoneIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">게시판 관리</h3>
                <p className="text-sm text-gray-400">공지사항 및 뉴스</p>
              </div>
            </div>
            <Link 
              href="/admin/posts" 
              className="block w-full py-3 text-center text-sm font-bold text-white bg-green-600 rounded hover:bg-green-700 flex items-center justify-center gap-2 transition-colors"
            >
              <PlusCircleIcon className="w-4 h-4" /> 
              관리하기
            </Link>
          </div>

          {/* 견적문의 관리 바로가기 */}
          <div className="group bg-[#222] p-6 rounded-2xl shadow-sm border border-gray-700 hover:border-purple-500 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-900/30 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <EnvelopeIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">견적문의 관리</h3>
                <p className="text-sm text-gray-400">문의 내역 확인 및 관리</p>
              </div>
            </div>
            <Link 
              href="/admin/contacts" 
              className="block w-full py-3 text-center text-sm font-bold text-white bg-purple-600 rounded hover:bg-purple-700 flex items-center justify-center gap-2 transition-colors"
            >
              <PlusCircleIcon className="w-4 h-4" /> 
              관리하기
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}