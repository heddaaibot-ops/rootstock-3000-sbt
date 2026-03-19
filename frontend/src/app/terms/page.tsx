'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-rsk-dark">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto bg-rsk-gray border border-rsk-orange/20 rounded-2xl p-8 md:p-12">
            <h1 className="text-4xl font-bold text-rsk-orange mb-4">
              Rootstock「Rootstock 爱你 3000」活动
            </h1>
            <p className="text-gray-400 mb-8">最后更新：2026年3月16日</p>

            <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
              <p>
                本条款和条件（以下简称"T&Cs"）规定了由 RootstockLabs Limited（地址：5-9 Main Street, Gibraltar, GX 11 1AA，以下简称"RootstockLabs"、"我们"或"公司"）主办的「Rootstock 爱你 3000」（以下简称"活动"）的主要规则。请仔细阅读本 T&Cs。每位参与者（定义见下文）均同意并受本 T&Cs 约束。如果您不同意本 T&Cs，则不得参与本活动。
              </p>

              <h2 className="text-2xl font-bold text-rsk-light mt-8 mb-4">1. 活动</h2>

              <h3 className="text-xl font-semibold text-rsk-light mt-6 mb-3">1.1</h3>
              <p>活动面向在活动期间（以下简称"参与者"）满足以下条件的个人开放：</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>A. 关注 CN Twitter</li>
                <li>B. 并转发推文</li>
                <li>C. 铸造「爱你 3000」NFT</li>
                <li>D. 评论区晒出 NFT 编号</li>
              </ul>

              <h3 className="text-xl font-semibold text-rsk-light mt-6 mb-3">1.2</h3>
              <p>
                参与活动者必须年满 18 周岁。RootstockLabs 集团公司所属公司的员工或其他合作者不得参与本活动。
              </p>

              <h3 className="text-xl font-semibold text-rsk-light mt-6 mb-3">1.3</h3>
              <p>
                参与者必须在整个活动期间完成并保持完成各项任务，才有资格获得下文第 3.1 节所述的奖励。
              </p>

              <h3 className="text-xl font-semibold text-rsk-light mt-6 mb-3">1.4</h3>
              <p>参与者应使用 EVM 兼容钱包进行交易。</p>

              <h3 className="text-xl font-semibold text-rsk-light mt-6 mb-3">1.5</h3>
              <p>
                公司将跟踪每位参与者的交易数量，以确定抽奖资格并计算节省的 RBTC 燃气费总额，该总额将添加到社区奖池（定义见下文）中。
              </p>

              <h3 className="text-xl font-semibold text-rsk-light mt-6 mb-3">1.6</h3>
              <p>
                本活动不面向美国居民或美国公民（统称为"美国人"）开放。在法律禁止或限制的地区参与本活动无效。如果您是美国人，则不允许参与本活动。通过参与本活动，您声明您不是美国人，并且您遵守所在司法管辖区所有适用的法律法规。
              </p>

              <h2 className="text-2xl font-bold text-rsk-light mt-8 mb-4">2. 活动期限</h2>
              <p>
                活动将于 2026 年 3 月 22 日开始，持续至 2026 年 3 月 31 日 UTC 时间 23:59（以下简称"期限"），在指定活动网站上进行。
              </p>

              <h2 className="text-2xl font-bold text-rsk-light mt-8 mb-4">3. 奖励与奖品</h2>

              <h3 className="text-xl font-semibold text-rsk-light mt-6 mb-3">3.1</h3>
              <p>
                总奖品将由一个部分组成：(i) 锁定奖品，为固定金额 5,000 美元的 USDT0（以下简称"总奖品"）。
              </p>

              <h3 className="text-xl font-semibold text-rsk-light mt-6 mb-3">3.2</h3>
              <p>
                总奖品将通过抽奖方式分配给完成第 1.1 条所述任务并符合上文第 1.4 条要求的参与者。
              </p>

              <h3 className="text-xl font-semibold text-rsk-light mt-6 mb-3">3.3</h3>
              <p>
                抽奖将选出 10 名获奖者，获奖名单将在活动结束后 2 周内公布。
              </p>

              <h3 className="text-xl font-semibold text-rsk-light mt-6 mb-3">3.4</h3>
              <p>
                向 5 名获奖参与者支付的总奖品将以 USDT0 的形式在公布后 15 天内支付至已妥善通知的 Rootstock 钱包。
              </p>

              <h3 className="text-xl font-semibold text-rsk-light mt-6 mb-3">3.5</h3>
              <p>
                所有奖品支付将按照以下规定程序兑换为 USDT0：汇率将根据支付日前一天网站上列出的"收盘"汇率确定。如果支付日前一天不是工作日，则 RootstockLabs 将使用紧邻的前一个工作日公布的汇率。工作日指直布罗陀时间周六、周日或公共假日以外的任何日子。
              </p>

              <h2 className="text-2xl font-bold text-rsk-light mt-8 mb-4">4. 责任</h2>
              <p>
                参与者无条件接受，对于参与者或任何第三方因参与本活动和/或使用、处置或目的奖励而可能遭受的任何直接或间接损害，RootstockLabs 以及与本活动和 RootstockLabs 合作的任何第三方均不承担任何责任，并且 RootstockLabs 对参与者和任何第三方不承担任何合同和/或合同外责任。
              </p>

              <h2 className="text-2xl font-bold text-rsk-light mt-8 mb-4">5. 欺诈</h2>

              <h3 className="text-xl font-semibold text-rsk-light mt-6 mb-3">5.1</h3>
              <p>
                任何试图以任何方式欺诈或篡改本活动 T&Cs 的参与者将立即被取消参与资格，并且没有资格参与公司今后进行的任何推广活动。公司保留自行决定取消不符合本 T&Cs 规定要求的参与者的资格的权利。
              </p>

              <h3 className="text-xl font-semibold text-rsk-light mt-6 mb-3">5.2</h3>
              <p>所有任务将被审查以确保其符合活动目标。</p>

              <h3 className="text-xl font-semibold text-rsk-light mt-6 mb-3">5.3</h3>
              <p>
                不符合活动指南的活动，包括但不限于喊单或无关内容，将被取消资格并排除在奖励之外。
              </p>

              <h2 className="text-2xl font-bold text-rsk-light mt-8 mb-4">6. 活动变更</h2>
              <p>
                如果变更不影响活动的实质，我们可以在不事先通知参与者的情况下更改活动的条款和条件。最新版本的 T&Cs 将在 https://app.galxe.com/quest/Rootstock/GCaqPtYyuZ 提供。如果活动或奖励限于特定时间段或特定数量的奖励，则延长这些限制应完全由 RootstockLabs 自行决定。
              </p>

              <h2 className="text-2xl font-bold text-rsk-light mt-8 mb-4">7. 其他</h2>
              <p>
                参与本活动不包括 T&Cs 中未列出的任何其他福利或服务。参与即表示参与者知悉并接受根据适用法律规定以及 RootstockLabs 服务条款（可在 https://rif.technology/terms-conditions/ 获取，如适用）制定的本 T&Cs 的规定。
              </p>
              <p>
                本活动应受直布罗陀法律管辖。任何争议应由直布罗陀有管辖权的法院最终裁决，参与者特此放弃其可能有权申请的任何其他司法管辖权。
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-rsk-orange/20">
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
