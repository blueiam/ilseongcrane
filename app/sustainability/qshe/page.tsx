// app/sustainability/qshe/page.tsx

import Link from "next/link";

export default function QSHEPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
      {/* 1. 페이지 헤더 */}
      <header className="mb-10 border-b border-gray-200 pb-6">
        {/* Breadcrumb */}
        <nav className="mb-3 text-sm text-gray-500">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>지속가능경영</li>
            <li>/</li>
            <li className="font-medium text-gray-800">QSHE 경영</li>
          </ol>
        </nav>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
              QSHE 경영
              <span className="block text-base font-normal text-gray-500 md:text-lg">
                Quality · Safety · Health · Environment
              </span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
              일성크레인은 품질·안전·보건·환경을 통합 관리하는 QSHE 경영체계를
              기반으로, 글로벌 종합 리프팅·엔지니어링 기업으로 도약하고
              있습니다. 모든 사업활동에서 사람과 기술, 환경의 조화를 최우선
              가치로 삼습니다.
            </p>
          </div>

          <div className="hidden h-24 w-40 items-center justify-center rounded-xl bg-gradient-to-br from-sky-50 to-emerald-50 text-xs font-medium text-gray-500 shadow-sm md:flex">
            QSHE 통합<br />경영시스템
          </div>
        </div>
      </header>

      {/* 2. QSHE 경영 개요 */}
      <section className="mb-14 grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 md:text-xl">
            QSHE 경영 개요
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">
            QSHE는 품질(Quality), 안전(Safety), 보건(Health), 환경(Environment)을
            아우르는 일성크레인의 통합경영 체계입니다. 단순한 규정 준수를 넘어
            중량물 설치·해체, 풍력 T&amp;I, 플랜트·인프라 현장 등 모든 사업에서
            경쟁력을 완성하는 핵심 기반입니다.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">
            Vision 2030에 따라 일성크레인은 안정적 사업기반 확보를 넘어
            고부가가치 사업다각화와 글로벌 종합 리프팅 기업 도약을 목표로
            하고 있으며, QSHE는 이 여정을 지탱하는 핵심 축입니다.
          </p>

          <div className="mt-5 grid gap-3 text-sm text-gray-700 md:grid-cols-2">
            <div className="rounded-lg bg-gray-50 px-4 py-3">
              <p className="font-semibold text-gray-900">핵심 목표</p>
              <ul className="mt-2 space-y-1 text-xs leading-relaxed text-gray-700 md:text-sm">
                <li>• Zero Accident : 무재해·무사고 현장 실현</li>
                <li>• Zero Defect : 품질 신뢰도 및 고객만족 극대화</li>
                <li>• Carbon Reduction : 환경영향 최소화</li>
                <li>• Compliance : 투명하고 책임 있는 준법경영</li>
              </ul>
            </div>
            <div className="rounded-lg bg-gray-50 px-4 py-3">
              <p className="font-semibold text-gray-900">주요 기반</p>
              <ul className="mt-2 space-y-1 text-xs leading-relaxed text-gray-700 md:text-sm">
                <li>• ISO 9001 / 14001 / 45001 통합 인증 지향</li>
                <li>• 통합 경영·안전관리 시스템 구축</li>
                <li>• 장비 운영관리·정비·검사 내부역량 강화</li>
                <li>• 풍력 T&amp;I 및 O&amp;M 전문화 기반 확보</li>
              </ul>
            </div>
          </div>
        </div>

        {/* QSHE 아이콘 리스트 */}
        <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-sky-600">
            QSHE Pillars
          </p>
          <h3 className="mt-2 text-sm font-semibold text-gray-900 md:text-base">
            일성크레인의 4대 통합 경영 축
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-gray-700">
            <li>
              <span className="font-semibold text-sky-700">Q · 품질</span> — 중량물
              설치·운송·정비 전 과정의 품질 표준화 및 ISO 기반 관리
            </li>
            <li>
              <span className="font-semibold text-amber-700">S · 안전</span> — 무재해
              목표의 자율안전관리와 스마트 모니터링 시스템
            </li>
            <li>
              <span className="font-semibold text-emerald-700">H · 보건</span> — 근로자
              건강보호 및 휴먼에러 예방을 위한 체계적 관리
            </li>
            <li>
              <span className="font-semibold text-lime-700">E · 환경</span> — 친환경
              장비 전환과 풍력 T&amp;I·O&amp;M 지원을 통한 ESG 실천
            </li>
          </ul>
          <p className="mt-4 rounded-lg bg-white px-4 py-2 text-xs leading-relaxed text-gray-600 shadow-sm">
            “안전을 지키고, 품질을 높이며, 환경을 보호하는 것이 곧
            일성크레인의 성장 전략입니다.”
          </p>
        </div>
      </section>

      {/* 3. Q · S · H · E 카드 섹션 */}
      <section className="mb-14">
        <h2 className="text-lg font-semibold text-gray-900 md:text-xl">
          Q · S · H · E 4대 핵심 축
        </h2>
        <p className="mt-2 text-sm text-gray-600 md:text-base">
          각 영역별로 명확한 목표와 실행전략을 수립하고, Vision 2030과 연계하여
          단계적으로 고도화하고 있습니다.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {/* QUALITY */}
          <article className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-sky-700">
              Quality
            </div>
            <h3 className="text-sm font-semibold text-gray-900">품질경영</h3>
            <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-gray-700 md:text-sm">
              <li>• ISO 9001 기반 품질관리체계 운영</li>
              <li>• 중량물 설치·해체·운송의 표준 작업절차(SOP) 구축</li>
              <li>• 검사·정비·엔지니어링 내부역량 강화 및 플랫폼화</li>
            </ul>
          </article>

          {/* SAFETY */}
          <article className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-amber-700">
              Safety
            </div>
            <h3 className="text-sm font-semibold text-gray-900">안전경영</h3>
            <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-gray-700 md:text-sm">
              <li>• 위험예방 중심의 자율안전관리체계 운영</li>
              <li>• IoT·GPS 기반 장비 실시간 모니터링 및 통합 관제</li>
              <li>• 풍력 T&amp;I·해상작업에 특화된 안전 매뉴얼 적용</li>
            </ul>
          </article>

          {/* HEALTH */}
          <article className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Health
            </div>
            <h3 className="text-sm font-semibold text-gray-900">보건경영</h3>
            <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-gray-700 md:text-sm">
              <li>• 근로자 건강보호 및 작업환경 유해요인 관리</li>
              <li>• 고소·중량작업 등 고위험 작업자 대상 보호 프로그램</li>
              <li>• 피로도·휴먼에러 예방 중심의 작업관리</li>
            </ul>
          </article>

          {/* ENVIRONMENT */}
          <article className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-lime-700">
              Environment
            </div>
            <h3 className="text-sm font-semibold text-gray-900">환경경영</h3>
            <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-gray-700 md:text-sm">
              <li>• 친환경 전기·하이브리드 장비 도입 및 확대</li>
              <li>• 연료·자원 절감 운영기준 및 폐기물 관리 강화</li>
              <li>• 육·해상 풍력 T&amp;I 및 O&amp;M 지원을 통한 에너지 전환 기여</li>
            </ul>
          </article>
        </div>
      </section>

      {/* 4. Vision 2030 연계 섹션 */}
      <section className="mb-14 rounded-2xl bg-slate-900 px-5 py-8 text-slate-50 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold md:text-xl">
              Vision 2030과 함께 진화하는 QSHE
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-base">
              일성크레인은 2030년까지 안정적 사업기반을 넘어 고부가가치
              사업다각화와 글로벌 종합 리프팅·물류 엔지니어링 기업 도약을
              목표로 하고 있습니다. QSHE 통합경영체계는 이 목표를 실현하는
              핵심 실행 프레임입니다.
            </p>
          </div>

          <div className="grid flex-1 gap-3 md:grid-cols-3">
            {/* Step 1 */}
            <div className="rounded-xl bg-slate-800/60 p-4 text-xs md:text-sm">
              <p className="text-[10px] font-medium uppercase tracking-wide text-sky-300">
                Step 1 · 2025–2026
              </p>
              <p className="mt-2 font-semibold text-slate-50">
                안정적 사업기반 &amp; 안전관리 시스템 구축
              </p>
              <ul className="mt-2 space-y-1 text-slate-200/80">
                <li>• 핵심 장비·인프라 확보</li>
                <li>• 통합 경영·안전관리 시스템 구축</li>
                <li>• 풍력 T&amp;I 경쟁기반 확보</li>
              </ul>
            </div>
            {/* Step 2 */}
            <div className="rounded-xl bg-slate-800/60 p-4 text-xs md:text-sm">
              <p className="text-[10px] font-medium uppercase tracking-wide text-emerald-300">
                Step 2 · 2027–2028
              </p>
              <p className="mt-2 font-semibold text-slate-50">
                고부가가치 사업다각화 &amp; 스마트 운영
              </p>
              <ul className="mt-2 space-y-1 text-slate-200/80">
                <li>• 중량물 설치·해체 전문기업으로 성장</li>
                <li>• IoT·GPS 기반 장비 모니터링 플랫폼</li>
                <li>• 풍력 O&amp;M 사업 진출 기반 마련</li>
              </ul>
            </div>
            {/* Step 3 */}
            <div className="rounded-xl bg-slate-800/60 p-4 text-xs md:text-sm">
              <p className="text-[10px] font-medium uppercase tracking-wide text-amber-300">
                Step 3 · 2029–2030
              </p>
              <p className="mt-2 font-semibold text-slate-50">
                글로벌 종합 리프팅 &amp; 친환경 하이테크 기업 도약
              </p>
              <ul className="mt-2 space-y-1 text-slate-200/80">
                <li>• 육·해상 풍력 T&amp;I 종합솔루션 제공</li>
                <li>• 친환경 장비·무인·원격제어 기술 고도화</li>
                <li>• 건설기계 통합 플랫폼 및 해외 진출</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. QSHE 운영체계 */}
      <section className="mb-14">
        <h2 className="text-lg font-semibold text-gray-900 md:text-xl">
          QSHE 운영체계
        </h2>
        <p className="mt-2 text-sm text-gray-600 md:text-base">
          정책 수립부터 교육·점검·성과관리까지, 일성크레인은 전사적인
          통합관리 프로세스를 운영합니다.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          {/* 다이어그램 느낌의 왼쪽 */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5 py-6">
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-full border border-gray-200 bg-white px-4 py-1 text-xs font-medium text-gray-600 shadow-sm">
                Integrated QSHE Cycle
              </div>
              <ol className="space-y-3 text-sm font-medium text-gray-800">
                <li>① 정책 수립 (Policies)</li>
                <li>② 시스템 구축 (Systems)</li>
                <li>③ 교육·훈련 (Education)</li>
                <li>④ 점검·감사 (Audit &amp; Inspection)</li>
                <li>⑤ 성과관리·개선 (Performance)</li>
              </ol>
              <p className="mt-2 text-center text-xs text-gray-500">
                다섯 단계를 순환 구조로 운영하며, 현장 피드백을 통해
                지속적으로 개선합니다.
              </p>
            </div>
          </div>

          {/* 오른쪽 상세 설명 */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-gray-100 bg-white p-4 text-sm text-gray-700 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                01 · 정책 수립
              </p>
              <p className="mt-1 font-semibold text-gray-900">
                Policies &amp; Governance
              </p>
              <p className="mt-2 text-xs leading-relaxed md:text-sm">
                Vision 2030 및 회사의 경영방침과 연계해 QSHE 목표와 세부
                실행계획을 수립하고, 전 임직원이 공유합니다.
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-4 text-sm text-gray-700 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                02 · 시스템 구축
              </p>
              <p className="mt-1 font-semibold text-gray-900">
                ISO &amp; Smart System
              </p>
              <p className="mt-2 text-xs leading-relaxed md:text-sm">
                ISO 9001·14001·45001 기반의 통합 시스템과 IoT·GPS 모니터링
                플랫폼을 통해 장비·현장을 실시간 관리합니다.
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-4 text-sm text-gray-700 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                03 · 교육·훈련
              </p>
              <p className="mt-1 font-semibold text-gray-900">
                Competency &amp; Training
              </p>
              <p className="mt-2 text-xs leading-relaxed md:text-sm">
                직무별 안전·기술 교육과 풍력 T&amp;I·해상작업 특수 교육, 협력사
                합동 교육을 통해 현장 역량을 강화합니다.
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-4 text-sm text-gray-700 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                04·05 · 점검 &amp; 성과관리
              </p>
              <p className="mt-1 font-semibold text-gray-900">
                Audit · KPI &amp; Improvement
              </p>
              <p className="mt-2 text-xs leading-relaxed md:text-sm">
                정기 점검·내부심사 및 KPI 기반 성과관리를 통해 사고·품질
                이슈를 선제적으로 예방하고, 개선 활동으로 연결합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 적용사업 / 사례 요약 */}
      <section className="mb-14">
        <h2 className="text-lg font-semibold text-gray-900 md:text-xl">
          적용 분야 및 실행사례
        </h2>
        <p className="mt-2 text-sm text-gray-600 md:text-base">
          QSHE 경영은 토목·플랜트, 조선·제철·시멘트, 에너지·해상물류, 육·해상
          풍력 T&amp;I 등 일성크레인이 수행하는 모든 프로젝트에 적용됩니다.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="flex flex-col rounded-2xl border border-gray-100 bg-white p-4 text-sm text-gray-700 shadow-sm">
            <h3 className="font-semibold text-gray-900">
              플랜트·인프라 중량물 설치/해체
            </h3>
            <p className="mt-2 text-xs leading-relaxed md:text-sm">
              석유화학·제철·시멘트 공장 및 대형 인프라 현장에서 중량물
              설치·이설·해체 작업을 수행하며, 표준화된 리프팅 플랜과 위험성
              평가를 기반으로 운영합니다.
            </p>
          </article>
          <article className="flex flex-col rounded-2xl border border-gray-100 bg-white p-4 text-sm text-gray-700 shadow-sm">
            <h3 className="font-semibold text-gray-900">
              육·해상 풍력 T&amp;I 및 O&amp;M 지원
            </h3>
            <p className="mt-2 text-xs leading-relaxed md:text-sm">
              풍력 핵심장비 확보와 제조사/EPC사와의 협업을 통해 운전·점검·검사·
              정비·운전원 등 통합 서비스를 제공하며, 친환경 에너지 전환을
              뒷받침합니다.
            </p>
          </article>
          <article className="flex flex-col rounded-2xl border border-gray-100 bg-white p-4 text-sm text-gray-700 shadow-sm">
            <h3 className="font-semibold text-gray-900">
              리프팅·물류 엔지니어링 &amp; 플랫폼
            </h3>
            <p className="mt-2 text-xs leading-relaxed md:text-sm">
              중량물 설치·운송을 일괄 수행하는 종합 솔루션 기업으로서, 장비
              운영·검사·교육·컨설팅까지 확장된 서비스를 제공하고 있습니다.
            </p>
          </article>
        </div>
      </section>

      {/* 7. 성과 & 인증 / CTA */}
      <section className="mb-10 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-7 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 md:text-xl">
              QSHE 성과 및 인증 현황
            </h2>
            <p className="mt-2 text-sm text-gray-600 md:text-base">
              일성크레인은 ISO 통합인증 추진과 안전·품질·환경 지표 개선을
              통해, 고객과 사회로부터 신뢰받는 파트너가 되기 위해 노력하고
              있습니다.
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-700 md:text-sm">
              <li>• 중대 재해 Zero 목표 운영</li>
              <li>• ISO 9001 / 14001 / 45001 통합 인증 지향</li>
              <li>• 면허·등록·특허 확보를 통한 전문성 강화</li>
            </ul>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <div className="flex flex-wrap gap-2 text-xs">
              <Link
                href="/sustainability/certificates"
                className="rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-800 shadow-sm hover:border-gray-400"
              >
                등록·면허·인증 자세히 보기
              </Link>
              <Link
                href="/contact"
                className="rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-slate-800"
              >
                프로젝트 상담 문의
              </Link>
            </div>
            <p className="text-[11px] text-gray-500 md:text-xs">
              안전하고 신뢰할 수 있는 리프팅·중량물 솔루션이 필요하신 경우
              언제든 문의해 주세요.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
