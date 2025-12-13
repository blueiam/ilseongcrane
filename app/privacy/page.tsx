// app/privacy/page.tsx
export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">
        개인정보처리방침
      </h1>

      <div className="space-y-6 text-sm leading-relaxed text-gray-700">
        <p>
          일성크레인 주식회사(이하 &quot;회사&quot;)는 「개인정보 보호법」 등 관련 법령을
          준수하며, 홈페이지 문의 접수와 고객 지원 업무를 위하여 다음과 같이
          개인정보를 처리하고 있습니다.
        </p>
        <p className="text-gray-600">
          본 개인정보처리방침은 2025년 12월 30일부터 적용됩니다.
        </p>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            제1조(수집하는 개인정보 항목 및 수집 방법)
          </h2>

          <div className="space-y-3">
            <h3 className="font-medium text-gray-800">수집 항목</h3>
            <p>
              회사는 홈페이지 문의 페이지를 통하여 아래와 같은 개인정보를
              수집합니다.
            </p>

            <div className="ml-4 space-y-2">
              <div>
                <p className="font-medium">필수 항목:</p>
                <p className="text-gray-600">
                  회사명, 담당자명, 연락처(휴대폰/전화번호), 이메일, 문의 내용
                </p>
              </div>

              <div>
                <p className="font-medium">선택 항목:</p>
                <p className="text-gray-600">
                  문의 유형(장비 문의, 풍력 문의 등)
                </p>
              </div>

              <div>
                <p className="font-medium">자동 수집 항목:</p>
                <ul className="ml-4 list-disc space-y-1 text-gray-600">
                  <li>
                    접속 IP, 쿠키, 접속 로그, 브라우저 정보 등 서비스 보안
                    유지에 필요한 데이터
                  </li>
                  <li>
                    Google reCAPTCHA 사용으로 인해 Google이 수집할 수 있는
                    정보(IP, 브라우저 정보 등)
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-medium text-gray-800">수집 방법</h3>
              <p className="text-gray-600">
                회사 홈페이지 내 온라인 문의폼 제출을 통해 수집합니다.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            제2조(개인정보의 처리 목적)
          </h2>
          <p>회사는 수집한 개인정보를 다음 목적 내에서 처리합니다.</p>
          <ul className="ml-4 list-disc space-y-2 text-gray-600">
            <li>
              문의 접수 및 답변, 장비 견적 요청·현장 상담 등 고객 문의 대응
            </li>
            <li>
              고객 요청·이력 관리를 통한 서비스 품질 향상
            </li>
            <li>
              자동등록 방지, 보안 강화 등을 위한 Google reCAPTCHA 기반 확인
            </li>
            <li>법령 준수 및 홈페이지 운영 안정성 확보</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            제3조(개인정보의 보유 및 이용 기간)
          </h2>
          <p>
            회사는 개인정보의 수집 및 이용 목적이 달성된 후에는 지체 없이
            파기합니다.
          </p>
          <p>다만, 다음의 경우에는 아래 기간 동안 보존 후 파기합니다.</p>
          <ul className="ml-4 list-disc space-y-2 text-gray-600">
            <li>문의 이력 관리 및 고객 응대를 위한 보관: 최대 3년</li>
            <li>
              관련 법령에 따라 일정 기간 보존이 필요한 경우: 해당 법령에서
              정한 기간
            </li>
            <li className="text-gray-500">
              (예: 소비자분쟁해결 관련 기록 등)
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            제4조(개인정보의 제3자 제공)
          </h2>
          <p>회사는 고객님의 개인정보를 제3자에게 제공하지 않습니다.</p>
          <p>다만, 다음의 경우에는 예외로 합니다.</p>
          <ul className="ml-4 list-disc space-y-2 text-gray-600">
            <li>법령에서 허용하는 경우</li>
            <li>수사기관 또는 법원의 적법한 요청이 있는 경우</li>
            <li>고객이 사전에 별도 동의한 경우</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            제5조(개인정보처리의 위탁)
          </h2>
          <p>회사는 고객님의 개인정보 처리를 외부에 위탁하지 않습니다.</p>
          <p>
            향후 위탁이 필요한 경우, 위탁받는 자(수탁자), 위탁 업무 내용을
            홈페이지에 사전 공지하고 필요한 경우 별도의 동의를 받겠습니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            제6조(정보주체의 권리와 행사 방법)
          </h2>
          <p>
            고객님은 언제든지 회사가 보유하고 있는 자신의 개인정보에 대해
            열람·정정·삭제·처리정지를 요청할 수 있습니다.
          </p>
          <p>
            위 요청은 서면·이메일·전화 등을 통해 가능하며, 회사는 법령에 따른
            절차에 따라 즉시 조치합니다.
          </p>
          <p className="text-gray-600">
            단, 법령에서 보관이 요구되는 정보는 삭제 요청이 제한될 수 있습니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            제7조(개인정보의 파기 절차 및 방법)
          </h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-gray-800">파기 절차</h3>
              <p className="text-gray-600">
                개인정보의 수집·이용 목적 달성 후 즉시 파기하거나, 관련 법령에
                따른 기간 동안 별도 DB에 저장 후 파기합니다.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">파기 방법</h3>
              <ul className="ml-4 list-disc space-y-1 text-gray-600">
                <li>
                  전자파일: 복구가 불가능한 기술적 방법을 이용하여 삭제
                </li>
                <li>종이문서: 분쇄 또는 소각하여 파기</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            제8조(개인정보의 안전성 확보 조치)
          </h2>
          <p>
            회사는 개인정보보호를 위하여 다음과 같은 기술적·관리적 조치를
            시행하고 있습니다.
          </p>
          <ul className="ml-4 list-disc space-y-2 text-gray-600">
            <li>개인정보 접근 권한 최소화</li>
            <li>비밀번호 및 접근통제 정책 적용</li>
            <li>SSL 적용 등 통신 구간 암호화</li>
            <li>보안 프로그램 설치 및 정기 점검</li>
            <li>물리적 보안 조치(사무실 출입 통제 등)</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            제9조(Google reCAPTCHA 관련 안내)
          </h2>
          <p>
            회사는 스팸 및 자동 등록 방지를 위하여 Google reCAPTCHA 서비스를
            사용합니다.
          </p>
          <p>
            reCAPTCHA 작동 과정에서 Google은 다음 정보 등을 수집·이용할 수
            있습니다.
          </p>
          <p className="text-gray-600">
            접속 IP, 브라우저 환경, 쿠키, 사용자 행동 패턴 등
          </p>
          <p>
            Google의 개인정보 처리방침은 아래에서 확인하실 수 있습니다.
          </p>
          <p>
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://policies.google.com/privacy
            </a>
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            제10조(개인정보 보호책임자)
          </h2>
          <p>
            고객님의 개인정보 보호를 위하여 회사는 아래와 같이 개인정보
            보호책임자를 지정하고 있습니다.
          </p>
          <div className="ml-4 space-y-2 text-gray-600">
            <p>
              <span className="font-medium">개인정보 보호책임자:</span> 박철민
            </p>
            <p>
              <span className="font-medium">직책:</span> 대표이사
            </p>
            <p>
              <span className="font-medium">주소:</span> 경기도 평택시
              고덕갈평6길 25, 813호
            </p>
            <p>
              <span className="font-medium">연락처:</span> 031-683-4235
            </p>
            <p>
              <span className="font-medium">이메일:</span> info@ilseongcrane.com
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            제11조(개인정보처리방침 변경)
          </h2>
          <p>이 개인정보처리방침은 2025년 12월 30일 시행됩니다.</p>
          <p>
            관련 법령·내부방침 변경 시, 변경 내용은 홈페이지를 통해 지체 없이
            공지합니다.
          </p>
        </section>
      </div>
    </div>
  )
}










