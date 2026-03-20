'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-rsk-cream">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto bg-rsk-offwhite border-3 border-rsk-border-dark p-8 md:p-12">
            <div className="mb-4">
              <h1 className="inline-block bg-rsk-purple text-rsk-cream text-4xl font-bold px-8 py-4 uppercase">
                隐私政策
              </h1>
            </div>
            <p className="text-rsk-text-dark/60 mb-8">最后更新：2026年3月16日</p>

            <div className="prose max-w-none space-y-6 text-rsk-text-dark">
              <p>
                这是与用户参与由 RootstockLabs Limited（"我们的"、"我们" 或 "公司"）赞助的"Rootstock 抽奖活动"（"活动"）相关的隐私政策（"隐私政策"）。我们是为本活动收集您的个人数据的控制者，我们致力于保护和尊重您的隐私。
              </p>

              <p>
                通过参与本活动，您接受本隐私政策、我们的通用条款、活动条款和条件（"条款"）的条款，并同意我们按照本隐私政策所述收集、使用、披露和保留您的信息。如果您尚未阅读，也请查看我们的条款。如果您不同意本隐私政策或我们条款的任何部分，请不要使用任何服务。
              </p>

              <p>
                我们以一种简单易懂的方式编写和组织了本隐私政策，正是为了让您了解我们如何使用您的个人数据。下面我们分享了此处使用的一些最重要的术语，您应该了解：
              </p>

              <ul>
                <li><strong>个人数据：</strong>与已识别或可识别的自然人相关的任何信息（例如，姓名和姓氏、地址、电子邮件、身份、位置数据、IP地址、Cookie数据、电话等）。</li>
                <li><strong>同意：</strong>您接受为特定目的处理您的个人数据的自由、知情和明确的声明。</li>
                <li><strong>处理：</strong>对个人数据进行的任何操作。例如，收集、生成、接收、分类、使用、访问、复制、传输、分发、处理、归档、存储、删除、评估、修改、交流、转移、传播或提取。</li>
              </ul>

              <h2 className="text-2xl font-bold text-rsk-orange mt-8 mb-4">我们收集的信息</h2>
              <p>我们在本活动中收集以下数据：</p>
              <ul>
                <li><strong>收集的数据：</strong>电子邮件地址、钱包地址、推特账号和Discord账号。我们可能还会收集浏览过程中产生的用户元数据（浏览器、操作系统、IP等）。</li>
                <li><strong>目的：</strong>活动的开展。</li>
                <li><strong>合法依据：</strong>相关方为我们参与本活动提供的同意。</li>
                <li><strong>保存期限：</strong>数据将在活动结束后保存一年，或直到相关方要求取消或删除其数据，删除后最多保存6年，以供公共行政部门、法官和法院处置，以处理和防范因数据处理可能产生的责任。</li>
              </ul>

              <h2 className="text-2xl font-bold text-rsk-orange mt-8 mb-4">更新您的信息</h2>
              <p>
                如果您想更新您之前提供给我们的信息，可以通过 <a href="mailto:legal@rootstocklabs.com" className="text-rsk-orange hover:underline">legal@rootstocklabs.com</a> 联系我们。
              </p>

              <h2 className="text-2xl font-bold text-rsk-orange mt-8 mb-4">与用户沟通</h2>
              <p>
                如果我们使用您的个人信息，我们可能会用它来沟通有关本活动、即将举行的活动以及我们和我们的选定合作伙伴提供的其他产品和服务的最新消息。
              </p>

              <h2 className="text-2xl font-bold text-rsk-orange mt-8 mb-4">用于合规、欺诈预防和安全</h2>
              <p>
                我们可能使用您的个人信息来保护、调查和阻止欺诈、未经授权或非法的活动。
              </p>

              <h2 className="text-2xl font-bold text-rsk-orange mt-8 mb-4">共享您的信息</h2>
              <p>根据您向我们提供个人数据的方式和原因，我们可能会通过以下方式共享：</p>
              <ul>
                <li>我们可能与集团内的任何成员共享您的个人信息，只要存在有效且合法的理由这样做，即我们的子公司、我们的最终控股公司及其子公司；</li>
                <li>与选定的第三方共享，包括业务合作伙伴、供应商和分包商，以履行我们与他们或您签订的任何合同（见下文"选定方"）；或</li>
                <li>与分析服务商共享，以协助我们改进和优化本活动。</li>
              </ul>

              <p>在以下情况下，我们也可能向第三方披露您的个人信息：</p>
              <ul>
                <li>如果我们打算出售或购买任何业务或资产，在这种情况下，我们可能向该等业务或资产的预期卖方或买方披露您的个人信息；</li>
                <li>如果我们或几乎全部资产被第三方收购，在这种情况下，我们持有的关于客户的个人信息将成为转让资产的一部分；或</li>
                <li>如果我们有义务披露或共享您的个人信息以遵守任何法律义务，或为了执行或适用条款；或为保护我们公司、我们的客户或其他人的权利、财产或安全。这包括与其他公司和组织交换信息，以进行欺诈保护和降低信用风险。</li>
              </ul>

              <h2 className="text-2xl font-bold text-rsk-orange mt-8 mb-4">选定方</h2>
              <p>
                选定方为我们提供各种行政、财务、统计和技术服务。如果我们收集访问此类服务所需的任何个人数据，我们将仅向选定方提供他们履行我们所请求服务所需的最少量个人数据，并且我们规定他们保护此信息且不将其用于任何其他目的。我们认真对待这些关系，并责成我们所有的数据处理者与我们签订合同，明确列出他们尊重个人权利的承诺，以及他们协助我们帮助您行使数据主体权利的承诺。
              </p>

              <h2 className="text-2xl font-bold text-rsk-orange mt-8 mb-4">我们保留您的信息的时间长度</h2>
              <p>
                如果我们收集任何个人数据，我们将其保留到实现收集目的、遵守监管或法律要求所需的时间，或在涉及法律或合同责任的诉讼时效期间。
              </p>
              <p>
                为确定每类个人数据的适当保留期，我们会考虑数据的数量、性质和敏感性，以及潜在风险（来自未经授权的使用和/或非法披露）、处理目的，以及是否可以根据现行法律通过其他方式实现所述目的。
              </p>

              <h2 className="text-2xl font-bold text-rsk-orange mt-8 mb-4">安全</h2>
              <p>
                我们非常重视对您信息的保护。如果我们收集被视为个人的任何数据，我们将实施适当的物理、电子和管理安全措施，以防止您的个人数据意外丢失、被未经授权使用或访问、更改或披露，包括使用安全服务器、密码以及适用于传输中和静态数据的行业标准加密。
              </p>
              <p>
                如果您获得了访问我们平台某些部分的密码，您有责任对该密码保密。我们要求您不要与任何人共享密码。
              </p>
              <p>
                此外，如果收集了个人数据，我们将把对您个人数据的访问权限限制在那些有业务需要知情的员工、代理人、承包商和其他第三方。他们将仅根据我们的指示处理您的个人数据，并负有保密义务。
              </p>
              <p>
                我们已经制定了处理任何可疑个人数据泄露的程序，并在法律要求的情况下，会将泄露情况通知您和任何适用的监管机构。
              </p>

              <h2 className="text-2xl font-bold text-rsk-orange mt-8 mb-4">国际数据传输</h2>
              <p>
                请注意，一些选定方可能设在直布罗陀或欧洲经济区（"EEA"）之外。这些选定方可能为我们或我们的供应商之一工作，并可能参与处理您的信息、产品和服务请求，处理您的付款详细信息以及提供支持服务等。
              </p>
              <p>
                如果适用，当我们将您的数据传输到直布罗陀或 EEA 之外的选定方时，我们会寻求确保采取适当的保障措施，以确保您的个人数据得到安全保存，并维护您作为数据主体的权利。个人数据的转移是通过以下方式进行的：
              </p>
              <ul>
                <li>转移到被直布罗陀或欧盟委员会认可为提供充分保护水平的国家；或</li>
                <li>转移到不提供充分保护但已通过适用法律的标准合同条款或实施其他适当的跨境转移解决方案来提供充分保护的国家。</li>
              </ul>
              <p>
                通过提交您的个人信息，您同意此转移、存储或处理。如果您想了解更多关于您的个人数据传输机制的信息，请联系 <a href="mailto:legal@rootstocklabs.com" className="text-rsk-orange hover:underline">legal@rootstocklabs.com</a>。
              </p>

              <h2 className="text-2xl font-bold text-rsk-orange mt-8 mb-4">您的权利</h2>
              <p>
                作为数据主体，您拥有多项与您的个人数据相关的权利。下面，您可以找到您拥有的各种权利的非穷尽性列表以及如何行使它们。
              </p>
              <ul>
                <li><strong>访问权：</strong>您有权要求访问您的个人数据，并了解与您数据处理条件相关的任何信息。</li>
                <li><strong>更正权：</strong>当您的个人数据不准确、不完整或未更新时，您有权要求更正。</li>
                <li><strong>删除权：</strong>您有权要求删除您的个人数据，以便我们不再处理，但您的要求可能不总是能够实现，因为我们可能因技术原因无法删除或有义务保留某些个人数据以满足法律要求。</li>
                <li><strong>反对处理：</strong>在我们依据合法利益处理该个人数据的情况下，您可以反对处理您的个人数据。我们将遵从您的请求，除非我们有压倒一切的合法利益进行该处理，或者我们需要继续处理您的个人数据以确立、行使或抗辩法律主张。</li>
              </ul>
              <p>
                要行使上述任何权利和/或适用法律规定的任何其他权利，您可以联系我们：<a href="mailto:legal@rootstocklabs.com" className="text-rsk-orange hover:underline">legal@rootstocklabs.com</a>。我们将立即处理您的请求，并在适用法律规定的期限内告知您结果。
              </p>

              <h2 className="text-2xl font-bold text-rsk-orange mt-8 mb-4">撤回同意</h2>
              <p>
                您可以随时撤回您先前给予我们的同意。然而，这不会影响您撤回同意前已进行的任何处理的合法性。如果您撤回同意，我们可能无法向您提供某些产品或服务。我们会在您撤回同意时告知您是否属于这种情况。
              </p>

              <h2 className="text-2xl font-bold text-rsk-orange mt-8 mb-4">联系详情</h2>
              <p>
                如果您对本隐私政策有任何疑问，如果您希望行使上述任何权利，或者如果您认为未遵守本隐私政策，请参阅以下我们的联系详情：
              </p>
              <p>
                <strong>公司名称：</strong>RootstockLabs Limited<br />
                <strong>邮寄地址：</strong>5-9 Main Street, Gibraltar, GX 11 1AA<br />
                <strong>电子邮件：</strong><a href="mailto:legal@rootstocklabs.com" className="text-rsk-orange hover:underline">legal@rootstocklabs.com</a>
              </p>
            </div>

            <div className="mt-12 pt-8 border-t-3 border-rsk-orange">
              <a
                href="/"
                className="inline-flex items-center gap-2 text-rsk-orange hover:text-rsk-orange/80 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>返回首页</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
