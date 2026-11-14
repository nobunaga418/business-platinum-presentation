export const official = 'https://www.americanexpress.com/ja-jp/credit-cards/business-platinum-card/';
export const services = [
 {id:'concierge',category:'ビジネス',icon:'✦',name:'コンシェルジェ',description:'手配や相談のサポートを、経営者の時間という視点で検討。',check:'対応範囲、受付方法、別途費用を公式案内で確認。'},
 {id:'hotel',category:'トラベル',icon:'◇',name:'ホテル関連サービス',description:'出張や大切な滞在を、より快適にする選択肢。',check:'対象施設、予約経路、滞在条件、提供特典を確認。'},
 {id:'lounge',category:'トラベル',icon:'↗',name:'空港ラウンジ関連サービス',description:'移動の合間も、落ち着いて過ごす時間に。',check:'対象空港、利用資格、登録要否、同伴者料金を確認。'},
 {id:'expenses',category:'ビジネス',icon:'▤',name:'経費管理・追加カード',description:'事業支出の集約と管理方法を見直すきっかけに。',check:'追加カードの種類、発行条件、費用、明細機能を確認。'},
 {id:'travel',category:'補償',icon:'⌁',name:'旅行傷害保険',description:'出張時のリスクに備えるため、補償条件を確認。',check:'適用条件、対象者、旅行代金の決済要件、補償額、免責を確認。'},
 {id:'protection',category:'補償',icon:'⊞',name:'購入品・キャンセル関連の補償',description:'事業での購入や予定変更に備える確認項目。',check:'制度の有無、事業用途の対象可否、対象取引、期間、免責、除外事項を確認。'}
];
export const industries = {
 'コンサル・士業':{lead:'信頼をつくる時間を、もっと。',issue:'顧客との面談や出張が多く、手配・経費処理に時間がかかる。',proposal:'出張の快適性と経費管理を軸に、経営者が本業へ集中するための提案。',ids:['concierge','hotel','expenses']},
 'IT・クリエイティブ':{lead:'アイデアに向き合う余白を。',issue:'プロジェクトごとの支出と、国内外への移動を整理したい。',proposal:'支出管理と移動時間の活用を入口に、業務に合う利用場面を検討。',ids:['expenses','lounge','travel']},
 '小売・飲食':{lead:'お店の成長に、次の選択肢を。',issue:'仕入れや視察など、日々の事業支出を把握したい。',proposal:'支出の見える化と視察出張を中心に、実際の決済可否・条件を確認。',ids:['expenses','hotel','protection']},
 '建設・不動産':{lead:'現場と経営を、しなやかにつなぐ。',issue:'現場への移動や担当者ごとの支出管理に負担がある。',proposal:'追加カードと経費管理の適合性を確認し、出張関連サービスを検討。',ids:['expenses','concierge','travel']},
 'その他':{lead:'あなたの事業に合う、一枚の使い方。',issue:'事業でカードを使う場面を整理し、必要な価値を見極めたい。',proposal:'出張頻度、支出管理、時間の使い方から優先順位を整理。',ids:['concierge','expenses','lounge']}
};
export function calculate({trips,perTrip,hours,hourly,fee}) {
 const values=[trips,perTrip,hours,hourly,fee];
 if(values.some(v=>!Number.isFinite(v)||v<0||v>10000000)) throw new Error('入力は0〜10,000,000の数値にしてください。');
 const travel=trips*perTrip, time=hours*12*hourly;
 return {travel,time,total:travel+time,net:travel+time-fee};
}
