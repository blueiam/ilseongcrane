'use client';

import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { supabase } from '@/app/lib/supabaseClient';

// Toast UI Editor CSS (필수)
import '@toast-ui/editor/dist/toastui-editor.css';

// 1. Next.js SSR 이슈 방지를 위한 Dynamic Import
const Editor = dynamic(
  () => import('@toast-ui/react-editor').then((m) => m.Editor),
  {
    ssr: false, // 서버 사이드 렌더링 끔 (중요)
    loading: () => (
      <div className="flex h-[500px] items-center justify-center border">
        에디터 로딩 중...
      </div>
    ),
  }
);

interface ToastEditorProps {
  content: string;
  onChange: (value: string) => void;
}

export default function ToastEditor({ content, onChange }: ToastEditorProps) {
  const editorRef = useRef<any>(null);
  const isInitializedRef = useRef(false);
  const previousContentRef = useRef<string>('');

  // 에디터가 마운트된 후 초기화 및 content 설정
  useEffect(() => {
    // 에디터 인스턴스가 준비될 때까지 대기
    const timer = setTimeout(() => {
      if (editorRef.current && !isInitializedRef.current) {
        const instance = editorRef.current.getInstance();
        if (instance) {
          isInitializedRef.current = true;
          previousContentRef.current = content || ' ';
          // 초기 content가 있으면 설정
          if (content && content.trim()) {
            instance.setHTML(content);
          }
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // content prop이 변경될 때 에디터 내용 업데이트 (초기화 후에만)
  useEffect(() => {
    if (editorRef.current && isInitializedRef.current) {
      const instance = editorRef.current.getInstance();
      if (instance && content !== previousContentRef.current) {
        const newContent = content || ' ';
        instance.setHTML(newContent);
        previousContentRef.current = newContent;
      }
    }
  }, [content]);

  // 2. 이미지 업로드 핸들러 (핵심 로직)
  const onUploadImage = async (blob: Blob, callback: any) => {
    try {
      const file = blob as File;

      // 한글 깨짐 방지용 파일명 생성
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `post/${fileName}`;

      // A. Supabase Storage 업로드 (버킷명 'board-images' 확인!)
      const { error: uploadError } = await supabase.storage
        .from('board-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // B. 이미지 주소(Public URL) 가져오기
      const { data } = supabase.storage
        .from('board-images')
        .getPublicUrl(filePath);

      // C. 에디터에 이미지 삽입
      callback(data.publicUrl, 'image');
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
    }
  };

  // 3. 내용 변경 감지
  const handleChange = () => {
    if (editorRef.current) {
      // HTML 태그 형태로 가져오기
      const instance = editorRef.current.getInstance();
      const html = instance.getHTML();
      onChange(html);
    }
  };

  // 4. 에디터 내부 Enter 키 이벤트 처리 (form submit 방지)
  useEffect(() => {
    // 에디터가 초기화될 때까지 대기
    const timer = setTimeout(() => {
      if (!editorRef.current) return;

      const instance = editorRef.current.getInstance();
      if (!instance) return;

      const editorElement = instance.getRootElement();
      if (!editorElement) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        // Enter 키가 눌렸을 때
        if (e.key === 'Enter' || e.keyCode === 13) {
          // 에디터 내부에서 발생한 이벤트인지 확인
          const target = e.target as HTMLElement;
          if (editorElement.contains(target)) {
            // 에디터 내부의 Enter 키는 정상 동작하도록 허용
            // form submit은 방지
            e.stopPropagation();
          }
        }
      };

      editorElement.addEventListener('keydown', handleKeyDown, true);
    }, 200);

    return () => {
      clearTimeout(timer);
      // cleanup: 에디터가 언마운트될 때 이벤트 리스너 제거
      if (editorRef.current) {
        const instance = editorRef.current.getInstance();
        if (instance) {
          const editorElement = instance.getRootElement();
          if (editorElement) {
            // 이벤트 리스너는 자동으로 제거됨 (컴포넌트 언마운트 시)
          }
        }
      }
    };
  }, []);

  return (
    <div className="prose max-w-none">
      <Editor
        ref={editorRef}
        initialValue={content || ' '}
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image', 'link'],
          ['code', 'codeblock'],
        ]}
        hooks={{
          addImageBlobHook: onUploadImage, // 업로드 함수 연결
        }}
        onChange={handleChange}
      />
    </div>
  );
}

